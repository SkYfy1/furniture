import { cn } from "@/lib/utils";
import React from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  disabled?: boolean;
  error?: FieldError;
  label?: string;
  name: Path<T>;
  showPass?: boolean;
}

const CustomInput = <T extends FieldValues>({
  register,
  disabled,
  error,
  name,
  label,
  showPass,
}: Props<T>) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor={name}
        className={cn(
          "w-full px-4 py-1.5 bg-gray border border-gray focus-within:border-black rounded-sm",
          error && "border-red-400 ",
          disabled && "bg-gray-200"
        )}
      >
        <p className="text-sm font-semibold capitalize">{label}*</p>
        {name == "password" ? (
          <input
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            disabled={disabled}
            className="bg-gray-200/20 w-full rounded-xs focus:outline-none"
            type={showPass ? "text" : "password"}
            id={name}
            {...register(name as Path<T>)}
          />
        ) : (
          <input
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            className="bg-gray-200/20 w-full rounded-xs focus:outline-none"
            type="text"
            disabled={disabled}
            id={name}
            {...register(name as Path<T>)}
          />
        )}
      </label>
      {error && (
        <span id={`${name}-error`} className="text-xs text-red-600 ml-3">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
