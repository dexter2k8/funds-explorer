import "./styles.css";
import { ICheckboxProps } from "./types";

export default function Checkbox({ indeterminate = false, ...props }: ICheckboxProps) {
  return (
    <input
      className={`ds-checkbox ${indeterminate ? "ds-checkbox-indeterminate" : ""}`}
      type="checkbox"
      {...props}
    />
  );
}
