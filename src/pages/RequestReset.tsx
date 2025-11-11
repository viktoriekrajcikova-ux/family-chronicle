import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function RequestReset() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setError(null);

    try {
      await resetPassword(email);
      setStatus("Poslali jsme ti e-mail s odkazem pro reset hesla. Zkontroluj schránku.");
    } catch (err: any) {
      setError(err.message || "Nepodařilo se poslat email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Reset hesla</h1>
      <form onSubmit={handleSubmit}>
        <label>
          E-mail:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Odesílám..." : "Poslat odkaz"}</button>
      </form>

      {status && <p style={{ color: "green" }}>{status}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
