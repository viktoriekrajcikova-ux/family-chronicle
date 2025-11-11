import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ChangePassword() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setError(null);
    if (password !== password2) {
      setError("Hesla se neshodují");
      return;
    }
    if (password.length < 6) {
      setError("Heslo musí mít alespoň 6 znaků");
      return;
    }

    setLoading(true);
    try {
      await updatePassword(password);
      setMsg("Heslo bylo úspěšně změněno.");
      setTimeout(() => navigate("/"), 1500);
    } catch (err: any) {
      setError(err.message || "Chyba při změně hesla");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Změna hesla</h1>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="Nové heslo" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="password" placeholder="Nové heslo znovu" value={password2} onChange={e => setPassword2(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Ukládám..." : "Změnit heslo"}</button>
      </form>

      {msg && <p style={{ color: "green" }}>{msg}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
