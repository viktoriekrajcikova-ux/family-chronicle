// src/components/Spinner.tsx
import React from "react";
import clsx from "clsx";
import styles from "./Spinner.module.css";

type SpinnerSize = "sm" | "md" | "lg" | "xl";

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

export default function Spinner({
  size = "sm",
  className,
}: SpinnerProps) {
  return (
    <div
      role="status"
      className={clsx(
        styles.spinner,
        styles[size],
        className
      )}
    />
  );
}
