import CustomInput from "@/components/forms/CustomInput";
import { orderType } from "@/lib/validations";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<orderType>;
  disableForm: boolean;
  errors: { [key in keyof orderType]?: FieldError };
}

const ShippingInfo: React.FC<Props> = ({ register, errors, disableForm }) => {
  return (
    <section className="flex flex-col gap-4 py-6 border-t">
      <h2 className="text-xl font-semibold pl-2">Shipping Info</h2>
      <CustomInput
        disabled={disableForm}
        register={register}
        label="Country / Region"
        name="country"
        error={errors.country as FieldError}
      />
      <div className="flex gap-2">
        <CustomInput
          disabled={disableForm}
          register={register}
          label="First name"
          name="firstName"
          error={errors.firstName as FieldError}
        />
        <CustomInput
          disabled={disableForm}
          register={register}
          label="Last name"
          name="lastName"
          error={errors.lastName as FieldError}
        />
      </div>
      <CustomInput
        disabled={disableForm}
        label="Adress"
        register={register}
        name="address"
        error={errors.address as FieldError}
      />
      <div className="flex gap-2">
        <CustomInput
          disabled={disableForm}
          register={register}
          label="City"
          name="city"
          error={errors.city as FieldError}
        />
        <CustomInput
          disabled={disableForm}
          register={register}
          label="State"
          name="state"
          error={errors.state as FieldError}
        />
        <CustomInput
          disabled={disableForm}
          register={register}
          label="Zip"
          name="zip"
          error={errors.zip as FieldError}
        />
      </div>
    </section>
  );
};

export default ShippingInfo;
