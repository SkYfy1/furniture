import { debounce } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import QueryProducts from "./QueryProducts";

interface Props {
  placeholder: string;
}

const SearchProducts: React.FC<Props> = ({ placeholder }) => {
  const [text, setText] = useState("");

  const params = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();

  const query = params.get("query") || "";

  useEffect(() => {
    setText(query);
  }, [query]);

  const updateQuery = useCallback(
    (term: string) => {
      const searchParams = new URLSearchParams(params);

      if (term) {
        searchParams.set("query", term);
      } else {
        searchParams.delete("query");
      }

      replace(`${path}?${searchParams.toString()}`);
    },
    [path, params, replace]
  );

  const debouncedUpdateQuery = useMemo(
    () => debounce(updateQuery, 700),
    [updateQuery]
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    debouncedUpdateQuery(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={text}
        onChange={handleChangeInput}
        placeholder={placeholder}
        className="bg-gray-50 rounded-full pl-6 pr-4 xl:pr-22 py-2 focus:outline-1"
        data-id="search-input"
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
