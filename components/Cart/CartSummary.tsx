import React from "react";

const CartSummary = () => {
  return (
    <div className="py-5 flex flex-col gap-3 min-w-1/4 border-b-2">
      <div className="text-xs text-gray-500 flex justify-between items-center">
        <p>Savings</p>
        <span>€6.00</span>
      </div>
      <div className="text-xs text-gray-500 flex justify-between items-center">
        <p>Tax Amount</p>
        <span>€6.00</span>
      </div>
      <div className=" font-semibold flex justify-between items-center mt-1">
        <p>To pay</p>
        <span>€6.00</span>
      </div>
    </div>
  );
};

export default CartSummary;
