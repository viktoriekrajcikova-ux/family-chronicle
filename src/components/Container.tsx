import React from "react";
import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  center?: boolean; // text-align + flex columns center
}

export default function Container({
  children,
  className,
  as: Component = "div",
  center = false,
}: ContainerProps) {
  return (
    <Component
      className={clsx(
        "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
        center && "text-center flex flex-col items-center",
        className
      )}
    >
      {children}
    </Component>
  );
}
