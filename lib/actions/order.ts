"use server";

import { db } from "@/db/drizzle";
import {
  deliveryTable,
  orderItemsTable,
  ordersTable,
  paymentTable,
  variantsTable,
} from "@/db/schema";
import { eq, inArray, sql } from "drizzle-orm";

interface ProductInfo {
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
  fullName: string;
  address: string;
  paymentMethod: "CASH" | "CARD" | "CRYPTO";
  shippingService: "NOVAPOST" | "MEEST" | "UKRPOSTA";
}

export const createOrder = async (formData: FormData, orderData: OrderData) => {
  const { userId, fullName, address, paymentMethod, shippingService } =
    formData;
  const { products, summaryPrice } = orderData;
  try {
    return await db.transaction(async (tx) => {
      // const productArray = await Promise.all(
      //   products.map(async (prod) => {
      //     const product = await tx
      //       .select()
      //       .from(variantsTable)
      //       .where(eq(variantsTable.id, prod.id));

      //     return product[0];
      //   })
      // );

      const productIds = products.map((p) => p.id);

      const productArray = await tx
        .select()
        .from(variantsTable)
        .where(inArray(variantsTable.id, productIds));

      if (productArray.some((item) => item.availableQuantity < 1))
        return {
          success: false,
          message: "Some positions not available at this moment!",
        };

      const [[{ paymentId }], [{ deliveryId }], [{ orderId }]] =
        await Promise.all([
          tx
            .insert(paymentTable)
            .values({
              paymentType: paymentMethod,
            })
            .returning({ paymentId: paymentTable.id }),
          tx
            .insert(deliveryTable)
            .values({
              shippingService: shippingService,
              userId,
              address,
              fullName,
            })
            .returning({ deliveryId: deliveryTable.id }),
          tx
            .insert(ordersTable)
            .values({
              clientId: userId,
              shippingInfo: "",
              paymentInfo: "",
              summaryPrice,
            })
            .returning({ orderId: ordersTable.id }),
        ]);

      await tx
        .update(ordersTable)
        .set({ paymentInfo: paymentId, shippingInfo: deliveryId })
        .where(eq(ordersTable.id, orderId));

      // First version

      // const { paymentId } = (
      //   await db
      //     .insert(paymentTable)
      //     .values({
      //       paymentType: paymentMethod,
      //     })
      //     .returning({ paymentId: paymentTable.id })
      // )[0];

      // const { deliveryId } = (
      //   await db
      //     .insert(deliveryTable)
      //     .values({
      //       shippingService: shippingService,
      //       userId,
      //       address,
      //       fullName,
      //     })
      //     .returning({ deliveryId: deliveryTable.id })
      // )[0];

      // const { orderId } = (
      //   await db
      //     .insert(ordersTable)
      //     .values({
      //       clientId: userId,
      //       shippingInfo: deliveryId,
      //       paymentInfo: paymentId,
      //       summaryPrice,
      //     })
      //     .returning({ orderId: ordersTable.id })
      // )[0];

      await Promise.all(
        products.map(async (item) => {
          await tx.insert(orderItemsTable).values({
            orderId,
            productId: item.id,
            priceAtPurchase: item.price,
            quantity: item.quantity,
          });

          // const product = productArray.find((el) => item.id === el.id);

          // if (product?.availableQuantity)
          await tx
            .update(variantsTable)
            .set({
              availableQuantity: sql`${variantsTable.availableQuantity} - ${item.quantity}`,
            })
            .where(eq(variantsTable.id, item.id));
        })
      );

      console.log(orderId, deliveryId, paymentId);

      // redirect("/success");

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
