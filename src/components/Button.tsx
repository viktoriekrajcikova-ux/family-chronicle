import React from "react";
import clsx from "clsx";
import Spinner from "./Spinner";

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
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";

  const styles: Record<Variant, string> = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300 disabled:bg-indigo-400",
    secondary:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300 disabled:bg-gray-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300 disabled:bg-red-400",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-200 disabled:text-gray-400",
  };

  return (
    <button
      type={type}
      className={clsx(
        base,
        styles[variant],
        {
          "opacity-80 pointer-events-none": loading,
          "w-full": fullWidth,
        },
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner size={16} />}
      {children}
    </button>
  );
}
