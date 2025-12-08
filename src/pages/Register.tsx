import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/Container";
import Card from "../components/Card";
import { FormField } from "../components/FormField";
import Input from "../components/Input";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";

export default function Register() {
  const { signUp, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

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
      await signUp(email.trim(), password);
      const successText = "Registrace proběhla. Zkontroluj e-mail pro potvrzení (pokud je potřeba).";
      setInfo(successText);
      toast.push(successText, { type: "success" });
      setTimeout(() => navigate("/login"), 1400);
    } catch (err: any) {
      console.error("register error", err);
      const msg = err?.message ?? "Registrace se nepodařila.";
      setError(msg);
      toast.push(msg, { type: "error" });
    }
  };

  return (
    <Container className="py-12">
      <div className="max-w-md mx-auto">
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

        <Card>
          <form
            onSubmit={handleSubmit}
            className={`${isLoading ? "opacity-60 pointer-events-none" : ""} space-y-4`}
          >
            <FormField label="E-mail" required>
              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </FormField>

            <FormField label="Heslo" hint={`Minimálně ${MIN_PWD} znaků`} required>
              <Input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={`Minimálně ${MIN_PWD} znaků`}
                required
              />
            </FormField>

            <FormField label="Heslo znovu" required>
              <Input
                type="password"
                autoComplete="new-password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Zadej heslo znovu"
                required
              />
            </FormField>

            <div className="flex items-center gap-3">
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner size="sm" />
                    <span> Zakládám účet…</span>
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
                Už mám účet (přihlásit se)
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
