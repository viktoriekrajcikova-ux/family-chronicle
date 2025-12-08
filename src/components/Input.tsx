import React from "react";
import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string | null;
};

export default function Input({ className, error, disabled, ...rest }: Props) {
  return (
    <div className="flex flex-col">
      <input
        disabled={disabled}
        className={clsx(
          "block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm shadow-sm",
          "focus:border-indigo-500 focus:ring-indigo-300 focus:ring-2 focus:outline-none",
          "disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed",
          error && "border-red-500 focus:border-red-500 focus:ring-red-300",
          className
        )}
        {...rest}
      />

      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
