import React from "react";
import clsx from "clsx";
import Spinner from "./Spinner";

type Variant = "primary" | "secondary" | "danger" | "ghost";

export default function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  loading = false,
  disabled = false,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  loading?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1";
  const styles: Record<Variant, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300",
    secondary: "bg-white border text-gray-700 hover:bg-gray-50 focus:ring-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-200",
  };

  return (
    <button
      type={type}
      className={clsx(base, styles[variant], className, {
        "opacity-70 pointer-events-none": disabled || loading,
      })}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner size={16} />}
      {children}
    </button>
  );
}
