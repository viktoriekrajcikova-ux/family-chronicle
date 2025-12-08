import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/Container";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";

export default function ChangePassword() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const MIN_LENGTH = 6;

  const validate = (): boolean => {
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
      console.error("change password error", err);
      const message = err?.message ?? "Chyba při změně hesla.";
      setError(message);
      toast.push(message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const passwordStrengthText = () => {
    if (password.length === 0) return "Zadej nové heslo";
    if (password.length < MIN_LENGTH) return "Heslo je příliš krátké";
    if (password.length < 10) return "Střední síla hesla";
    return "Silné heslo";
  };

  return (
    <Container className="py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Změna hesla</h1>

        {msg && (
          <div className="mb-4 p-3 rounded bg-green-50 border border-green-100 text-green-700">
            {msg}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-100 text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className={`${loading ? "opacity-60 pointer-events-none" : ""} space-y-4`}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Nové heslo</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Zadej nové heslo"
              required
              minLength={MIN_LENGTH}
              aria-describedby="pwd-help"
              autoComplete="new-password"
            />
            <p id="pwd-help" className="mt-1 text-xs text-gray-500">
              {passwordStrengthText()}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nové heslo znovu</label>
            <Input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Zadej heslo znovu"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" type="submit" loading={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span>Ukládám...</span>
                </>
              ) : (
                "Změnit heslo"
              )}
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
        </form>
      </div>
    </Container>
  );
}
