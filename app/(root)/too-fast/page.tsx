import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Error",
  description: "Something went wrong!",
  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => {
  return (
    <div className="container mt-12 text-center">
      <h1 className="text-5xl font-semibold block h-full">Too fast</h1>
    </div>
  );
};

export default Page;
