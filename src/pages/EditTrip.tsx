// src/pages/EditTrip.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTrips } from "../context/TripsContext";
import { uploadTripImage, deleteTripImage } from "../services/tripsService";
import Container from "../components/Container";
import Card from "../components/tripCard/Card";
import { FormField } from "../components/FormField";
import Input from "../components/Input";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";
import type { Trip } from "../data/trips";
import styles from "./EditTrip.module.css";

export default function EditTrip() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, updateTrip } = useTrips();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const numericId = Number(id);
  const trip = trips.find((t) => Number(t.id) === numericId) as Trip | undefined;

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  useEffect(() => {
    if (!trip) return;
    setTitle(trip.title);
    setDescription(trip.description);
    setDate(trip.date);
    setImageUrl(trip.imageUrl ?? null);
  }, [trip]);

  useEffect(() => {
    if (!newImageFile) {
      setNewImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(newImageFile);
    setNewImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [newImageFile]);

  if (!trip) {
    return (
      <Container>
        <div className={styles.loading}>Načítám výlet…</div>
      </Container>
    );
  }

  const validateFile = (file: File | null) => {
    if (!file) return true;
    if (!file.type.startsWith("image/")) {
      setFileError("Povoleny jsou pouze obrázky.");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError("Soubor je příliš velký (max 2 MB).");
      return false;
    }
    setFileError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !description || !date) {
      setError("Vyplň název, popis i datum.");
      return;
    }

    if (!validateFile(newImageFile)) return;

    try {
      setLoading(true);

      let finalImageUrl = imageUrl ?? "";

      if (newImageFile) {
        if (imageUrl) await deleteTripImage(imageUrl);
        const uploaded = await uploadTripImage(newImageFile);
        if (!uploaded) throw new Error("Upload obrázku selhal.");
        finalImageUrl = uploaded;
      }

      await updateTrip(trip.id, {
        title,
        description,
        date,
        imageUrl: finalImageUrl,
      });

      toast.push("Výlet byl upraven.", { type: "success" });
      navigate(`/trips/${trip.id}`);
    } catch (err: any) {
      const msg = err?.message ?? "Chyba při ukládání změn.";
      setError(msg);
      toast.push(msg, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Upravit výlet</h1>

        {error && <div className={styles.error}>{error}</div>}

        <Card>
          <form onSubmit={handleSubmit} className={loading ? styles.disabled : undefined}>
            <div className={styles.form}>
              <FormField label="Název">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormField>

              <FormField label="Popis">
                <textarea
                  className={styles.textarea}
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormField>

              <FormField label="Datum">
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </FormField>

              <FormField label="Nový obrázek">
                <Input type="file" onChange={(e) => validateFile(e.target.files?.[0] ?? null) && setNewImageFile(e.target.files?.[0] ?? null)} />
                {fileError && <div className={styles.fileError}>{fileError}</div>}
              </FormField>

              {(newImagePreview || imageUrl) && (
                <div className={styles.preview}>
                  <img src={newImagePreview ?? imageUrl ?? ""} alt="Náhled" />
                </div>
              )}

              <div className={styles.actions}>
                <Button type="submit" disabled={loading}>
                  {loading ? <Spinner size="sm" /> : "Uložit změny"}
                </Button>

                <Button variant="ghost" type="button" onClick={() => navigate(-1)}>
                  Zpět
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
