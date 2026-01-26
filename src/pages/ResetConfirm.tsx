// src/pages/ResetConfirm.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../data/supabaseClient";
import Container from "../components/Container";
import Card from "../components/tripCard/Card";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";
import styles from "./ResetConfirm.module.css";

export default function ResetConfirm() {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.error("supabase getSession error:", error);

        if (mounted && data?.session) {
          toast.push(
            "Reset odkaz rozpoznán — přesměrovávám na změnu hesla…",
            { type: "info", ttl: 2000 }
          );
          navigate("/change-password");
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
    <Container>
      <div className={styles.wrapper}>
        <Card>
          <div className={styles.content}>
            <h1 className={styles.title}>Potvrzení resetu hesla</h1>

            {checking ? (
              <div className={styles.loading}>
                <Spinner size="md" />
                <p>Kontroluji resetovací odkaz…</p>
              </div>
            ) : (
              <>
                <p className={styles.text}>
                  Pokud jsi klikl(a) na odkaz z e-mailu, měl(a) bys být
                  automaticky přesměrován(a) na stránku pro nastavení nového hesla.
                </p>

                <p className={styles.subtext}>
                  Pokud se nic nestane: zkontroluj spam, použij původní odkaz
                  z e-mailu nebo znovu požádej o reset.
                </p>

                <div className={styles.actions}>
                  <Button onClick={() => navigate("/resetPassword")}>
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
