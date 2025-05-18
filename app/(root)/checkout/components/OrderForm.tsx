"use client";

import { CreateOrder, ProductInfo } from "@/lib/actions/order";
import { orderSchema, orderType } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import ShippingInfo from "./ShippingInfo";
import DeliveryPayment from "./DeliveryPayment";
import { useAppDispatch } from "@/lib/hooks";
import { clearCart } from "@/lib/features/cartSlice";

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
  const dispatch = useAppDispatch();
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

    if (!result.success) {
      console.log(result.message);
    } else {
      dispatch(clearCart());
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-4 w-[50%]"
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
