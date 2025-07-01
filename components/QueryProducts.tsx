import React, { useEffect, useState } from "react";
import ProductLink from "./ProductLink";

const QueryProducts: React.FC<{ query?: string }> = ({ query }) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    let abort = false;

    const fetchProds = async () => {
      try {
        const response = await fetch(`/api/search/${query}`);
        const items = await response.json();
        if (!abort) setProducts(items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProds();

    return () => {
      abort = true;
    };
  }, [query]);

  if (!products.length) return null;

  return (
    <div
      data-id="search-products"
      className="absolute border bg-white p-0 rounded-md top-10 min-w-[80vw] md:min-w-[300] w-full left-0 z-50 flex flex-col gap-1.5 max-h-[65vh] md:max-h-[30vh] overflow-y-scroll"
    >
      {products.map((item) => (
        <ProductLink key={item.id} item={item} />
      ))}
    </div>
  );
};

export default QueryProducts;
