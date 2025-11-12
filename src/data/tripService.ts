import { supabase } from "./supabaseClient";

export async function uploadTripImage(file: File): Promise<string | null> {
  const safeName = file.name
    .normalize("NFD") // rozloží znaky s diakritikou
    .replace(/[\u0300-\u036f]/g, "") // odstraní diakritiku
    .replace(/\s+/g, "-") // mezery → pomlčky
    .replace(/[^a-zA-Z0-9._-]/g, ""); // odstraní jiné zvláštní znaky
    
  const fileName = `${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from("trip-photos")
    .upload(fileName, file);

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("trip-photos")
    .getPublicUrl(fileName);

  return data?.publicUrl ?? null;
}

export async function deleteTripImage(imageUrl: string): Promise<void> {
  if (!imageUrl) return;

  try {
    const path = imageUrl.split("/trip-photos/")[1];
    if (!path) return;

    const { error } = await supabase.storage
      .from("trip-photos")
      .remove([path]);

    if (error) console.error("Delete error:", error.message);
  } catch (err) {
    console.error("Failed to delete image:", err);
  }
}
