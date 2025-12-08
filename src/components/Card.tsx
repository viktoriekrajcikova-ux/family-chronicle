import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
  hover?: boolean;      
  onClick?: () => void;  
}

export default function Card({
  children,
  className,
  padded = true,
  hover = false,
  onClick,
}: CardProps) {
  return (
    <article
      onClick={onClick}
      className={clsx(
        "bg-white border border-gray-200 rounded-xl shadow-sm transition",
        hover && "hover:shadow-md hover:-translate-y-[1px] cursor-pointer",
        padded && "p-4 sm:p-6",
        className
      )}
    >
      {children}
    </article>
  );
}
