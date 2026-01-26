// src/components/Card.tsx
import React from "react";
import clsx from "clsx";
import CardBase from "./CardBase";
import styles from "./Card.module.css";

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
    <CardBase
      hover={hover}
      onClick={onClick}
      className={clsx(
        styles.card,
        padded && styles.padded,
        className
      )}
    >
      {children}
    </CardBase>
  );
}
