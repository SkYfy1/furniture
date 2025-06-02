import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/Button";
import { getTranslations } from "next-intl/server";

const SaleOverview: React.FC = async () => {
  const t = await getTranslations("SaleOverview");
  return (
    <section className=" bg-olive col-span-5 p-10 mt-8 lg:pt-0 lg:mt-0 pb-0 lg:pb-10">
      <div className="container flex lg:flex-row flex-col  items-center justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-8xl font-bold">{t("title")}</h1>
          <p>{t("subTitle")}</p>
          <Button size="lg" asChild className="font-semibold text-sm py-4">
            <Link href="/shop">{t("link")}</Link>
          </Button>
        </div>
        <div className="w-full px-2 lg:mt-0 mt-14">
          <Image
            src="/main/big-sale-banner_3.jpeg"
            className="lg:float-right"
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
