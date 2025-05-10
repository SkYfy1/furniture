"use client";

import React, { useState } from "react";
import CategoryFiltration from "./CategoryFiltration";
import ProductsGridSection from "./ProductsGridSection";

interface Props {
  title: string;
  description: string;
  products: Product[];
  variants: Variant[];
}

const Category: React.FC<Props> = ({
  title,
  description,
  products,
  variants,
}) => {
  const [showVariants, setShowVariants] = useState(false);

  const goods = showVariants ? [...(variants ?? [])] : [...products];

  return (
    <section className="container px-4 capitalize mb-10 mt-6">
      <h2 className="text-3xl font-bold py-3.5">{title}</h2>
      <p className="mb-10">{description}</p>
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
