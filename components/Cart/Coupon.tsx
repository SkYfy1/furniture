import { checkCoupon } from "@/lib/actions/order";
import { addCoupon } from "@/lib/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface Props {
  totalPrice: number;
  couponActivated: boolean;
}

const Coupon: React.FC<Props> = ({ totalPrice, couponActivated }) => {
  const couponData = useAppSelector((state) => state.cart.coupon?.code);
  const dispatch = useAppDispatch();

  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = useTranslations("CartPage.Coupon");

  const handleAddCoupon = async () => {
    if (!coupon.trim()) {
      setError("Please type a coupon!");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const result = await checkCoupon(coupon, totalPrice);

    if (!result.success) {
      setError(result.message!);
    } else {
      const couponInfo = result.couponInfo as Coupon;
      setError(null);
      dispatch(addCoupon(couponInfo));
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex-2">
      <label
        htmlFor="coupon"
        className="w-full px-4 py-2.5 bg-gray border border-gray focus-within:border-black rounded-sm flex flex-col gap-1.5 has-[input:disabled]:bg-gray-200"
      >
        <p className="text-xs font-semibold capitalize">
          <span>
            {t("label")}
            <span aria-hidden="true">*</span>
          </span>
          <span
            id="coupon-error"
            aria-live="assertive"
            className="font-medium pl-1.5 text-red-700"
          >
            {error}
          </span>
        </p>

        {couponActivated ? (
          <div className="w-full rounded-xs px-2">{couponData}</div>
        ) : (
          <input
            disabled={couponActivated || isSubmitting}
            aria-invalid={!!error}
            aria-describedby={error ? "coupon-error" : undefined}
            value={coupon}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCoupon(e.target.value)
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
          disabled={couponActivated || isSubmitting}
          onClick={handleAddCoupon}
          aria-busy={isSubmitting}
          className="px-2 py-2.5 bg-black text-white rounded-sm text-sm mt-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
        >
          {t("use")}
        </button>
        {coupon && (
          <button
            disabled={couponActivated || isSubmitting}
            className="px-4 py-2.5 bg-gray text-black rounded-sm text-sm mt-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
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
