import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  subTitle: string;
  button: string;
}

const EmptyCart: React.FC<Props> = ({ title, subTitle, button }) => {
  return (
    <div className="w-full flex items-center gap-6" data-id="cart-empty">
      <Image
        src="/svg/empty-cart.svg"
        width={150}
        height={150}
        alt="sad-smile"
      />
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm mt-2.5">{subTitle}</p>
        <button className="px-4 py-2 bg-gray text-black rounded-sm text-sm mt-3">
          <Link href="/">{button}</Link>
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
