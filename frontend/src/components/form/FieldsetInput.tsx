// File: src/components/form/FieldsetInput.tsx
import type React from "react";
import { forwardRef, memo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export type FieldsetInputProps = {
  dataTestId?: string;
  icon?: React.ReactNode;
  label: string;
  errorMessage?: string;
  placeholder?: string;
  type: string;
  value?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const FieldsetInput = memo(
  forwardRef<HTMLInputElement, FieldsetInputProps>(
    (
      {
        dataTestId,
        icon,
        label,
        errorMessage,
        placeholder,
        type,
        name,
        value,
        onChange,
        onBlur,
      },
      ref,
    ) => {
      const [showPassword, setShowPassword] = useState(false);
      const inputColor = errorMessage ? "input-error" : "input-primary";
      const isPasswordField = type === "password";
      const actualInputType = isPasswordField && showPassword ? "text" : type;

      const testIdLabel = dataTestId ? `${dataTestId}-label` : undefined;
      const testIdInput = dataTestId ? `${dataTestId}-input` : undefined;
      const testIdError = dataTestId ? `${dataTestId}-error` : undefined;
      const testIdToggle = dataTestId ? `${dataTestId}-toggle` : undefined;

      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      return (
        <>
          <label
            htmlFor={name}
            className="fieldset-label"
            data-testid={testIdLabel}
          >
            {icon}
            {label}
          </label>
          <div className="relative">
            <input
              ref={ref}
              id={name}
              className={`input w-full ${inputColor} ${isPasswordField ? "pr-12" : ""}`}
              type={actualInputType}
              placeholder={placeholder}
              name={name}
              // keep controlled to avoid React warnings
              value={value ?? ""}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={!!errorMessage}
              data-testid={testIdInput}
            />
            {isPasswordField && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                onClick={togglePasswordVisibility}
                data-testid={testIdToggle}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
          </div>
          <span
            className="text-red-500 text-right text-xs mt-1"
            data-testid={testIdError}
          >
            {errorMessage}
          </span>
        </>
      );
    },
  ),
);