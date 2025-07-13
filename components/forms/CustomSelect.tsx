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
  options: string[];
}

const CustomSelect = <T extends FieldValues>({
  register,
  error,
  name,
  label,
  options,
  disabled,
}: Props<T>) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor={name}
        className={cn(
          "px-4 py-1.5 bg-gray border border-gray focus-within:border-black rounded-sm",
          disabled && "bg-gray-200",
          error && "border-red-400"
        )}
      >
        <p className="text-sm font-semibold capitalize">
          {label}
          <span aria-hidden="true">*</span>
        </p>
        <select
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          disabled={disabled}
          className="bg-gray-200/20 w-full rounded-xs focus:outline-none"
          id={name}
          {...register(name as Path<T>)}
        >
          <option value="">Please Choose...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      {error && (
        <span
          className="text-xs text-red-600 ml-3"
          id={`${name}-error`}
          aria-live="assertive"
        >
          {error.message}
          <span aria-hidden="true">*</span>
        </span>
      )}
    </div>
  );
};

export default CustomSelect;
