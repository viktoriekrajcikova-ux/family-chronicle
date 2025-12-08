import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/Container";
import Card from "../components/Card";
import { FormField } from "../components/FormField";
import Input from "../components/Input";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";

export default function Login() {
  const { signIn, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
      console.error("login error", err);
      const msg = err?.message ?? "Přihlášení se nepodařilo.";
      setError(msg);
      toast.push(msg, { type: "error" });
    }
  };

  return (
    <Container className="py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Přihlášení</h1>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700">
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
                placeholder="tvuj@email.cz"
                required
              />
            </FormField>

            <FormField label="Heslo" required>
              <Input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </FormField>

            <div className="flex items-center justify-between">
              <Link to="/resetPassword" className="text-sm text-indigo-600 hover:underline">
                Zapomněl(a) jsi heslo?
              </Link>
              <Link to="/register" className="text-sm text-gray-600 hover:underline">
                Zaregistrovat se
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" variant="primary" loading={isLoading}>
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
          </form>
        </Card>
      </div>
    </Container>
  );
}
