import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../data/supabaseClient";

export default function ResetConfirm() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        navigate("/change-password");
      }
    })();
  }, [navigate]);

  return <p>Potvrzuji reset... pokud se nic nestane, zkontroluj e-mail nebo použij odkaz z mailu.</p>;
}
