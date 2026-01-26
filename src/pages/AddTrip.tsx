// src/pages/AddTrip.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripsContext";
import { uploadTripImage } from "../services/tripsService";
import Container from "../components/Container";
import Card from "../components/tripCard/Card";
import { FormField } from "../components/FormField";
import Input from "../components/Input";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";
import styles from "./AddTrip.module.css";

export default function AddTrip() {
  const { addTrip } = useTrips();
  const navigate = useNavigate();
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim() || !date.trim()) {
      setError("Vyplň prosím název, popis a datum.");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = "";
      if (imageFile) {
        const uploadedUrl = await uploadTripImage(imageFile);
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      const newTrip = await addTrip({
        title: title.trim(),
        description: description.trim(),
        date,
        imageUrl,
      });

      if (!newTrip) throw new Error("Nepodařilo se vytvořit výlet.");

      toast.push("Výlet úspěšně přidán", { type: "success" });
      navigate(`/trips/${newTrip.id}`);
    } catch (err: any) {
      const msg = err?.message ?? "Chyba při přidávání výletu.";
      setError(msg);
      toast.push(msg, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Přidat nový výlet</h1>

        <Card>
          <form
            onSubmit={handleSubmit}
            className={loading ? styles.disabled : undefined}
          >
            <div className={styles.form}>
              <FormField label="Název" required>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Např. Víkend v horách"
                  required
                />
              </FormField>

              <FormField label="Popis" hint="Krátký popis výletu" required>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                  className={styles.textarea}
                  placeholder="Pár vět o výletu…"
                />
              </FormField>

              <FormField label="Datum" required>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </FormField>

              <FormField label="Obrázek (volitelně)">
                <Input type="file" accept="image/*" onChange={handleFileChange} />
              </FormField>

              {previewUrl && (
                <div className={styles.preview}>
                  <div className={styles.previewLabel}>Náhled obrázku</div>

                  <div className={styles.previewImage}>
                    <img src={previewUrl} alt="Náhled obrázku" />
                  </div>

                  <Button variant="secondary" onClick={handleRemoveImage}>
                    Odebrat obrázek
                  </Button>
                </div>
              )}

              <div className={styles.actions}>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner size="sm" /> Ukládám…
                    </>
                  ) : (
                    "Uložit výlet"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate(-1)}
                >
                  Zpět
                </Button>

                {error && <div className={styles.error}>{error}</div>}
              </div>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
