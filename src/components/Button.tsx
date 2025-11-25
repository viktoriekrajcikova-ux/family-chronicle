export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  [k: string]: any;
}) {
  const base = "inline-flex items-center gap-2 px-4 py-2 rounded focus:outline-none";
  const styles: Record<string,string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-white border text-gray-700 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
