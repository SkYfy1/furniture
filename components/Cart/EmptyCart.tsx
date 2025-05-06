import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmptyCart = () => {
  return (
    <div className="w-full flex items-center gap-6">
      <Image
        src="/svg/empty-cart.svg"
        width={150}
        height={150}
        alt="sad-smile"
      />
      <div>
        <h1 className="text-2xl font-semibold">
          Woah, nothing in your cart yet
        </h1>
        <p className="text-sm mt-2.5">
          Try going back and find something beautiul before you come back
        </p>
        <button className="px-4 py-2 bg-gray text-black rounded-sm text-sm mt-2">
          <Link href="/">Back</Link>
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
