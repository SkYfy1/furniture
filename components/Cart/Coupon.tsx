import React, { useState } from "react";

interface Props {
  submitCoupon: (text: string) => void;
}

const Coupon: React.FC<Props> = ({ submitCoupon }) => {
  const [text, setText] = useState("");
  return (
    <div className="flex-2">
      <label
        htmlFor="coupon"
        className="w-full px-4 py-2.5 bg-gray border border-gray focus-within:border-black rounded-sm flex flex-col gap-1.5"
      >
        <p className="text-xs font-semibold capitalize">Coupon code*</p>
        <input
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          placeholder="Voucher code"
          className="bg-gray-200/20 w-full rounded-xs focus:outline-none px-2"
          type="text"
          id="coupon"
        />
      </label>
      <div className="flex gap-2">
        <button
          onClick={() => submitCoupon(text)}
          className="px-2 py-2.5 bg-black text-white rounded-sm text-sm mt-4"
        >
          Use voucher
        </button>
        {text && (
          <button className="px-4 py-2.5 bg-gray text-black rounded-sm text-sm mt-4">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Coupon;
