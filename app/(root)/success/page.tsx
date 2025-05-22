import React from "react";
import ClearCart from "./components/ClearCart";

interface Props {
  searchParams?: Promise<{ payment_id: string }>;
}

const Page: React.FC<Props> = async ({ searchParams }) => {
  const paymentId = (await searchParams)?.payment_id;

  return (
    <div className="container text-center mt-8 lg:mt-16">
      <h1 className="text-2xl lg:text-5xl font-semibold block h-full">
        Your payment fulfilled!
      </h1>
      <p className="mt-2 lg:mt-6">
        Payment ID <span className="text-xs font-semibold">{paymentId}</span>
      </p>
      <p className="mt-2 text-sm lg:text-xl">
        Your order will be sent as soon as possible!
      </p>
      <ClearCart />
    </div>
  );
};

export default Page;
