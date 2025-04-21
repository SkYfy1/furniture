"use client";
import React from "react";
import CustomSlider from "./CustomSlider";
import CustomSelect from "./CustomSelect";

const Filters = () => {
  return (
    <div className="flex flex-col gap-3 mb-10">
      <CustomSelect />
      <CustomSlider />
    </div>
  );
};

export default Filters;
