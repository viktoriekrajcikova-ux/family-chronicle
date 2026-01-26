// src/components/FormField.tsx
import React from "react";
import clsx from "clsx";
import styles from "./FormField.module.css";

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
    <div className={clsx(styles.field, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      {/* Input / textarea / select */}
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, { id })
          : child
      )}

      {hint && !error && <div className={styles.hint}>{hint}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
