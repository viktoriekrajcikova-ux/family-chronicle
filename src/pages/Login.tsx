// src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

export default function Login() {
  const { signIn, loading: authLoading } = useAuth(); // očekáváme signIn(email,password): Promise<void>
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const isLoading = authLoading ?? false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Vyplň e-mail i heslo.");
      return;
    }

    try {
      await signIn(email.trim(), password);
      navigate("/trips");
    } catch (err: any) {
      console.error("login error", err);
      setError(err?.message ?? "Přihlášení se nepodařilo.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Přihlášení</h1>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={`${isLoading ? "opacity-60 pointer-events-none" : ""} space-y-4`}>
        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tvuj@email.cz"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Heslo</label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 p-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <Link to="/resetPassword" className="text-sm text-indigo-600 hover:underline">
            Zapomněl(a) jsi heslo?
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-70"
          >
            {isLoading && <Spinner size={16} />}
            <span>{isLoading ? "Přihlašuji…" : "Přihlásit se"}</span>
          </button>

          <Link
            to="/register"
            className="ml-auto text-sm px-3 py-2 rounded border bg-white hover:bg-gray-50"
          >
            Zaregistrovat se
          </Link>
        </div>
      </form>
    </div>
  );
}
