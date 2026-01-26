// src/components/Container.tsx
import React from "react";
import clsx from "clsx";
import styles from "./Container.module.css";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  center?: boolean; // centrovaný obsah (např. homepage)
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
        styles.container,
        center && styles.center,
        className
      )}
    >
      {children}
    </Component>
  );
}
