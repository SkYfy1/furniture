"use client";

import {
  DefaultValues,
  FieldValues,
  useForm,
  SubmitHandler,
  Path,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { ZodType } from "zod";
import { useRouter } from "next/navigation";

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
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-3 w-1/3"
    >
      <input
        className="bg-gray"
        type="text"
        {...register("email" as Path<T>)}
      />
      {errors.email && <span>errors.email.message</span>}
      {type === "SIGN_UP" && (
        <input
          className="bg-gray"
          type="text"
          {...register("name" as Path<T>)}
        />
      )}
      {errors.name && <span>errors.name.message</span>}
      <input
        className="bg-gray"
        type="text"
        {...register("password" as Path<T>)}
      />
      {errors.password && <span>errors.password.message</span>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AuthForm;
