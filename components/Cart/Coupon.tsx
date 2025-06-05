import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  coupon: string;
  setCoupon: (text: string) => void;
  handleAddCoupon: () => void;
  couponActivated: boolean;
}

const Coupon: React.FC<Props> = ({
  coupon,
  setCoupon,
  handleAddCoupon,
  couponActivated,
}) => {
  const t = useTranslations("CartPage.Coupon");
  return (
    <div className="flex-2">
      <label
        htmlFor="coupon"
        className="w-full px-4 py-2.5 bg-gray border border-gray focus-within:border-black rounded-sm flex flex-col gap-1.5"
      >
        <p className="text-xs font-semibold capitalize">{t("label")}*</p>
        <input
          disabled={couponActivated}
          value={coupon}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCoupon(e.target.value)
          }
          placeholder={t("placeholder")}
          className="bg-gray-200/20 w-full rounded-xs focus:outline-none px-2 disabled:cursor-not-allowed"
          type="text"
          id="coupon"
        />
      </label>
      <div className="flex gap-2">
        <button
          disabled={couponActivated}
          onClick={handleAddCoupon}
          className="px-2 py-2.5 bg-black text-white rounded-sm text-sm mt-4 cursor-pointer disabled:cursor-not-allowed"
        >
          {t("use")}
        </button>
        {coupon && (
          <button
            disabled={couponActivated}
            className="px-4 py-2.5 bg-gray text-black rounded-sm text-sm mt-4 cursor-pointer disabled:cursor-not-allowed"
            onClick={() => {
              setCoupon("");
            }}
          >
            {t("clear")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Coupon;
