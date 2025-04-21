import Image from "next/image";
import React from "react";

const SaleOverview: React.FC = () => {
  return (
    <section className=" bg-olive col-span-5 p-10 pb-0 lg:pb-10">
      <div className="container flex lg:flex-row flex-col  items-center justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-8xl font-bold">Sale</h1>
          <p>Incredible deals. Top-of-the-line design for less.</p>
          <button className="bg-black lg:w-full w-1/2 px-6 py-5 lg:px-8 lg:py-4 text-sm font-semibold rounded-md text-white">
            See our big sale
          </button>
        </div>
        <div className="w-full px-2 lg:mt-0 mt-14">
          <Image
            src="/main/big-sale-banner_3.jpeg"
            width={800}
            height={800}
            alt="banner"
          />
        </div>
      </div>
    </section>
  );
};

export default SaleOverview;
