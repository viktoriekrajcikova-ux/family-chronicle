// src/pages/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { Button, Input } from "../components";

export default function Register() {
  const { signUp, loading: authLoading } = useAuth(); // očekáváme signUp(email,password): Promise<void>
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const isLoading = authLoading ?? false;
  const MIN_PWD = 6;

  const emailLooksValid = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!emailLooksValid(email)) {
      setError("Zadej platný e-mail.");
      return;
    }
    if (password !== password2) {
      setError("Hesla se neshodují.");
      return;
    }
    if (password.length < MIN_PWD) {
      setError(`Heslo musí mít alespoň ${MIN_PWD} znaků.`);
      return;
    }

    try {
      setError(null);
      setInfo(null);
      // Volání signUp - uprav podle své implementace, např. signUp({email, password})
      await signUp(email.trim(), password);
      setInfo("Registrace proběhla. Zkontroluj e-mail pro potvrzení (pokud je potřeba).");
      // přesměruj na login po chviličce
      setTimeout(() => navigate("/login"), 1400);
    } catch (err: any) {
      console.error("register error", err);
      setError(err?.message ?? "Registrace se nepodařila.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Registrace</h1>

      {info && (
        <div className="mb-4 p-3 rounded bg-green-50 border border-green-100 text-green-700">
          {info}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded bg-red-50 border border-red-100 text-red-700">
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
            placeholder="you@example.com"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Heslo</label>
          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={`Minimálně ${MIN_PWD} znaků`}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Heslo znovu</label>
          <Input
            type="password"
            autoComplete="new-password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Zadej heslo znovu"
            required            
            >
          </Input>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            disabled={isLoading}
            type="submit"
          >
            {isLoading && <Spinner size={16} />}
            <span>{isLoading ? "Zakládám účet…" : "Zaregistrovat se"}</span>
          </Button>

          <Link to="/login" className="ml-auto text-sm px-3 py-2 rounded border bg-white hover:bg-gray-50">
            Už máš účet? Přihlásit se
          </Link>
        </div>
      </form>
    </div>
  );
}
