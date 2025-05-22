import { db } from "@/db/drizzle";
import { paymentTable } from "@/db/schema";
import { stripe } from "@/lib/stripe";
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
  } catch (error) {
    console.log(error);
    return new NextResponse("Webhook error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    await db
      .update(paymentTable)
      .set({
        paymentStatus: "PAID",
        paymentDate: new Date(),
      })
      .where(eq(paymentTable.id, session?.metadata?.payment_id as string));

    console.log("Payment updated!");
  }

  return new NextResponse(null, { status: 200 });
}
