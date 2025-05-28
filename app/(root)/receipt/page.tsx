import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Receipt",
  description: "Thanks you for the order!",
  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => {
  return (
    <div className="container text-center mt-12">
      <h1 className="text-5xl font-semibold block h-full">
        Fake receipt route
      </h1>
    </div>
  );
};

export default Page;
