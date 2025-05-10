import React from "react";
import { Switch } from "./ui/switch";
import Filters from "./Filters";

interface Props {
  quantity: number;
  showVariants: boolean;
  changeShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryFiltration: React.FC<Props> = ({
  quantity,
  showVariants,
  changeShow,
}) => {
  return (
    <>
      <Filters />
      <div className="text-sm font-semibold flex justify-between">
        <div>Found {quantity} matching results</div>
        <div className="flex gap-2.5 items-center">
          <span>Show variants</span>
          <Switch
            checked={showVariants}
            onCheckedChange={() => changeShow((prev) => !prev)}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryFiltration;
