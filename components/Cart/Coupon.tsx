import { useTranslations } from "next-intl";
import React from "react";

interface Props {
  coupon?: string;
  value: string;
  setValue: (text: string) => void;
  handleAddCoupon: () => void;
  couponActivated: boolean;
  error: string | null;
}

const Coupon: React.FC<Props> = ({
  coupon,
  value,
  setValue,
  handleAddCoupon,
  couponActivated,
  error,
}) => {
  const t = useTranslations("CartPage.Coupon");
  return (
    <div className="flex-2">
      <label
        htmlFor="coupon"
        className="w-full px-4 py-2.5 bg-gray border border-gray focus-within:border-black rounded-sm flex flex-col gap-1.5 has-[input:disabled]:bg-gray-200"
      >
        <p className="text-xs font-semibold capitalize">
          <span>{t("label")}*</span>
          <span className="font-medium pl-1.5 text-red-700">{error}</span>
        </p>

        {couponActivated ? (
          <div className="w-full rounded-xs px-2">{coupon}</div>
        ) : (
          <input
            disabled={couponActivated}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            placeholder={t("placeholder")}
            className="bg-gray-200/20 w-full rounded-xs focus:outline-none px-2 disabled:cursor-not-allowed"
            type="text"
            id="coupon"
          />
        )}
      </label>
      <div className="flex gap-2">
        <button
          disabled={couponActivated}
          onClick={handleAddCoupon}
          className="px-2 py-2.5 bg-black text-white rounded-sm text-sm mt-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
        >
          {t("use")}
        </button>
        {value && (
          <button
            disabled={couponActivated}
            className="px-4 py-2.5 bg-gray text-black rounded-sm text-sm mt-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => {
              setValue("");
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
