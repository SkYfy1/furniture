"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  url: string;
  sku: string;
  size: string | null;
  color: string | null;
}

const VariantButton: React.FC<Props> = ({ url, sku, size, color }) => {
  const params = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const skuValue = params.get("sku");

  const handleSelect = (value: string) => {
    const newParams = new URLSearchParams(params);

    newParams.set("sku", value);

    replace(`${pathname}?${newParams.toString()}`);
  };
  return (
    <button
      className={cn(
        "flex flex-col gap-2.5 px-2 py-2 border rounded-md cursor-pointer",
        sku === skuValue && "border-black"
      )}
      onClick={() => handleSelect(sku)}
    >
      <Image
        src={url}
        width={80}
        height={80}
        className="pt-2"
        alt={`${sku}-image`}
      />
      <p className="text-xs font-semibold capitalize">{size ?? color}</p>
    </button>
  );
};

export default VariantButton;
