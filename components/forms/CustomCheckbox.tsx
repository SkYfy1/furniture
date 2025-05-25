import React from "react";
import {
  FieldValues,
  Path,
  PathValue,
  useController,
  type Control,
} from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  defaultValue: PathValue<T, Path<T>>;
  text?: string;
}

const CustomCheckbox = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  text,
}: Props<T>) => {
  const { field } = useController({ name: name, control, defaultValue });
  return (
    <div className="flex items-center gap-2 text-sm">
      <Checkbox
        id={name}
        value={field.value}
        onCheckedChange={field.onChange}
        className="cursor-pointer"
      />
      {text && <label htmlFor={name}>{text}</label>}
    </div>
  );
};

export default CustomCheckbox;
