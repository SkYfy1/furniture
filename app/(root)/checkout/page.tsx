import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createOrder } from "@/lib/actions/order";
import Checkout from "./components/Checkout";
import { getShippingRows } from "@/lib/data/order";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your purchase securely. Fast delivery and easy returns.",
  robots: {
    index: false,
    follow: false,
  },
};

const Page = async () => {
  const session = await auth();

  if (!session?.user) redirect("/orders");

  const [userShippingData] = await getShippingRows(session.user.id!);

  return (
    <div className="container h-full w-full min-h-[70vh] md:pt-22 pt-12">
      <h2 className="mb-8 md:mb-18 text-4xl pl-2 font-semibold">Checkout</h2>
      <Checkout
        userId={session.user.id as string}
        action={createOrder}
        shippingData={userShippingData}
      />
    </div>
  );
};

export default Page;
