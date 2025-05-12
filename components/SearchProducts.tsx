import { debounce } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import QueryProducts from "./QueryProducts";

const SearchProducts: React.FC = () => {
  const [text, setText] = useState("");

  const params = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();

  const query = params.get("query") || "";

  useEffect(() => {
    setText(query);
  }, [query]);

  const updateQuery = useCallback(
    debounce((term: string) => {
      const searchParams = new URLSearchParams(params);

      if (term) {
        searchParams.set("query", term);
      } else {
        searchParams.delete("query");
      }

      replace(`${path}?${searchParams.toString()}`);
    }, 700),
    [path, params]
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    updateQuery(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={text}
        onChange={handleChangeInput}
        placeholder="Names, categories..."
        className="bg-gray-50 rounded-full pl-6 pr-4 xl:pr-22 py-2 focus:outline-1"
      />
      <Image
        className="absolute top-1/2 right-3 -translate-y-1/2"
        src="/svg/searchIcon-6EQLXFJK.svg"
        height={18}
        width={18}
        alt="search-icon"
      />
      {query && <QueryProducts query={params.get("query")?.toString()} />}
    </div>
  );
};

export default SearchProducts;
