// src/pages/RequestReset.tsx
import { useState } from "react";
import Container from "../components/Container";
import Card from "../components/tripCard/Card";
import { FormField } from "../components/FormField";
import Input from "../components/Input";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";
import { useAuth } from "../context/AuthContext";
import styles from "./RequestReset.module.css";

export default function RequestReset() {
  const { resetPassword } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      const msg =
        "Poslali jsme ti e-mail s odkazem pro reset hesla. Zkontroluj schránku.";
      setStatus(msg);
      toast.push(msg, { type: "success" });
    } catch (err: any) {
      const msg =
        err?.message ?? "Nepodařilo se odeslat resetovací e-mail.";
      setError(msg);
      toast.push(msg, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Reset hesla</h1>

        {status && <div className={styles.success}>{status}</div>}
        {error && <div className={styles.error}>{error}</div>}

        <Card>
          <form
            onSubmit={handleSubmit}
            className={loading ? styles.disabled : undefined}
          >
            <div className={styles.form}>
              <FormField label="E-mail">
                <Input
                  type="email"
                  value={email}
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </FormField>

              <div className={styles.actions}>
                <Button type="submit" loading={loading}>
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span>Odesílám…</span>
                    </>
                  ) : (
                    "Poslat reset odkaz"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEmail("")}
                  disabled={loading}
                >
                  Vymazat
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
