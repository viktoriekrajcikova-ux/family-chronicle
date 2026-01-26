// src/components/CardBase.tsx
import React from "react";
import clsx from "clsx";
import styles from "./CardBase.module.css";

interface CardBaseProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function CardBase({
  children,
  className,
  hover = false,
  onClick,
}: CardBaseProps) {
  return (
    <article
      onClick={onClick}
      className={clsx(
        styles.base,
        hover && styles.hover,
        className
      )}
    >
      {children}
    </article>
  );
}
