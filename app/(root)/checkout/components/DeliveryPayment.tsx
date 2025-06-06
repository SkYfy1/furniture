import CustomSelect from "@/components/forms/CustomSelect";
import { orderType } from "@/lib/validations";
import { useTranslations } from "next-intl";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<orderType>;
  disableForm: boolean;
  errors: {
    [K in keyof orderType]?: FieldError;
  };
}

const DeliveryPayment: React.FC<Props> = ({
  register,
  errors,
  disableForm,
}) => {
  const t = useTranslations("CheckoutPage.DeliveryPayment");
  return (
    <section className="flex flex-col gap-4 py-6 border-t">
      <h2 className="text-xl font-semibold pl-2">{t("title")}</h2>
      <div className="flex gap-2">
        <CustomSelect
          register={register}
          disabled={disableForm}
          label={t("shippingService")}
          name="shippingService"
          error={errors.shippingService as FieldError}
          options={["MEEST", "NOVAPOST", "UKRPOSTA"]}
        />
        <CustomSelect
          register={register}
          disabled={disableForm}
          label={t("paymentMethod")}
          name="paymentMethod"
          error={errors.paymentMethod as FieldError}
          options={["CARD", "CASH", "CRYPTO"]}
        />
      </div>
    </section>
  );
};

export default DeliveryPayment;
