import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTrips } from "../context/TripsContext";
import { uploadTripImage, deleteTripImage } from "../services/tripsService";
import Container from "../components/Container";
import Card from "../components/Card";
import { FormField } from "../components/FormField";
import Input from "../components/Input";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";
import type { Trip } from "../data/trips";

export default function EditTrip() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, updateTrip } = useTrips();
  const toast = useToast();

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
  const trip = trips.find((t) => Number(t.id) === numericId) as Trip | undefined;

  const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;
  const ALLOWED_MIME_PREFIX = "image/";

  useEffect(() => {
    if (trip) {
      setTitle(trip.title ?? "");
      setDescription(trip.description ?? "");
      setDate(trip.date ?? "");
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

  if (!trip) {
    return (
      <Container className="py-10">
        <div className="max-w-2xl mx-auto text-center text-gray-600">Načítám výlet…</div>
      </Container>
    );
  }

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

  const handleRemoveImage = async () => {
    if (!imageUrl) return;
    if (!confirm("Opravdu chceš odstranit tento obrázek?")) return;

    try {
      setLoading(true);
      await deleteTripImage(imageUrl);
      await updateTrip(trip.id, { imageUrl: "" });
      setImageUrl(null);
      toast.push("Obrázek odstraněn", { type: "success" });
    } catch (err: any) {
      console.error("remove image error", err);
      setError("Nepodařilo se odstranit obrázek: " + (err?.message ?? err));
      toast.push("Nepodařilo se odstranit obrázek.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim() || !date.trim()) {
      setError("Vyplň prosím název, popis a datum.");
      return;
    }

    if (!validateFile(newImageFile)) {
      setError("Soubor není platný — oprav ho a zkus to znovu.");
      return;
    }

    try {
      setLoading(true);
      let finalImageUrl = imageUrl ?? "";

      if (newImageFile) {
        if (imageUrl) {
          try {
            await deleteTripImage(imageUrl);
          } catch (err) {
            console.warn("Failed to delete old image:", err);
          }
        }

        const uploadedUrl = await uploadTripImage(newImageFile);
        if (!uploadedUrl) throw new Error("Upload obrázku selhal.");
        finalImageUrl = uploadedUrl;
      }

      await updateTrip(trip.id, {
        title: title.trim(),
        description: description.trim(),
        date: date.trim(),
        imageUrl: finalImageUrl || "",
      });

      toast.push("Výlet úspěšně upraven", { type: "success" });
      navigate(`/trips/${trip.id}`);
    } catch (err: any) {
      console.error("EditTrip error:", err);
      const msg = err?.message ?? "Chyba při ukládání změn.";
      setError(msg);
      toast.push(msg, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Upravit výlet</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
            {error}
          </div>
        )}

        <Card>
          <form onSubmit={handleSubmit} className={`${loading ? "opacity-60 pointer-events-none" : ""} space-y-6`}>
            <FormField label="Název" required>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </FormField>

            <FormField label="Popis" required>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-300 focus:ring-2"
              />
            </FormField>

            <FormField label="Datum" required>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </FormField>

            <FormField label="Nahrát nový obrázek">
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {fileError && <div className="mt-1 text-xs text-red-600">{fileError}</div>}
            </FormField>

            {/* Preview area - show new preview if present, otherwise existing image */}
            {(newImagePreview || imageUrl) && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Náhled obrázku</div>
                <div className="w-full max-w-md rounded-lg overflow-hidden border border-gray-100 mb-3">
                  <img
                    src={newImagePreview ?? imageUrl ?? undefined}
                    alt={trip.title || "Náhled obrázku"}
                    className="w-full h-64 object-cover object-center"
                  />
                </div>

                <div className="flex gap-3 items-center">
                  <Button variant="secondary" type="button" onClick={() => { setNewImageFile(null); setNewImagePreview(null); }}>
                    Zrušit nový obrázek
                  </Button>

                  {imageUrl && !newImagePreview && (
                    <Button variant="danger" type="button" onClick={handleRemoveImage} disabled={loading}>
                      {loading ? <Spinner size="sm" /> : "Odebrat obrázek"}
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Button variant="primary" type="submit" loading={loading} className="inline-flex items-center">
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span> Ukládám...</span>
                  </>
                ) : (
                  "Uložit změny"
                )}
              </Button>

              <Button variant="ghost" type="button" onClick={() => navigate(-1)} disabled={loading}>
                Zpět
              </Button>

              {/* show file error on the right if present */}
              {fileError && <div className="ml-auto text-sm text-red-600">{fileError}</div>}
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
