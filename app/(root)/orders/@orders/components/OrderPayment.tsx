import { Button } from "@/components/ui/Button";
import { paymentInfo } from "@/db/tableTypes";
import { cancelOrder } from "@/lib/actions/order";
import Link from "next/link";
import React from "react";

const OrderPayment: React.FC<{ payment: paymentInfo; orderId: string }> = ({
  payment,
  orderId,
}) => {
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
      <div>
        <Button asChild className="flex mb-2">
          <Link href="/receipt">Print receipt</Link>
        </Button>
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => {
            cancelOrder(orderId);
          }}
        >
          Cancel order
        </Button>
      </div>
    </div>
  );
};

export default OrderPayment;
