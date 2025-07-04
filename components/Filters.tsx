"use client";
import React from "react";
import CustomSlider from "./CustomSlider";
import CustomSelect from "./CustomSelect";
import { redirect, usePathname } from "next/navigation";

interface Props {
  buttonText: string;
  range: number[];
}

const Filters: React.FC<Props> = ({ buttonText, range }) => {
  const path = usePathname();
  const handleClearParams = () => {
    redirect(path);
  };
  return (
    <div className="flex md:flex-row flex-col gap-3 mb-10">
      <div className="flex gap-3 flex-col sm:flex-row">
        <CustomSelect />
        <CustomSlider sliderRange={range} />
      </div>
      <button
        className="w-fit text-sm justify-start ml-1 mt-1"
        onClick={handleClearParams}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Filters;
