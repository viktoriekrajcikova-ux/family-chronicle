// src/pages/ChangePassword.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/Container";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";
import styles from "./ChangePassword.module.css";

export default function ChangePassword() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const MIN_LENGTH = 6;

  const validate = () => {
    setError(null);

    if (password !== password2) {
      setError("Hesla se neshodují.");
      return false;
    }

    if (password.length < MIN_LENGTH) {
      setError(`Heslo musí mít alespoň ${MIN_LENGTH} znaků.`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setError(null);

    if (!validate()) return;

    try {
      setLoading(true);
      await updatePassword(password);
      setMsg("Heslo bylo úspěšně změněno.");
      toast.push("Heslo bylo úspěšně změněno.", { type: "success" });

      setTimeout(() => navigate("/"), 900);
    } catch (err: any) {
      const message = err?.message ?? "Chyba při změně hesla.";
      setError(message);
      toast.push(message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const passwordStrengthText = () => {
    if (!password) return "Zadej nové heslo";
    if (password.length < MIN_LENGTH) return "Heslo je příliš krátké";
    if (password.length < 10) return "Střední síla hesla";
    return "Silné heslo";
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Změna hesla</h1>

        {msg && <div className={styles.success}>{msg}</div>}
        {error && <div className={styles.error}>{error}</div>}

        <form
          onSubmit={handleSubmit}
          className={loading ? styles.disabled : undefined}
        >
          <div className={styles.form}>
            <div>
              <label className={styles.label}>Nové heslo</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Zadej nové heslo"
                required
                minLength={MIN_LENGTH}
                autoComplete="new-password"
              />
              <div className={styles.hint}>{passwordStrengthText()}</div>
            </div>

            <div>
              <label className={styles.label}>Nové heslo znovu</label>
              <Input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Zadej heslo znovu"
                required
                autoComplete="new-password"
              />
            </div>

            <div className={styles.actions}>
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Změnit heslo"}
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Zpět
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}
