// src/pages/RequestReset.tsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

export default function RequestReset() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const emailIsValid = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setError(null);

    if (!emailIsValid(email)) {
      setError("Zadej platný e-mail.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email.trim());
      setStatus("Poslali jsme ti e-mail s odkazem pro reset hesla. Zkontroluj schránku.");
    } catch (err: any) {
      console.error("Reset error:", err);
      setError(err?.message ?? "Nepodařilo se odeslat resetovací e-mail.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Reset hesla</h1>

      {status && (
        <div className="mb-4 p-3 rounded bg-green-50 border border-green-100 text-green-700">
          {status}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded bg-red-50 border border-red-100 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`${loading ? "opacity-60 pointer-events-none" : ""} space-y-4`}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            value={email}
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-70"
        >
          {loading && <Spinner size={16} />}
          <span>{loading ? "Odesílám…" : "Poslat reset odkaz"}</span>
        </button>
      </form>
    </div>
  );
}
