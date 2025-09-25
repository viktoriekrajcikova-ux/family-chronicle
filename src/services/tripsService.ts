import { supabase } from "../data/supabaseClient";
import type { Trip } from "../data/trips";

export const fetchTrips = async (): Promise<Trip[]> => {
  const { data, error } = await supabase.from("trips").select("*");
  if (error) {
    console.error("Supabase fetch error:", error.message);
    return [];
  }
  return data ?? [];
};

export const addTrip = async (tripData: Omit<Trip, "id">): Promise<Trip | null> => {
  const { data, error } = await supabase
    .from("trips")
    .insert([tripData])
    .select();

  if (error) {
    console.error("Supabase insert error:", error.message);
    return null;
  }

  return data?.[0] ?? null;
};

export const updateTrip = async (id: number, tripData: Partial<Trip>): Promise<Trip | null> => {
  const { data, error } = await supabase
    .from("trips")
    .update(tripData)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Supabase update error:", error.message);
    return null;
  }

  return data?.[0] ?? null;
};

export const deleteTrip = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("trips").delete().eq("id", id);
  if (error) {
    console.error("Supabase delete error:", error.message);
    return false;
  }
  return true;
};
