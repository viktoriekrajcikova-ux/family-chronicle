import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (password !== password2) {
      setError("Hesla se neshodují");
      return;
    }
    if (password.length < 6) {
      setError("Heslo musí mít alespoň 6 znaků");
      return;
    }

    try {
      await signUp(email, password);
      // Supabase může vyžadovat potvrzení e-mailu – zobrazíme info
      setInfo("Registrace proběhla. Zkontroluj e-mail pro potvrzení.");
      // Volitelně: po chvilce na login
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err?.message ?? "Registrace se nepodařila");
    }
  };

  return (
    <div>
      <h1>Registrace</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label>Heslo</label>
          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="min. 6 znaků"
          />
        </div>
        <div>
          <label>Heslo znovu</label>
          <input
            type="password"
            autoComplete="new-password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            placeholder="zadej znovu heslo"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Zakládám účet…" : "Zaregistrovat se"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {info && <p style={{ color: "green" }}>{info}</p>}

      <p>
        Už máš účet? <Link to="/login">Přihlas se</Link>
      </p>
    </div>
  );
}
