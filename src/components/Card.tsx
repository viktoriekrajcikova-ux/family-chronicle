export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white shadow-sm border rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
