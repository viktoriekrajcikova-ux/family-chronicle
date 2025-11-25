// src/data/tripService.ts
import { supabase } from "../data/supabaseClient";
import type { Trip } from "./trips";

export async function uploadTripImage(file: File): Promise<string | null> {
  if (!file) return null;

  const safeName = file.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");

  const fileName = `${Date.now()}_${safeName}`;

  const { error } = await supabase.storage.from("trip-photos").upload(fileName, file);

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("trip-photos").getPublicUrl(fileName);
  return data?.publicUrl ?? null;
}

export async function deleteTripImage(imageUrl: string | null | undefined): Promise<void> {
  if (!imageUrl) return;

  try {
    const path = imageUrl.split("/trip-photos/")[1];
    if (!path) return;

    const { error } = await supabase.storage.from("trip-photos").remove([path]);
    if (error) console.error("Delete error:", error.message);
  } catch (err) {
    console.error("Failed to delete image:", err);
  }
}

export async function deleteTrip(id: number, imageUrl?: string | null): Promise<void> {
  try {
    if (imageUrl) {
      await deleteTripImage(imageUrl);
    }

    const { error } = await supabase.from("trips").delete().eq("id", id);
    if (error) throw error;
  } catch (err: any) {
    console.error("Chyba při mazání výletu:", err.message ?? err);
    throw err;
  }
}

export async function fetchTrips(): Promise<Trip[]> {
  const { data, error } = await supabase.from("trips").select("*").order("date", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Trip[];
}

export const addTrip = async (tripData: Omit<Trip, "id" | "created_at">): Promise<Trip | null> => {
  const { data, error } = await supabase.from("trips").insert([tripData]).select();
  if (error) {
    console.error("Supabase insert error:", error.message);
    return null;
  }
  return (data?.[0] ?? null) as Trip | null;
};

export const updateTrip = async (id: number, tripData: Partial<Omit<Trip, "id" | "created_at">>): Promise<Trip | null> => {
  const { data, error } = await supabase.from("trips").update(tripData).eq("id", id).select();
  if (error) {
    console.error("Supabase update error:", error.message);
    return null;
  }
  return (data?.[0] ?? null) as Trip | null;
};

export async function fetchTripByIdService(id: number): Promise<Trip | null> {
  const { data, error } = await supabase.from("trips").select("*").eq("id", id).single();
  if (error) return null;
  return data as Trip;
}
