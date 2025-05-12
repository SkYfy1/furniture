import { debounce } from "@/lib/utils";
import { Slider } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const CustomSlider: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const min = searchParams.get("min") ?? 0;
  const max = searchParams.get("max") ?? 1000;

  const [range, setRange] = useState([+min, +max]);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setRange([+min, +max]);
  }, [min, max]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateParams = useCallback(
    debounce((values: number[]) => {
      const params = new URLSearchParams(searchParams);
      params.set("min", values[0].toString());
      params.set("max", values[1].toString());

      replace(`${pathname}/?${params.toString()}`);
    }, 700),
    [pathname, searchParams]
  );

  const changeRangeValue = (e: Event, newValue: number[]) => {
    if (newValue) {
      setRange(newValue);
      updateParams(newValue);
    }
  };

  return (
    <div className="bg-gray-100 px-4 py-1.5 text-sm font-bold w-60 relative">
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => setShowSlider((prev) => !prev)}
      >
        <p>Change Range</p>
        <Image
          width={10}
          height={10}
          className=" rotate-90"
          src="/svg/b9f50123-f337-49a6-b90e-bb3fdf52bbab.svg"
          alt="arrow"
        />
      </div>
      {showSlider && (
        <div className="pb-1.5 absolute top-0 left-0 w-full px-4 bg-inherit translate-y-1/3 md:translate-y-1/2">
          <Slider
            sx={{
              width: "100%",
              color: "#e5e7eb",
              "& .MuiSlider-thumb": {
                color: "black",
                height: 14,
                width: 14,
                "&:hover, &:active, &.Mui-active, &.Mui-focusVisible": {
                  boxShadow: "none",
                },
              },
              "& .MuiSlider-track": {
                color: "black",
              },
              "& .MuiSlider-valueLabel": {
                display: "none",
              },
            }}
            getAriaLabel={() => "Price Range"}
            value={range}
            max={1000}
            min={20}
            onChange={changeRangeValue}
            valueLabelDisplay="auto"
            disableSwap
          />
          <div className="flex justify-between text-xs">
            <span>${range[0]}.00</span>
            <span>${range[1]}.00</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSlider;
