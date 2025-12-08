import { useState } from "react";
import Container from "../components/Container";
import Card from "../components/Card";
import { FormField } from "../components/FormField";
import Input from "../components/Input";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";
import { useAuth } from "../context/AuthContext";

export default function RequestReset() {
  const { resetPassword } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      const msg = "Poslali jsme ti e-mail s odkazem pro reset hesla. Zkontroluj schránku.";
      setStatus(msg);
      toast.push(msg, { type: "success" });
    } catch (err: any) {
      console.error("Reset error:", err);
      const msg = err?.message ?? "Nepodařilo se odeslat resetovací e-mail.";
      setError(msg);
      toast.push(msg, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Reset hesla</h1>

        {status && (
          <div className="mb-4 p-3 rounded bg-green-50 border border-green-100 text-green-700">
            {status}
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
            className={`${loading ? "opacity-60 pointer-events-none" : ""} space-y-4`}
          >
            <FormField label="E-mail" required>
              <Input
                type="email"
                value={email}
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </FormField>

            <div className="flex items-center gap-3">
              <Button type="submit" variant="primary" loading={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span> Odesílám…</span>
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
          </form>
        </Card>
      </div>
    </Container>
  );
}
