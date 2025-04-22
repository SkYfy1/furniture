import ProductMini from "@/components/ProductMini";
import React from "react";

interface Props {
  params: Promise<{ name: string }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const name = (await params).name.split("-").join(" ");
  return (
    <div className="mt-20 mb-40 container px-6 flex-col-reverse">
      <div></div>
      <div className="px-6">
        <h2 className="capitalize font-semibold text-3xl pb-2">{name}</h2>
        <p className="border-b pb-3">
          Designing with dark colors can add depth and coziness to a small
          space. Read our tips for using darker colors in your decor.
        </p>
        <section className="mt-4">
          <ProductMini />
          <ProductMini />
          <ProductMini />
        </section>
      </div>
    </div>
  );
};

export default Page;
