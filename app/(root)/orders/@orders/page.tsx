import { auth } from "@/auth";
import { getOrderData } from "@/lib/data/order";
import React from "react";
import Order from "./components/Order";
import Link from "next/link";

const Page = async () => {
  const session = await auth();

  const id = session?.user?.id as string;

  const orders = await getOrderData(id);

  if (!orders.length) {
    <div className="flex justify-center items-center flex-col gap-2">
      <h1>No Orders Placed Yet</h1>
      <Link href="/shop">Continue shopping</Link>
    </div>;
  }

  return (
    <div className="p-4 mt-8 flex flex-col gap-3">
      {orders.map((order) => (
        <Order key={order.order.id} order={order} />
      ))}
    </div>
  );
};

export default Page;
