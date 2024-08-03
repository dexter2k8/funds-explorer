import "./styles.css";
import { IButtonProps } from "./types";

export default function Button({
  children,
  variant = "default",
  size = "default",
  loading = false,
  ...props
}: IButtonProps) {
  const buttonClasses = ["ds-button"];
  variant === "primary" && buttonClasses.push("ds-button-primary");
  variant === "link" && buttonClasses.push("ds-button-link");
  size === "small" && buttonClasses.push("ds-button-small");
  size === "large" && buttonClasses.push("ds-button-large");
  loading && buttonClasses.push("ds-button-loading");
  const buttonClass = buttonClasses.join(" ");

  return (
    <button className={buttonClass} {...props}>
      <div style={{ position: "relative" }}>
        <span className={loading ? "ds-loading" : ""} />
      </div>
      <p>{children}</p>
    </button>
  );
}
