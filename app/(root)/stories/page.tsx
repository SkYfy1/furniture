import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Perfect design solutions for everyone. Transform your space today!",
  openGraph: {
    url: "/stories",
    title: "Plant starter pack",
    description: "Designing with plant starter pack...",
  },
};

const Page: React.FC = () => {
  return (
    <div className="container p-10 flex flex-col gap-10">
      <div className="pt-10">
        <h1 className="text-5xl pb-3 font-bold">Stories</h1>
        <p className="text-sm">Stories</p>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Link
          href="/stories/japandi-interior-design-style"
          className="min-h-full bg-gray pl-10 pt-15 lg:pl-0 lg:pt-0 flex flex-col rounded-md border border-transparent hover:border-black cursor-pointer"
        >
          <div className="flex flex-col gap-2 lg:pt-20 lg:pl-10 pr-10 lg:pr-0">
            <h1 className="lg:text-2xl text-xl font-bold">
              Japandi Interior Design Stylee
            </h1>
            <p className="text-sm lg:text-base">
              Japandi interior design is a hybrid of east and west. The style is
              increasingly popular, and it is here to stay. The style creates
              interiors that are minimal without being cold...
            </p>
          </div>
          <Image
            className="lg:pt-16 pt-6 h-full lg:pl-10"
            src="/main/chairs-rug_4.jpeg"
            height={500}
            width={500}
            alt="chairs"
          />
        </Link>
        <Link
          href="/stories/dark-colors"
          className="min-h-full bg-gray flex flex-col  rounded-md border border-transparent hover:border-black cursor-pointer"
        >
          <div className="flex flex-col gap-2 pb-6 md:pb-28 pt-15 px-8 lg:pt-20 lg:pl-10">
            <h1 className="text-2xl font-bold">Dark Colors</h1>
            <p className="text-sm lg:text-base">
              Designing with dark colors can add depth and coziness to a small
              space. Read our tips for using darker colors in your decor.
            </p>
          </div>
          <Image
            className="h-full w-full"
            src="/main/darkColors.jpeg"
            height={500}
            width={500}
            alt="plant"
          />
        </Link>
        <Link
          href="/stories/plant-starter-pack"
          className=" min-h-full bg-gray flex flex-col  rounded-md border border-transparent hover:border-black cursor-pointer"
        >
          <div className="flex flex-col gap-2 pb-6 pt-15 px-8 lg:pt-20 lg:pl-10">
            <h1 className="text-2xl font-bold">Plant Starter Pack</h1>
            <p className="text-sm lg:text-base">
              How do you pull off multiple plants in a single space? Read about
              our favorite design tricks.
            </p>
          </div>
          <Image
            className="h-full w-full"
            src="/main/plant-starter-pack_4.jpeg"
            height={500}
            width={500}
            alt="plant"
          />
        </Link>
      </section>
    </div>
  );
};

export default Page;
