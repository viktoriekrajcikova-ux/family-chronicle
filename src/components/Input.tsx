// src/components/Input.tsx
import React from "react";
import clsx from "clsx";
import styles from "./Input.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string | null;
};

export default function Input({
  className,
  error,
  disabled,
  ...rest
}: Props) {
  return (
    <div className={styles.wrapper}>
      <input
        disabled={disabled}
        className={clsx(
          styles.input,
          error && styles.error,
          disabled && styles.disabled,
          className
        )}
        {...rest}
      />

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}
