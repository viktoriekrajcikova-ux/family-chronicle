import React from "react";
import clsx from "clsx";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  hint?: string;
  error?: string;
  id?: string;
  required?: boolean;
  className?: string;
}

export function FormField({
  label,
  children,
  hint,
  error,
  id,
  required = false,
  className,
}: FormFieldProps) {
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 flex items-center gap-1"
      >
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>

      {/* pole (Input, textarea, select...) */}
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as any, { id })
          : child
      )}

      {/* pomocný text */}
      {hint && !error && (
        <div className="text-xs text-gray-500">{hint}</div>
      )}

      {/* chybová hláška */}
      {error && (
        <div className="text-xs text-red-600">{error}</div>
      )}
    </div>
  );
}
