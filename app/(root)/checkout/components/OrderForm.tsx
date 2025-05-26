"use client";

import { CreateOrder, ProductInfo } from "@/lib/actions/order";
import { orderSchema, orderType } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import ShippingInfo from "./ShippingInfo";
import DeliveryPayment from "./DeliveryPayment";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import CustomCheckbox from "@/components/forms/CustomCheckbox";

interface Props {
  userId: string;
  action: CreateOrder;
  cartItems: ProductInfo[];
  summaryPrice: number;
  defaultValues?: orderType;
}

const OrderForm: React.FC<Props> = ({
  userId,
  cartItems,
  summaryPrice,
  defaultValues,
  action,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
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
      <ShippingInfo
        disableForm={isSubmitting}
        register={register}
        errors={errors}
      />
      <DeliveryPayment
        disableForm={isSubmitting}
        register={register}
        errors={errors}
      />
      <div className="flex items-center justify-between">
        <CustomCheckbox
          control={control}
          disabled={isSubmitting}
          text="Save as default"
          name="default"
          defaultValue={defaultValues?.default as boolean}
        />
        <Button
          disabled={isSubmitting}
          onClick={() => reset({})}
          variant="destructive"
          type="button"
          size="sm"
          className="w-fit"
        >
          Reset form
        </Button>
      </div>
      <Button
        disabled={isSubmitting}
        className="w-full bg-black text-white py-2 rounded-sm cursor-pointer text-base"
      >
        Submit
      </Button>
    </form>
  );
};

export default OrderForm;
