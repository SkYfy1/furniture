import React from "react";
import ClearCart from "../success/components/ClearCart";

const Page = () => {
  return (
    <div className="container text-center mt-8 lg:mt-16">
      <h1 className="text-lg lg:text-5xl font-semibold block h-full">
        There was an issue processing your payment.
      </h1>
      <p className="mt-4 text-sm lg:text-base">
        Try again later in orders page!
      </p>
      <ClearCart />
    </div>
  );
};

export default Page;
