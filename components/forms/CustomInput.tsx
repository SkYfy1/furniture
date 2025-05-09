import React from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  error?: FieldError;
  name: Path<T>;
  showPass?: boolean;
}

const CustomInput = <T extends FieldValues>({
  register,
  error,
  name,
  showPass,
}: Props<T>) => {
  return (
    <>
      <label
        htmlFor={name}
        className="w-full px-4 py-1.5 bg-gray border border-gray focus-within:border-black rounded-sm"
      >
        <p className="text-sm font-semibold capitalize">{name}*</p>
        {name == "password" ? (
          <input
            className="bg-gray-200/20 w-full rounded-xs focus:outline-none"
            type={showPass ? "text" : "password"}
            id={name}
            {...register(name as Path<T>)}
          />
        ) : (
          <input
            className="bg-gray-200/20 w-full rounded-xs focus:outline-none"
            type="text"
            id={name}
            {...register(name as Path<T>)}
          />
        )}
      </label>
      {error && <span>{error.message}</span>}
    </>
  );
};

export default CustomInput;
