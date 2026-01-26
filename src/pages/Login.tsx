// src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/Container";
import Card from "../components/tripCard/Card";
import { FormField } from "../components/FormField";
import Input from "../components/Input";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";
import styles from "./Login.module.css";

export default function Login() {
  const { signIn, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isLoading = authLoading ?? false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Vyplň e-mail i heslo.");
      return;
    }

    try {
      await signIn(email.trim(), password);
      toast.push("Přihlášení proběhlo úspěšně.", { type: "success" });
      navigate("/trips");
    } catch (err: any) {
      const msg = err?.message ?? "Přihlášení se nepodařilo.";
      setError(msg);
      toast.push(msg, { type: "error" });
    }
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Přihlášení</h1>

        {error && <div className={styles.error}>{error}</div>}

        <Card>
          <form
            onSubmit={handleSubmit}
            className={isLoading ? styles.disabled : undefined}
          >
            <div className={styles.form}>
              <FormField label="E-mail">
                <Input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tvuj@email.cz"
                  required
                />
              </FormField>

              <FormField label="Heslo">
                <Input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </FormField>

              <div className={styles.links}>
                <Link to="/resetPassword">Zapomněl(a) jsi heslo?</Link>
                <Link to="/register">Zaregistrovat se</Link>
              </div>

              <div className={styles.actions}>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner size="sm" />
                      <span>Přihlašuji…</span>
                    </>
                  ) : (
                    "Přihlásit se"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  disabled={isLoading}
                >
                  Zpět
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
