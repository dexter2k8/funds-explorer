import { ChangeEvent } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Input, { IInputProps } from "../Input";
import { formatBRL } from "@/utils/lib";

interface IControlledInputProps<T extends FieldValues> extends Omit<IInputProps, "onChange"> {
  name: Path<T>;
  control: Control<T>;
  rawValue?: (value: string) => void;
}

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const txt = e.target.value;
  return "R$" + formatBRL(txt).value;
};

export const InputCurrency = <T extends FieldValues>({
  name,
  control,
  rawValue,
  ...props
}: IControlledInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          type="search"
          {...field}
          {...props}
          message={error?.message}
          status={error ? "error" : undefined}
          onChange={(e) => field.onChange(handleChange(e))}
          value={field.value ?? ""}
        />
      )}
    />
  );
};
