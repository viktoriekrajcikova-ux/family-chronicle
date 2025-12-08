import React from "react";
import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string | null;
};

export default function Input({ className, error, ...rest }: Props) {
  return (
    <div>
      <input
        className={clsx(
          "mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300",
          { "border-red-300": error },
          className
        )}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
