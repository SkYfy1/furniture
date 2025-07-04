import React from "react";
import { Switch } from "./ui/switch";
import Filters from "./Filters";
import { useTranslations } from "next-intl";

interface Props {
  quantity: number;
  range: number[];
  showVariants: boolean;
  // changeShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSwitch: () => void;
}

const CategoryFiltration: React.FC<Props> = ({
  quantity,
  showVariants,
  toggleSwitch,
  range,
}) => {
  const t = useTranslations("ShopPage.Filtration");
  return (
    <>
      <Filters range={range} buttonText={t("Filters.remove")} />
      <div className="text-sm font-semibold flex justify-between">
        <div>{t("found", { quantity })}</div>
        <div className="flex gap-2.5 items-center">
          <span>{t("show")}</span>
          <Switch checked={showVariants} onCheckedChange={toggleSwitch} />
        </div>
      </div>
    </>
  );
};

export default CategoryFiltration;
