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
import { useTranslations } from "next-intl";

interface Props {
  email: string;
  action: CreateOrder;
  cartItems: ProductInfo[];
  summaryPrice: number;
  defaultValues?: orderType;
}

const OrderForm: React.FC<Props> = ({
  email,
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

  const t = useTranslations("CheckoutPage");

  const submitForm: SubmitHandler<orderType> = async (data) => {
    const result = await action(
      {
        email,
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
          text={t("saveDefault")}
          name="default"
          defaultValue={false}
        />
        <Button
          disabled={isSubmitting}
          onClick={() => {
            reset({});
            setTimeout(() => reset({}), 300);
          }}
          variant="destructive"
          type="button"
          size="sm"
          className="w-fit"
        >
          {t("reset")}
        </Button>
      </div>
      <Button
        disabled={isSubmitting}
        className="w-full bg-black text-white py-2 rounded-sm cursor-pointer text-base"
      >
        {t("submit")}
      </Button>
    </form>
  );
};

export default OrderForm;
