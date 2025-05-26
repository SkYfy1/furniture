import { db } from "@/db/drizzle";
import {
  deliveryTable,
  ordersTable,
  paymentTable,
  productsTable,
  variantsTable,
} from "@/db/schema";
import { updateOrderItems } from "@/lib/mutations/products";
import { stripe } from "@/lib/stripe";
import { orderSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;
  console.log("Webhook start!");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.metadata?.type === "create") {
        // If creation from stripe checkout form

        const fieldValues = session.custom_fields.reduce((acc, cur) => {
          acc[cur.key] =
            (cur.text?.value as string) || (cur.dropdown?.value as string);
          return acc;
        }, {} as Record<string, string>);
        const productData = JSON.parse(session.metadata.productData);
        const metadata = session.metadata;
        const customerDetails = session.customer_details;
        const name = (customerDetails?.name as string).split(" ");
        const userId = metadata.client_id;
        const isVariant = productData?.type === "variant";

        // Parse fields

        const validatedFields = orderSchema.safeParse({
          firstName: name[0],
          lastName: name[1],
          city: customerDetails?.address?.city,
          country: customerDetails?.address?.country,
          state: customerDetails?.address?.state,
          zip: customerDetails?.address?.postal_code,
          address: customerDetails?.address?.line1,
          shippingService: fieldValues.shipping_service,
          paymentMethod: fieldValues.payment_method,
        });

        if (!validatedFields.success) {
          throw new Error(validatedFields.error.toString());
        }

        const {
          firstName,
          lastName,
          city,
          country,
          state,
          zip,
          address,
          shippingService,
          paymentMethod,
        } = validatedFields.data;

        // Start transaction

        await db.transaction(async (tx) => {
          const tableToCheck = isVariant ? variantsTable : productsTable;

          // Get product or Variant

          const [product] = await tx
            .select()
            .from(tableToCheck)
            .where(eq(tableToCheck.id, productData.id));

          if (productData.quantity > product.availableQuantity) {
            throw new Error("Product not available at this moment!");
          }

          // Create payment and delivery rows

          const [[{ paymentId }], [{ deliveryId }]] = await Promise.all([
            tx
              .insert(paymentTable)
              .values({
                paymentType: paymentMethod,
                paymentStatus: "PAID",
              })
              .returning({ paymentId: paymentTable.id }),
            tx
              .insert(deliveryTable)
              .values({
                shippingService: shippingService,
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

          // Create order row

          const [{ orderId }] = await tx
            .insert(ordersTable)
            .values({
              clientId: userId,
              shippingInfo: deliveryId,
              paymentInfo: paymentId,
              summaryPrice: productData.price,
            })
            .returning({ orderId: ordersTable.id });

          // Create ordered item row and update quantity value in item

          await updateOrderItems(tx, productData, orderId);
        });
      } else {
        // If own form handle, update only payment

        await db
          .update(paymentTable)
          .set({
            paymentStatus: "PAID",
            paymentDate: new Date(),
          })
          .where(eq(paymentTable.id, session?.metadata?.payment_id as string));
      }

      console.log("Payment updated!");
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Webhook error", { status: 400 });
  }
}
