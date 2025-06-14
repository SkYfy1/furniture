// import { db } from "@/db/drizzle";
// import { deliveryTable, ordersTable, paymentTable } from "@/db/schema";
// import { serve } from "@upstash/workflow/nextjs";
// import { eq } from "drizzle-orm";

// type contextPayload = {
//   id: string;
// };

// const checkOrder = async (id: string) => {
//   const [result] = await db
//     .select({
//       order: ordersTable,
//       payment: paymentTable,
//       delivery: deliveryTable,
//     })
//     .from(ordersTable)
//     .innerJoin(paymentTable, eq(ordersTable.paymentInfo, paymentTable.id))
//     .innerJoin(deliveryTable, eq(ordersTable.shippingInfo, deliveryTable.id))
//     .where(eq(ordersTable.id, id));

//   return result;
// };

// export const { POST } = serve<contextPayload>(async (context) => {
//   const { id } = context.requestPayload;

//   const { payment, delivery } = await context.run(
//     "check-payment-status",
//     async () => {
//       const result = await checkOrder(id);

//       console.log(result);

//       return result;
//     }
//   );

//   await context.run("change-order-status", async () => {
//     await db
//       .update(ordersTable)
//       .set({
//         orderStatus: "PROCESSING",
//       })
//       .where(eq(ordersTable.id, id));
//   });

//   await context.sleep("wait-one-day", 60 * 60 * 24);

//   if (payment.paymentStatus === "PAID" || payment.paymentType === "CASH") {
//     await context.run("send-order", async () => {
//       await db
//         .update(deliveryTable)
//         .set({ sendDate: new Date(), deliveryStatus: "SENT" })
//         .where(eq(deliveryTable.id, delivery.id));
//     });
//   }

//   await context.sleep("wait-three-days", 60 * 60 * 24 * 3);

//   const status = await context.run("check-order", async () => {
//     const { payment, delivery } = await checkOrder(id);

//     return { payment, delivery };
//   });

//   if (
//     status.payment.paymentStatus === "PENDING" &&
//     (status.payment.paymentType === "CARD" ||
//       status.payment.paymentType === "CRYPTO")
//   ) {
//     await context.run("cancel-order", async () => {
//       await db
//         .update(deliveryTable)
//         .set({ deliveryStatus: "CANCELLED" })
//         .where(eq(deliveryTable.id, delivery.id));

//       await db
//         .update(ordersTable)
//         .set({ orderStatus: "CANCELLED" })
//         .where(eq(ordersTable.id, id));

//       await db
//         .update(paymentTable)
//         .set({ paymentStatus: "CANCELLED" })
//         .where(eq(paymentTable.id, payment.id));
//     });
//   } else if (status.payment.paymentStatus === "PAID") {
//     await context.run("fulfill-order", async () => {
//       await db
//         .update(deliveryTable)
//         .set({ deliveryStatus: "FULFILLED", arrivalDate: new Date() })
//         .where(eq(deliveryTable.id, delivery.id));

//       await db
//         .update(ordersTable)
//         .set({ orderStatus: "FULFILLED" })
//         .where(eq(ordersTable.id, id));
//     });
//   }
// });

import { serve } from "@upstash/workflow/nextjs";

export const { POST } = serve(async (context) => {
  await context.run("initial-step", () => {
    console.log("initial step ran");
  });

  await context.run("second-step", () => {
    console.log("second step ran");
  });
});
