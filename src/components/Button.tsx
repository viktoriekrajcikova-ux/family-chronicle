// src/components/Button.tsx
import React from "react";
import clsx from "clsx";
import Spinner from "./Spinner";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  loading = false,
  disabled = false,
  fullWidth = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner size={16} />}
      <span className={styles.label}>{children}</span>
    </button>
  );
}
