import React from "react";
import OrderForm from "./components/OrderForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createOrder } from "@/lib/actions/order";
import OrderSummary from "./components/OrderSummary";

const Page = async () => {
  const session = await auth();

  if (!session?.user) redirect("/orders");

  return (
    <div className="container h-full w-full min-h-[70vh] pt-36">
      <h2 className="mb-18 text-4xl pl-2 font-semibold">Checkout</h2>
      <section className="flex flex-col md:flex-row gap-24">
        <OrderForm userId={session.user.id as string} action={createOrder} />
        <OrderSummary />
      </section>
    </div>
  );
};

export default Page;
