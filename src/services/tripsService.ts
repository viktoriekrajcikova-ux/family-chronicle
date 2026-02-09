// src/data/tripService.ts
import { supabase } from "../data/supabaseClient";
import type { Trip } from "../data/trips";

/* =====================
   STORAGE – IMAGES
===================== */

export async function uploadTripImage(file: File): Promise<string> {
  const safeName = file.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");

  const fileName = `${Date.now()}_${safeName}`;

  const { error } = await supabase.storage
    .from("trip-photos")
    .upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from("trip-photos")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function deleteTripImage(imageUrl?: string | null): Promise<void> {
  if (!imageUrl) return;

  const path = imageUrl.split("/trip-photos/")[1];
  if (!path) return;

  const { error } = await supabase.storage
    .from("trip-photos")
    .remove([path]);

  if (error) {
    console.error("Delete image error:", error.message);
  }
}

/* =====================
   TRIPS – DATABASE
===================== */

export async function fetchTrips(): Promise<Trip[]> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Trip[];
}

export async function fetchTripById(id: number): Promise<Trip> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Trip;
}

export async function addTrip(
  tripData: Omit<Trip, "id" | "created_at">
): Promise<Trip> {
  const { data, error } = await supabase
    .from("trips")
    .insert([tripData])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Trip;
}

export async function updateTrip(
  id: number,
  tripData: Partial<Omit<Trip, "id" | "created_at">>
): Promise<Trip> {
  const { data, error } = await supabase
    .from("trips")
    .update(tripData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Trip;
}

export async function deleteTrip(
  id: number,
  imageUrl?: string | null
): Promise<void> {
  if (imageUrl) {
    await deleteTripImage(imageUrl);
  }

  const { error } = await supabase
    .from("trips")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
