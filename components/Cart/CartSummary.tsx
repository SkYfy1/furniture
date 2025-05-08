import React from "react";

interface Props {
  summary: number;
  discount: number;
  tax: number;
}

const CartSummary: React.FC<Props> = ({ summary, discount, tax }) => {
  return (
    <div className="py-5 flex flex-col gap-3 min-w-1/4 border-b-2">
      <div className="text-xs text-gray-500 flex justify-between items-center">
        <p>Savings</p>
        <span>€{discount}.00</span>
      </div>
      <div className="text-xs text-gray-500 flex justify-between items-center">
        <p>Tax Amount</p>
        <span>€{tax}.00</span>
      </div>
      <div className=" font-semibold flex justify-between items-center mt-1">
        <p>To pay</p>
        <span>€{summary + tax}.00</span>
      </div>
    </div>
  );
};

export default CartSummary;
