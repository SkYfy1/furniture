"use client";

import React, { useState } from "react";
import CategoryFiltration from "./CategoryFiltration";
import ProductsGridSection from "./ProductsGridSection";
import { useTranslations } from "next-intl";

interface Props {
  title: string;
  products: Product[];
  variants: Variant[];
}

const Category: React.FC<Props> = ({ title, products, variants }) => {
  const [showVariants, setShowVariants] = useState(false);
  const t = useTranslations("ShopPage.Categories.category");

  const goods = showVariants ? [...(variants ?? [])] : [...products];

  const capTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <section className="container px-4 capitalize mb-10 mt-6">
      <h2 className="text-3xl font-bold py-3.5">
        {t(`${capTitle}.name` as "Sofas.name")}
      </h2>
      <p className="mb-10">
        {t(`${capTitle}.description` as "Sofas.description")}
      </p>
      <CategoryFiltration
        quantity={goods.length}
        showVariants={showVariants}
        changeShow={setShowVariants}
      />
      <ProductsGridSection products={goods} categoryName={title} />
    </section>
  );
};

export default Category;
