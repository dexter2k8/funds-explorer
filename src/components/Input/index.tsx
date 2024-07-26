"use client";
import "./styles.css";
import Eye from "./Icons/eye";
import EyeSlashed from "./Icons/eye-slashed";
import InfoCircle from "./Icons/info-circle";
import CheckCircle from "./Icons/check-circle";
import ExclamationCircle from "./Icons/exclamation-circle";
import { useState } from "react";

type TStatus = "info" | "success" | "error";
type size = "small" | "default" | "large";

interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  status?: TStatus;
  message?: string;
  size?: size;
}

const messageIcon = (status: TStatus) => {
  const icon = {
    info: <InfoCircle />,
    success: <CheckCircle />,
    error: <ExclamationCircle />,
  };
  return icon[status];
};

const Input: React.FC<IInputProps> = ({
  label,
  status = "info",
  message,
  placeholder,
  type,
  size = "default",
  disabled,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="dx-input-container">
      <input
        placeholder={(label && " ") || placeholder}
        disabled={disabled}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        className={`
          dx-input-compact
          ${!label ? "dx-input-labelInput" : ""} 
          ${type === "password" ? "dx-input-password" : ""} 
          ${disabled ? "dx-input-disabled" : ""} 
          ${status === "error" ? "dx-input-error" : status === "success" ? "dx-input-success " : ""}
          ${size === "small" ? "dx-input-small" : size === "large" ? "dx-input-large" : ""}
        `}
        {...props}
      />

      <label
        className={`
        ${disabled ? "dx-input-disabled" : ""}
        ${
          size === "small" ? "dx-input-label-small" : size === "large" ? "dx-input-label-large" : ""
        }
      `}
      >
        {label}
      </label>

      {type === "password" && (
        <span
          className={`${disabled ? "dx-input-disabled" : ""} ${!label ? "dx-input-labelSpan" : ""}`}
          onClick={() => !disabled && setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye /> : <EyeSlashed />}
        </span>
      )}

      {message && (
        <p
          className={
            status === "info"
              ? "dx-input-infoMessage"
              : status === "success"
              ? "dx-input-successMessage"
              : "dx-input-errorMessage"
          }
        >
          {messageIcon(status)} {message}
        </p>
      )}
    </div>
  );
};

export default Input;
