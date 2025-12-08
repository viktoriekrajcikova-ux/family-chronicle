import React from "react";
import clsx from "clsx";

type SpinnerSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-10 w-10",
};

export default function Spinner({
  size = "sm",
  className,
}: {
  size?: SpinnerSize;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={clsx(
        "animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600",
        sizeMap[size],
        className
      )}
    />
  );
}
