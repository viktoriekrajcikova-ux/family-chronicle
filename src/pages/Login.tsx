import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signIn(email, password);
      navigate("/trips"); // po přihlášení třeba na seznam výletů
    } catch (err: any) {
      setError(err?.message ?? "Přihlášení se nepodařilo");
    }
  };

  return (
    <div>
      <h1>Přihlášení</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="@"
          />
        </div>
        <div>
          <label>Heslo</label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Přihlašuji…" : "Přihlásit se"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Nemáš účet? <Link to="/register">Zaregistruj se</Link>
      </p>
       <p>
        Zapomněl si heslo? <Link to="/resetPassword">Změnit heslo</Link>
      </p>
    </div>
  );
}
