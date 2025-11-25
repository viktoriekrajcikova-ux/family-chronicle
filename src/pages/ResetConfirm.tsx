// src/pages/ResetConfirm.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../data/supabaseClient";

export default function ResetConfirm() {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) console.error(error);

        // Pokud Supabase aktivoval password recovery session → přesměruj
        if (data?.session) {
          navigate("/change-password");
          return;
        }

      } catch (err) {
        console.error("ResetConfirm error:", err);
      } finally {
        setChecking(false);
      }
    })();
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-xl font-semibold mb-4">Potvrzení resetu hesla</h1>

      {checking ? (
        <p className="text-gray-600">Kontroluji resetovací odkaz…</p>
      ) : (
        <p className="text-gray-600">
          Pokud se nic nestalo, zkontroluj e-mail nebo použij přesný odkaz ze zprávy.
        </p>
      )}
    </div>
  );
}
