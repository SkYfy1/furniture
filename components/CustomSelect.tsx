import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const CustomSelect: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations("ShopPage.Filtration.Filters.Select");

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
        data-id="select"
        aria-label="Order by"
        defaultValue={searchParams.get("orderBy") ?? "NAME_ASC"}
        className="appearance-none w-full px-4 py-1.5 cursor-pointer"
      >
        <option value={"NAME_ASC"}>{t("nameAsc")}</option>
        <option value={"NAME_DESC"}>{t("nameDesc")}</option>
        <option value={"PRICE_ASC"}>{t("priceAsc")}</option>
        <option value={"PRICE_DESC"}>{t("priceDesc")}</option>
      </select>
      <Image
        width={10}
        height={10}
        className="rotate-90 absolute top-3 right-4"
        src="/svg/b9f50123-f337-49a6-b90e-bb3fdf52bbab.svg"
        alt=""
        aria-hidden="true"
        role="presentation"
      />
    </div>
  );
};

export default CustomSelect;
