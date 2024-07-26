import "./styles.css";
import { IButtonProps } from "./types";

export default function Button({
  children,
  variant = "default",
  size = "default",
  ...props
}: IButtonProps) {
  const buttonClasses = ["ds-button"];
  variant === "primary" && buttonClasses.push("ds-button-primary");
  variant === "link" && buttonClasses.push("ds-button-link");
  size === "small" && buttonClasses.push("ds-button-small");
  size === "large" && buttonClasses.push("ds-button-large");
  const buttonClass = buttonClasses.join(" ");

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}
