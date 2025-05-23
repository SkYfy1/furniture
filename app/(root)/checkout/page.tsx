import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createOrder } from "@/lib/actions/order";
import Checkout from "./components/Checkout";

const Page = async () => {
  const session = await auth();

  if (!session?.user) redirect("/orders");

  return (
    <div className="container h-full w-full min-h-[70vh] md:pt-36 pt-12">
      <h2 className="mb-8 md:mb-18 text-4xl pl-2 font-semibold">Checkout</h2>
      <Checkout userId={session.user.id as string} action={createOrder} />
    </div>
  );
};

export default Page;
