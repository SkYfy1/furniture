"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SearchOverlay = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const query = params.get("query") || "";
  const closeSearch = () => {
    const newParams = new URLSearchParams(params);

    newParams.delete("query");

    replace(`${pathname}?${newParams.toString()}`);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (body && query) {
      body.style.overflow = "hidden";
    }

    return () => {
      if (body) body.style.overflow = "auto";
    };
  }, [query]);
  if (!query) return null;
  return (
    <div
      data-id="search-overlay"
      className="top-0 left-0 h-full w-screen absolute bg-black/75 z-50"
      onClick={closeSearch}
    ></div>
  );
};

export default SearchOverlay;
