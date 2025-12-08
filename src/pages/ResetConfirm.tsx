import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../data/supabaseClient";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";

export default function ResetConfirm() {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("supabase getSession error:", error);
        }

        // Pokud Supabase aktivoval password recovery session → přesměruj na change-password
        if (mounted && data?.session) {
          toast.push("Reset odkaz rozpoznán — přesměrovávám na změnu hesla...", { type: "info", ttl: 2000 });
          navigate("/change-password");
          return;
        }
      } catch (err) {
        console.error("ResetConfirm error:", err);
      } finally {
        if (mounted) setChecking(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [navigate, toast]);

  return (
    <Container className="py-12">
      <div className="max-w-md mx-auto">
        <Card padded>
          <div className="text-center">
            <h1 className="text-xl font-semibold mb-3">Potvrzení resetu hesla</h1>

            {checking ? (
              <div className="flex flex-col items-center gap-3">
                <Spinner size="md" />
                <p className="text-gray-600">Kontroluji resetovací odkaz…</p>
              </div>
            ) : (
              <>
                <p className="text-gray-700 mb-4">
                  Pokud jsi klikl(a) na odkaz z e-mailu, měl(a) bys být automaticky přesměrován(a) na stránku pro nastavení nového hesla.
                </p>

                <p className="text-gray-600 text-sm mb-4">
                  Pokud se nic nestane: zkontroluj spam, použij původní odkaz z e-mailu nebo znovu požádej o reset.
                </p>

                <div className="flex justify-center gap-3">
                  <Button variant="primary" onClick={() => navigate("/resetPassword")}>
                    Poslat reset znovu
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/login")}>
                    Zpět na přihlášení
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </Container>
  );
}
