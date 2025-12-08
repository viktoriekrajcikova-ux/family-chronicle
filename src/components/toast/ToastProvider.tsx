import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import clsx from "clsx";

type Toast = {
  id: string;
  message: string;
  type?: "info" | "success" | "error";
  ttl?: number;
};

type ToastContextType = {
  push: (message: string, opts?: { type?: Toast["type"]; ttl?: number }) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToastContext must be used inside ToastProvider");
  return ctx;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, opts?: { type?: Toast["type"]; ttl?: number }) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    const ttl = opts?.ttl ?? 4000;
    const t: Toast = { id, message, type: opts?.type ?? "info", ttl };
    setToasts((s) => [...s, t]);
    if (ttl > 0) {
      setTimeout(() => {
        setToasts((s) => s.filter((x) => x.id !== id));
      }, ttl);
    }
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((s) => s.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => ({ push, dismiss }), [push, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast container */}
      <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2 items-end">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={clsx(
              "w-80 max-w-xs rounded shadow p-3 text-sm",
              t.type === "success" && "bg-green-50 border border-green-100 text-green-800",
              t.type === "error" && "bg-red-50 border border-red-100 text-red-800",
              t.type === "info" && "bg-white border border-gray-100 text-gray-800"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">{t.message}</div>
              <button onClick={() => dismiss(t.id)} className="text-xs text-gray-500">Zavřít</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
