"use client";
import React from "react";
import CustomSlider from "./CustomSlider";
import CustomSelect from "./CustomSelect";
import { redirect, usePathname } from "next/navigation";

const Filters: React.FC = () => {
  const path = usePathname();
  const handleClearParams = () => {
    redirect(path);
  };
  return (
    <div className="flex md:flex-row flex-col gap-3 mb-10">
      <div className="flex gap-3 flex-col sm:flex-row">
        <CustomSelect />
        <CustomSlider />
      </div>
      <button
        className="w-fit text-sm justify-start ml-1 mt-1"
        onClick={handleClearParams}
      >
        Remove all filters
      </button>
    </div>
  );
};

export default Filters;
