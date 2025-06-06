"use server";

import { db } from "@/db/drizzle";
import {
  couponTable,
  deliveryTable,
  orderItemsTable,
  ordersTable,
  paymentTable,
  productsTable,
  variantsTable,
} from "@/db/schema";
import { eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { stripe } from "../stripe";
import { orderType } from "../validations";

export interface ProductInfo {
  id: string;
  quantity: number;
  price: number;
}

interface OrderData {
  products: ProductInfo[];
  summaryPrice: number;
}

interface FormData extends orderType {
  userId: string;
}

export const createOrder = async (formData: FormData, orderData: OrderData) => {
  const {
    userId,
    firstName,
    lastName,
    city,
    country,
    state,
    zip,
    default: isDefault,
    address,
    paymentMethod,
    shippingService,
  } = formData;
  const { products, summaryPrice } = orderData;
  try {
    return await db.transaction(async (tx) => {
      const productIds = products.map((p) => p.id);

      const [variantArray, productArray] = await Promise.all([
        tx
          .select()
          .from(variantsTable)
          .where(inArray(variantsTable.id, productIds)),
        tx
          .select()
          .from(productsTable)
          .where(inArray(productsTable.id, productIds)),
      ]);

      if (
        variantArray.some((item) => {
          const product = products.find((elem) => elem.id === item.id);
          return (product?.quantity as number) > item.availableQuantity;
        }) ||
        productArray.some((item) => {
          const product = products.find((elem) => elem.id === item.id);
          return (product?.quantity as number) > item.availableQuantity;
        })
      )
        return {
          success: false,
          message: "Some positions not available at this moment!",
        };

      const [[{ paymentId }], [{ deliveryId }]] = await Promise.all([
        tx
          .insert(paymentTable)
          .values({
            paymentType: paymentMethod,
            default: isDefault,
          })
          .returning({ paymentId: paymentTable.id }),
        tx
          .insert(deliveryTable)
          .values({
            shippingService,
            userId,
            address,
            firstName,
            lastName,
            zip: Number(zip),
            state,
            country,
            city,
            default: isDefault,
          })
          .returning({ deliveryId: deliveryTable.id }),
      ]);

      const [{ orderId }] = await tx
        .insert(ordersTable)
        .values({
          clientId: userId,
          shippingInfo: deliveryId,
          paymentInfo: paymentId,
          summaryPrice,
        })
        .returning({ orderId: ordersTable.id });

      await Promise.all(
        products.map(async (item) => {
          // Check if its variant - update variants table
          if (variantArray.find((obj) => obj.id === item.id)) {
            await tx.insert(orderItemsTable).values({
              orderId,
              variantId: item.id,
              productId: null,
              priceAtPurchase: item.price,
              quantity: item.quantity,
            });

            await tx
              .update(variantsTable)
              .set({
                availableQuantity: sql`${variantsTable.availableQuantity} - ${item.quantity}`,
              })
              .where(eq(variantsTable.id, item.id));
          } else {
            // Or Product Table
            await tx.insert(orderItemsTable).values({
              orderId,
              productId: item.id,
              variantId: null,
              priceAtPurchase: item.price,
              quantity: item.quantity,
            });

            await tx
              .update(productsTable)
              .set({
                availableQuantity: sql`${productsTable.availableQuantity} - ${item.quantity}`,
              })
              .where(eq(productsTable.id, item.id));
          }
        })
      );

      const line_items = [
        ...variantArray.map((item) => {
          const quantity = products.find((el) => el.id === item.id)?.quantity;

          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.sku,
                images: [item.imageUrl],
              },
              unit_amount: item.price * 100,
            },
            quantity: quantity,
          };
        }),
        ...productArray.map((item) => {
          const quantity = products.find((el) => el.id === item.id)?.quantity;

          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.name,
                images: [item.imageUrl],
              },
              unit_amount: item.price * 100,
            },
            quantity: quantity,
          };
        }),
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_URL}/success?payment_id=${paymentId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
        metadata: {
          payment_id: paymentId,
          user_id: userId,
        },
      });

      return {
        success: true,
        url: session.url,
        message: `Order id: ${orderId}`,
      };
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Order creation failed",
    };
  }
};

export type CreateOrder = typeof createOrder;

export const cancelOrder = async (orderId: string) => {
  try {
    await db.transaction(async (tx) => {
      const orderItems = await tx
        .select()
        .from(orderItemsTable)
        .where(eq(orderItemsTable.orderId, orderId));

      const { products, variants } = orderItems.reduce<{
        products: { id: string; quantity: number }[];
        variants: { id: string; quantity: number }[];
      }>(
        (acc, cur) => {
          if (cur.variantId)
            acc.variants.push({ id: cur?.variantId, quantity: cur.quantity });
          if (cur.productId)
            acc.products.push({ id: cur?.productId, quantity: cur.quantity });
          return acc;
        },
        { products: [], variants: [] }
      );

      await Promise.all(
        products.map(async (product) => {
          await tx
            .update(productsTable)
            .set({
              availableQuantity: sql`${productsTable.availableQuantity} + ${product.quantity}`,
            })
            .where(eq(productsTable.id, product.id));
        })
      );

      await Promise.all(
        variants.map(async (variant) => {
          await tx
            .update(variantsTable)
            .set({
              availableQuantity: sql`${variantsTable.availableQuantity} + ${variant.quantity}`,
            })
            .where(eq(variantsTable.id, variant.id));
        })
      );

      const [{ shippingId, paymentId }] = await tx
        .update(ordersTable)
        .set({ orderStatus: "REJECTED" })
        .where(eq(ordersTable.id, orderId))
        .returning({
          shippingId: ordersTable.shippingInfo,
          paymentId: ordersTable.paymentInfo,
        });

      await Promise.all([
        tx
          .update(paymentTable)
          .set({ paymentStatus: "REJECTED" })
          .where(eq(paymentTable.id, paymentId)),
        tx
          .update(deliveryTable)
          .set({ deliveryStatus: "REJECTED" })
          .where(eq(deliveryTable.id, shippingId)),
      ]);
    });

    revalidatePath("/orders");
    return {
      success: true,
      message: "Order cancelled",
    };
  } catch (error) {
    console.error("Order cancellation failed:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Order cancel failed",
    };
  }
};

export const updateDefaultDelivery = async (deliveryId: string) => {
  try {
    await db.transaction(async (tx) => {
      await tx.update(deliveryTable).set({ default: false });
      await tx
        .update(deliveryTable)
        .set({ default: true })
        .where(eq(deliveryTable.id, deliveryId));
    });
    revalidatePath("/orders");
    return { success: true, message: "This delivery method set to default" };
  } catch (error) {
    console.error("Order cancellation failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Delivery change failed",
    };
  }
};

export const checkCoupon = async (couponCode: string, orderAmount: number) => {
  try {
    const [result] = await db
      .select()
      .from(couponTable)
      .where(eq(couponTable.couponCode, couponCode));

    if (result === undefined) {
      return {
        success: false,
        message: "Coupon not fould",
      };
    }

    const available = result.timesUsed! <= result.usageLimit && result.isActive;

    if (!available || result.minOrderAmount > orderAmount) {
      return {
        success: false,
        message: "Coupon expired or not available",
      };
    }

    await db
      .update(couponTable)
      .set({ timesUsed: sql`${couponTable.timesUsed} + ${1}` })
      .where(eq(couponTable.couponCode, result.couponCode));

    return {
      success: true,
      couponInfo: {
        code: couponCode,
        discount: result.discountValue,
        type: result.discountType,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Coupon error",
    };
  }
};
