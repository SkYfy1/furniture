import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardSection: React.FC = async () => {
  const t = await getTranslations("HomePage.CardSection");
  return (
    <>
      <div className="flex gap-4 flex-col lg:flex-row bg-orange col-start-2 col-end-5 pt-20 pl-10">
        <div className="lg:max-w-2/5 flex flex-col gap-3 pr-8 pb-10 lg:p-0">
          <h1 className="lg:text-5xl text-4xl font-bold">
            {t("CardOne.title")}
          </h1>
          <p className="text-sm lg:w-2/3 lg:text-base">
            {t("CardOne.subTitle")}
          </p>
        </div>
        <div>
          <Image
            src="/main/time-to-get-productive_4.jpeg"
            height={800}
            width={950}
            alt="laptop image"
          />
        </div>
      </div>
      <div className="col-start-2 col-span-3 lg:col-end-2 min-h-full bg-green">
        <div className="flex flex-col gap-2 pb-8 pt-20 pl-10">
          <h1 className="text-2xl font-bold">{t("CardTwo.title")}</h1>
          <p className="text-sm lg:text-base">{t("CardTwo.subTitle")}</p>
        </div>
        <Image
          className="pl-10"
          src="/main/time-to-get-productive_4.jpeg"
          height={500}
          width={500}
          alt="laptop image"
        />
      </div>
      <Link
        href="/stories/japandi-interior-design-style"
        className="lg:col-start-3 col-start-2 lg:col-end-3 col-span-3 min-h-full bg-olive pl-10 pt-15 lg:pl-0 lg:pt-0 flex flex-col rounded-md border border-transparent hover:border-black cursor-pointer"
      >
        <div className="flex flex-col gap-2 lg:pt-20 lg:pl-10 pr-10 lg:pr-0">
          <h1 className="lg:text-2xl text-xl font-bold">
            {t("CardThree.title")}
          </h1>
          <p className="text-sm lg:text-base">{t("CardThree.subTitle")}</p>
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
        href="/stories/plant-starter-pack"
        className="lg:col-start-4 col-start-2 col-span-3 lg:col-end-4 min-h-full bg-olive flex flex-col  rounded-md border border-transparent hover:border-black cursor-pointer"
      >
        <div className="flex flex-col gap-2 pb-6 pt-15 px-8 lg:pt-20 lg:pl-10">
          <h1 className="text-2xl font-bold">{t("CardFour.title")}</h1>
          <p className="text-sm lg:text-base">{t("CardFour.subTitle")}</p>
        </div>
        <Image
          className="h-full w-full"
          src="/main/plant-starter-pack_4.jpeg"
          height={500}
          width={500}
          alt="plant"
        />
      </Link>
    </>
  );
};

export default CardSection;
