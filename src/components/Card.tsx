import React from "react";
import clsx from "clsx";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={clsx("bg-white border rounded-lg overflow-hidden shadow-sm", className)}>
      {children}
    </article>
  );
}
