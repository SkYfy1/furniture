import { paymentInfo } from "@/db/tableTypes";
import Link from "next/link";
import React from "react";

const OrderPayment: React.FC<{ payment: paymentInfo }> = ({ payment }) => {
  return (
    <div className="flex-col flex justify-between py-2">
      <div>
        <h1 className="text-lg font-semibold">Payment Info</h1>
        <div className="flex text-sm flex-col gap-1 pt-4">
          <p>Status: {payment.paymentStatus}</p>
          <p>Type: {payment.paymentType}</p>
          <p>
            Date:{" "}
            {payment.paymentDate?.toDateString().split(" ").slice(1).join(" ")}
          </p>
        </div>
      </div>
      <Link
        href="/receipt"
        className="bg-black rounded-md w-full border border-black text-center hover:bg-gray hover:text-black duration-400 py-2 text-sm text-white "
      >
        Print receipt
      </Link>
    </div>
  );
};

export default OrderPayment;
