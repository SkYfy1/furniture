"use client";

import React, { useState } from "react";
import Filters from "./Filters";
import { Switch } from "./ui/switch";
import Product from "./Product";
import { filterSku, isVariant } from "@/lib/utils";

interface Props {
  title: string;
  products: Product[];
  description?: string;
  showFilters?: boolean;
  variants?: Variant[];
}

const ProductsGridSection: React.FC<Props> = ({
  title,
  products,
  description,
  showFilters,
  variants,
}) => {
  const [showVariants, setShowVariants] = useState(false);
  const allProducts = showVariants
    ? [...products, ...(variants ?? [])]
    : [...products];
  return (
    <div className="container px-4 capitalize mb-10 mt-6">
      <h2 className="text-3xl font-bold py-3.5">{title}</h2>
      {description && <p className="mb-10">{description}</p>}
      {showFilters && <Filters />}
      <div className="text-sm font-semibold flex justify-between">
        <div>Found {products.length} matching results</div>
        {showFilters && (
          <div className="flex gap-2.5 items-center">
            <span>Show variants</span>
            <Switch
              checked={showVariants}
              onCheckedChange={() => setShowVariants((prev) => !prev)}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 mt-5 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {allProducts.map((product) => (
          <Product
            key={product.id}
            data={product}
            category={title}
            name={isVariant(product) ? filterSku(product.sku) : product.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGridSection;
