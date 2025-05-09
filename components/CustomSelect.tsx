import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const CustomSelect: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateParams = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    const sort = e.target.value;

    params.set("orderBy", sort);

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="bg-gray-100 text-sm font-bold w-60 flex justify-between relative">
      <select
        onChange={updateParams}
        name="orderBy"
        id="orderBy"
        className="appearance-none w-full px-4 py-1.5 cursor-pointer"
      >
        <option value={"PRICE_ASC"}>Price: Low to High</option>
        <option value={"PRICE_DESC"}>Price: High to low</option>
        <option value={"NAME_ASC"}>Name ascending</option>
        <option value={"NAME_DESC"}>Name descending</option>
      </select>
      <Image
        width={10}
        height={10}
        className=" rotate-90 absolute top-3 right-4"
        src="/svg/b9f50123-f337-49a6-b90e-bb3fdf52bbab.svg"
        alt="arrow"
      />
    </div>
  );
};

export default CustomSelect;
