import { Button } from "@/components/ui/Button";
import { paymentInfo } from "@/db/tableTypes";
import { cancelOrder } from "@/lib/actions/order";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

interface Props {
  payment: paymentInfo;
  orderId: string;
  retryAction: () => Promise<void>;
}

const OrderPayment: React.FC<Props> = ({ payment, orderId, retryAction }) => {
  const cancelled = payment.paymentStatus === "REJECTED";
  const isPaid = payment.paymentStatus === "PAID";
  const t = useTranslations("OrdersPage.Orders.Order.OrderDetails.Payment");
  return (
    <div className="flex-col flex justify-between py-2">
      <div>
        <h1 className="text-lg font-semibold">{t("title")}</h1>
        <div className="flex text-sm flex-col gap-1 pt-4">
          <p>
            {t("status")}:{" "}
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
          <p>
            {t("type")}: {payment.paymentType}
          </p>
          <p>
            {t("date")}:{" "}
            {payment.paymentDate?.toDateString().split(" ").slice(1).join(" ")}
          </p>
        </div>
      </div>
      {!cancelled && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.2,
            },
          }}
        >
          {isPaid ? (
            <Button asChild className="flex mb-2">
              <Link href="/receipt">{t("buttons.receipt")}</Link>
            </Button>
          ) : (
            <Button
              onClick={retryAction}
              className="flex w-full mb-2 hover:border-green-600 hover:text-green-600"
            >
              {t("buttons.payNow")}
            </Button>
          )}
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              cancelOrder(orderId);
            }}
          >
            {t("buttons.cancel")}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default OrderPayment;
