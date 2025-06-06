import CustomInput from "@/components/forms/CustomInput";
import { orderType } from "@/lib/validations";
import { useTranslations } from "next-intl";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<orderType>;
  disableForm: boolean;
  errors: { [key in keyof orderType]?: FieldError };
}

const ShippingInfo: React.FC<Props> = ({ register, errors, disableForm }) => {
  const t = useTranslations("CheckoutPage.ShippingInfo");
  return (
    <section className="flex flex-col gap-4 py-6 border-t">
      <h2 className="text-xl font-semibold pl-2">{t("title")}</h2>
      <CustomInput
        disabled={disableForm}
        register={register}
        label={t("country")}
        name="country"
        error={errors.country as FieldError}
      />
      <div className="flex gap-2">
        <CustomInput
          disabled={disableForm}
          register={register}
          label={t("firstName")}
          name="firstName"
          error={errors.firstName as FieldError}
        />
        <CustomInput
          disabled={disableForm}
          register={register}
          label={t("lastName")}
          name="lastName"
          error={errors.lastName as FieldError}
        />
      </div>
      <CustomInput
        disabled={disableForm}
        register={register}
        label={t("address")}
        name="address"
        error={errors.address as FieldError}
      />
      <div className="flex gap-2">
        <CustomInput
          disabled={disableForm}
          register={register}
          label={t("city")}
          name="city"
          error={errors.city as FieldError}
        />
        <CustomInput
          disabled={disableForm}
          register={register}
          label={t("state")}
          name="state"
          error={errors.state as FieldError}
        />
        <CustomInput
          disabled={disableForm}
          register={register}
          label={t("zip")}
          name="zip"
          error={errors.zip as FieldError}
        />
      </div>
    </section>
  );
};

export default ShippingInfo;
