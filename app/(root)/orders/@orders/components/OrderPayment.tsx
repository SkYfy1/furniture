import { Button } from "@/components/ui/Button";
import { paymentInfo } from "@/db/tableTypes";
import { cancelOrder } from "@/lib/actions/order";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  payment: paymentInfo;
  orderId: string;
  retryAction: () => Promise<void>;
}

const OrderPayment: React.FC<Props> = ({ payment, orderId, retryAction }) => {
  const cancelled = payment.paymentStatus === "REJECTED";
  const isPaid = payment.paymentStatus === "PAID";
  return (
    <div className="flex-col flex justify-between py-2">
      <div>
        <h1 className="text-lg font-semibold">Payment Info</h1>
        <div className="flex text-sm flex-col gap-1 pt-4">
          <p>
            Status:{" "}
            <span
              className={cn(
                "font-semibold",
                isPaid && "text-green-price",
                cancelled && "text-red-900"
              )}
            >
              {payment.paymentStatus}
            </span>
          </p>
          <p>Type: {payment.paymentType}</p>
          <p>
            Date:{" "}
            {payment.paymentDate?.toDateString().split(" ").slice(1).join(" ")}
          </p>
        </div>
      </div>
      {!cancelled && (
        <div>
          {isPaid ? (
            <Button asChild className="flex mb-2">
              <Link href="/receipt">Print receipt</Link>
            </Button>
          ) : (
            <Button
              onClick={retryAction}
              className="flex w-full mb-2 hover:border-green-600 hover:text-green-600"
            >
              Pay now
            </Button>
          )}
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
      )}
    </div>
  );
};

export default OrderPayment;
