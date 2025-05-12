import React, { useEffect, useState } from "react";
import ProductLink from "./ProductLink";

const QueryProducts: React.FC<{ query?: string }> = ({ query }) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    let abort = false;
    let timer: NodeJS.Timeout;

    const fetchProds = async () => {
      try {
        const response = await fetch(`/api/search/${query}`);
        const items = await response.json();
        if (!abort) setProducts(items);
      } catch (error) {
        console.log(error);
      }
    };

    timer = setTimeout(fetchProds, 100); // eslint-disable-line

    return () => {
      abort = true;
      clearTimeout(timer);
    };
  }, [query]);

  if (!products.length) return null;

  return (
    <div className="absolute bg-white p-5 rounded-md top-15 min-w-[15vw] -left-4 z-50 flex flex-col gap-2">
      {products.map((item) => (
        <ProductLink key={item.id} item={item} />
      ))}
    </div>
  );
};

export default QueryProducts;
