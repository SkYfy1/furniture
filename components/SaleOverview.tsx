import Image from "next/image";
import React from "react";

const SaleOverview = () => {
  return (
    <section className=" bg-olive">
      <div className="max-w-[95rem] flex mx-auto items-center justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-8xl font-bold">Sale</h1>
          <button className="bg-black px-8 py-4 rounded-md text-white">
            See our big sale
          </button>
        </div>
        <div className="w-1/2">
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
