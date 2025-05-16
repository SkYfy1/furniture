"use server";

import { db } from "@/db/drizzle";
import {
  deliveryTable,
  orderItemsTable,
  ordersTable,
  paymentTable,
  productsTable,
  variantsTable,
} from "@/db/schema";
import { eq, inArray, sql } from "drizzle-orm";

export interface ProductInfo {
  id: string;
  quantity: number;
  price: number;
}

interface OrderData {
  products: ProductInfo[];
  summaryPrice: number;
}

interface FormData {
  userId: string;
  firstName: string;
  lastName: string;
  zip: string;
  country: string;
  state: string;
  city: string;
  address: string;
  paymentMethod: "CASH" | "CARD" | "CRYPTO";
  shippingService: "NOVAPOST" | "MEEST" | "UKRPOSTA";
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

      return { success: true, message: `Order id: ${orderId}` };
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
