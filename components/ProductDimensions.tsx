import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

const ProductDimensions: React.FC<{ dimensions: Dimensions }> = async ({
  dimensions,
}) => {
  const t = await getTranslations("ProductPage.Dimensions");
  return (
    <details className="mt-20 border-y py-6 group" open>
      <summary className="flex justify-between cursor-pointer">
        <p className="text-lg font-semibold">{t("title")}</p>

        <Image
          className="duration-300 group-[[open]]:rotate-180"
          src="/svg/arrow.svg"
          height={20}
          width={20}
          alt="arrow"
        />
      </summary>
      <ul className="flex flex-col pt-6 capitalize">
        <li className="bg-gray flex justify-between py-3 px-2">
          <p className="font-semibold">{t("width")}</p>
          <p>{dimensions.width}</p>
        </li>
        <li className=" flex justify-between py-3 px-2">
          <p className="font-semibold">{t("height")}</p>
          <p>{dimensions.height}</p>
        </li>
        <li className="bg-gray flex justify-between py-3 px-2">
          <p className="font-semibold">{t("depth")}</p>
          <p>{dimensions.depth}</p>
        </li>
        <li className=" flex justify-between py-3 px-2">
          <p className="font-semibold">{t("weight")}</p>
          <p>{dimensions.weight}</p>
        </li>
      </ul>
    </details>
  );
};

export default ProductDimensions;
