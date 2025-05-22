"use client";

import { CreateOrder, ProductInfo } from "@/lib/actions/order";
import { orderSchema, orderType } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import ShippingInfo from "./ShippingInfo";
import DeliveryPayment from "./DeliveryPayment";
import { redirect } from "next/navigation";

interface Props {
  userId: string;
  action: CreateOrder;
  cartItems: ProductInfo[];
  summaryPrice: number;
}

const OrderForm: React.FC<Props> = ({
  userId,
  cartItems,
  summaryPrice,
  action,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
  });

  const submitForm: SubmitHandler<orderType> = async (data) => {
    const result = await action(
      {
        userId,
        ...data,
      },
      { products: cartItems, summaryPrice }
    );

    if (result.url) {
      redirect(result.url);
    }

    if (!result.success) {
      console.log(result.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-4 px-4 md:w-[50%]"
    >
      <ShippingInfo register={register} errors={errors} />
      <DeliveryPayment register={register} errors={errors} />
      <button className="w-full bg-black text-white py-2 rounded-sm cursor-pointer">
        Submit
      </button>
    </form>
  );
};

export default OrderForm;
