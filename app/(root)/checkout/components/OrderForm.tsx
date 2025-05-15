"use client";

import { CreateOrder } from "@/lib/actions/order";
import { useAppSelector } from "@/lib/hooks";
import { orderSchema, orderType } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import ShippingInfo from "./ShippingInfo";
import DeliveryPayment from "./DeliveryPayment";

interface Props {
  userId: string;
  action: CreateOrder;
}

const OrderForm: React.FC<Props> = ({ userId, action }) => {
  const cart = useAppSelector((state) => state.cart.items);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
  });

  const orderProducts = cart.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    price: item.newPrice,
  }));

  const summaryPrice = 1000;

  const submitForm: SubmitHandler<orderType> = async (data) => {
    const result = await action(
      {
        userId,
        fullName: data.firstName,
        address: data.address,
        paymentMethod: data.paymentMethod,
        shippingService: data.shippingService,
      },
      { products: orderProducts, summaryPrice }
    );

    if (!result.success) {
      console.log(result.message);
    } else {
      router.push("/success");
    }
  };

  //   if (!cart.length) {
  //     router.push("/");
  //   }

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
