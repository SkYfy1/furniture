import CustomSelect from "@/components/forms/CustomSelect";
import { orderType } from "@/lib/validations";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<orderType>;
  errors: {
    [K in keyof orderType]?: FieldError;
  };
}

const DeliveryPayment: React.FC<Props> = ({ register, errors }) => {
  return (
    <section className="flex flex-col gap-4 py-6 border-t">
      <h2 className="text-xl font-semibold pl-2">Delivery and payment</h2>
      <div className="flex gap-2">
        <CustomSelect
          register={register}
          label="Shipping Service"
          name="shippingService"
          error={errors.shippingService as FieldError}
          options={["MEEST", "NOVAPOST", "UKRPOSTA"]}
        />
        <CustomSelect
          register={register}
          label="Payment Method"
          name="paymentMethod"
          error={errors.paymentMethod as FieldError}
          options={["CARD", "CASH", "CRYPTO"]}
        />
      </div>
    </section>
  );
};

export default DeliveryPayment;
