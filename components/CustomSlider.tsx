import { debounce } from "@/lib/utils";
import { Slider } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  sliderRange: number[];
}

const CustomSlider: React.FC<Props> = ({ sliderRange }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations("ShopPage.Filtration.Filters.Slider");

  const minInitial = sliderRange[0];
  const maxInitial = sliderRange[1];

  const max = searchParams.get("max") ?? maxInitial;
  const min = searchParams.get("min") ?? minInitial;

  const [value, setValue] = useState([+min, +max]);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setValue([+min, +max]);
  }, [min, max]);

  const updateSlider = useCallback(
    (values: number[]) => {
      const params = new URLSearchParams(searchParams);
      params.set("min", values[0].toString());
      params.set("max", values[1].toString());

      replace(`${pathname}/?${params.toString()}`);
    },
    [pathname, searchParams, replace]
  );

  const debouncedUpdateSlider = useMemo(
    () => debounce(updateSlider, 700),
    [updateSlider]
  );

  const changeRangeValue = (e: Event, newValue: number[]) => {
    if (newValue) {
      setValue(newValue);
      debouncedUpdateSlider(newValue);
    }
  };

  return (
    <div className="bg-gray-100 px-4 py-1.5 text-sm font-bold w-60 relative">
      <button
        aria-expanded={showSlider}
        aria-controls="price-slider"
        aria-label={showSlider ? "Close price slider" : "Open price slider"}
        data-id="slider-open-btn"
        className="flex w-full justify-between items-center cursor-pointer"
        onClick={() => setShowSlider((prev) => !prev)}
      >
        <label htmlFor="price-slider" className="block">
          {t("label")}
        </label>
        <Image
          width={10}
          height={10}
          className="rotate-90"
          src="/svg/b9f50123-f337-49a6-b90e-bb3fdf52bbab.svg"
          alt=""
          aria-hidden="true"
          role="presentation"
        />
      </button>
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
            id="price-slider"
            aria-describedby="price-range-values"
            data-id="slider"
            value={value}
            min={minInitial}
            max={maxInitial}
            onChange={changeRangeValue}
            valueLabelDisplay="auto"
            disableSwap
          />
          <div
            className="flex justify-between text-xs"
            id="price-range-values"
            role="status"
            aria-live="polite"
            aria-label="Current price range"
          >
            <span data-id="select-min" aria-label={`Minimum: €${value[0]}`}>
              €{value[0]}.00
            </span>
            <span data-id="select-max" aria-label={`Maximum: €${value[0]}`}>
              €{value[1]}.00
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSlider;
