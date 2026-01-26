// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/Container";
import Card from "../components/tripCard/Card";
import { FormField } from "../components/FormField";
import Input from "../components/Input";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";
import styles from "./Register.module.css";

export default function Register() {
  const { signUp, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
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
      await signUp(email.trim(), password);
      const msg =
        "Registrace proběhla. Zkontroluj e-mail pro potvrzení (pokud je potřeba).";
      setInfo(msg);
      toast.push(msg, { type: "success" });
      setTimeout(() => navigate("/login"), 1400);
    } catch (err: any) {
      const msg = err?.message ?? "Registrace se nepodařila.";
      setError(msg);
      toast.push(msg, { type: "error" });
    }
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Registrace</h1>

        {info && <div className={styles.success}>{info}</div>}
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
                  placeholder="you@example.com"
                  required
                />
              </FormField>

              <FormField
                label="Heslo"
                hint={`Minimálně ${MIN_PWD} znaků`}
              >
                <Input
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={`Minimálně ${MIN_PWD} znaků`}
                  required
                />
              </FormField>

              <FormField label="Heslo znovu">
                <Input
                  type="password"
                  autoComplete="new-password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="Zadej heslo znovu"
                  required
                />
              </FormField>

              <div className={styles.actions}>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner size="sm" />
                      <span>Zakládám účet…</span>
                    </>
                  ) : (
                    "Zaregistrovat se"
                  )}
                </Button>

                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => navigate("/login")}
                  disabled={isLoading}
                >
                  Už mám účet
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
