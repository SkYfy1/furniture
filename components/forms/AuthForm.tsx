"use client";

import {
  DefaultValues,
  FieldValues,
  useForm,
  SubmitHandler,
  Path,
  FieldError,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { ZodType } from "zod";
import { useRouter } from "next/navigation";
import CustomInput from "./CustomInput";

interface Props<T extends FieldValues> {
  type: "SIGN_UP" | "SIGN_IN";
  schema: ZodType<T>;
  defaultValues: T;
  submitHandler: (data: T) => Promise<{ success: boolean; message?: string }>;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  submitHandler,
}: Props<T>) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const submitForm: SubmitHandler<T> = async (data) => {
    const result = await submitHandler(data);

    if (!result.success) {
      console.log(result?.message);
    } else {
      router.push("/");
    }
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">
      <CustomInput<T>
        register={register}
        error={errors.email as FieldError}
        name={"email" as Path<T>}
      />
      {type === "SIGN_UP" && (
        <CustomInput<T>
          register={register}
          error={errors.name as FieldError}
          name={"name" as Path<T>}
        />
      )}
      <CustomInput<T>
        register={register}
        error={errors.password as FieldError}
        name={"password" as Path<T>}
      />
      <button
        className="w-full bg-black text-white py-2 rounded-sm"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default AuthForm;
