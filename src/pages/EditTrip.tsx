import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTrips } from "../context/TripsContext";
import { uploadTripImage, deleteTripImage } from "../services/tripsService";
import { Button, Input } from "../components";
import Spinner from "../components/Spinner"; 

export default function EditTrip() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, updateTrip } = useTrips();

  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const numericId = Number(id);
  const trip = trips.find((t) => t.id === numericId);

  const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;
  const ALLOWED_MIME_PREFIX = "image/";

  useEffect(() => {
    if (trip) {
      setTitle(trip.title);
      setDescription(trip.description);
      setDate(trip.date);
      setImageUrl(trip.imageUrl ?? null);
    }
  }, [trip]);

  useEffect(() => {
    if (!newImageFile) {
      setNewImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(newImageFile);
    setNewImagePreview(url);
    return () => {
      URL.revokeObjectURL(url);
      setNewImagePreview(null);
    };
  }, [newImageFile]);

  if (!trip) return <p>Načítám výlet...</p>;

  const validateFile = (file: File | null): boolean => {
    if (!file) {
      setFileError(null);
      return true;
    }
    if (!file.type || !file.type.startsWith(ALLOWED_MIME_PREFIX)) {
      setFileError("Neplatný soubor — povoleny jsou pouze obrázky.");
      return false;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`Soubor je příliš velký (max ${Math.round(MAX_FILE_SIZE_BYTES / 1024 / 1024)} MB).`);
      return false;
    }
    setFileError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!validateFile(file)) {
      setNewImageFile(null);
      return;
    }
    setNewImageFile(file);
  };

  const handleRemoveImage = async (): Promise<void> => {
    if (!imageUrl) return;
    if (!confirm("Opravdu chceš odstranit tento obrázek?")) return;

    try {
      setLoading(true);
      await deleteTripImage(imageUrl);
      await updateTrip(trip.id, { imageUrl: "" });
      setImageUrl(null);
    } catch (err: any) {
      setError("Nepodařilo se odstranit obrázek: " + (err.message ?? err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (!validateFile(newImageFile)) {
      setError("Soubor není platný — oprav ho a zkus to znovu.");
      return;
    }

    try {
      setLoading(true);
      let finalImageUrl = imageUrl;

      if (newImageFile) {
        if (imageUrl) await deleteTripImage(imageUrl);
        const uploadedUrl = await uploadTripImage(newImageFile);
        if (!uploadedUrl) throw new Error("Upload obrázku selhal.");
        finalImageUrl = uploadedUrl;
      }

      await updateTrip(trip.id, {
        title,
        description,
        date,
        imageUrl: finalImageUrl || "",
      });

      navigate(`/trips/${trip.id}`);
    } catch (err: any) {
      setError("Chyba při ukládání změn: " + (err.message ?? err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Upravit výlet</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={`${loading ? "opacity-60 pointer-events-none" : ""} space-y-4`}>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Název</label>
          <Input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={loading || !!fileError}>
            {loading ? <Spinner size={18} /> : null}
            <span>{loading ? "Ukládám..." : "Uložit změny"}</span>
          </Button>
          <Button type="button" onClick={() => navigate(-1)} disabled={loading}>Zpět</Button>
        </div>
      </form>
    </div>
  );
}
