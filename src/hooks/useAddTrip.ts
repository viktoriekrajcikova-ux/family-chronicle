import { useState } from "react";
import type { Trip } from "../data/trips";
import { supabase } from "../data/supabaseClient";

export function useAddTrip() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTrip = async (newTrip: Omit<Trip, "id">): Promise<Trip | null> => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("trips")
      .insert([newTrip])
      .select()
      .single();

    setLoading(false);

    if (error) {
      setError(error.message);
      return null;
    }

    return data as Trip;
  };

  return { addTrip, loading, error };
}
