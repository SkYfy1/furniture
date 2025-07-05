import React from "react";
import Product from "./Product";
import { filterSku, isVariant } from "@/lib/utils";

interface Props {
  categoryName: string;
  products: Product[] | Variant[];
}

const ProductsGridSection: React.FC<Props> = ({ categoryName, products }) => {
  return (
    <div
      className="grid grid-cols-2 mt-5 gap-4 md:gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      data-id="products-block"
    >
      {products.map((product) => (
        <Product
          key={product.id}
          data={product}
          category={categoryName}
          name={isVariant(product) ? filterSku(product.sku) : product.name}
        />
      ))}
    </div>
  );
};

export default ProductsGridSection;
