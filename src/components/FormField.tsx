import React from "react";

export function FormField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>
      {children}
      {hint && <div className="text-xs text-gray-500 mt-1">{hint}</div>}
    </label>
  );
}
