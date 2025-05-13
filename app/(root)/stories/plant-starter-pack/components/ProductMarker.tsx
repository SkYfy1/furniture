import ProductLink from "@/components/ProductLink";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className: string;
  product: Product;
  selectProduct: (id: string) => void;
}

const ProductMarker: React.FC<Props> = ({
  className,
  product,
  selectProduct,
}) => {
  return (
    <div
      className={cn("absolute z-50 group hidden xl:block", className)}
      onMouseOver={() => selectProduct(product.id)}
      onMouseLeave={() => selectProduct("")}
    >
      <div className="size-8 border-8 border-gray-300 group-hover:border-0 duration-150 bg-white rounded-full"></div>
      <div className="group-hover:h-[85] duration-500 transition-all opacity-0 group-hover:opacity-100 absolute bottom-10 overflow-hidden bg-white rounded-md h-0">
        <ProductLink item={product} />
      </div>
    </div>
  );
};

export default ProductMarker;
