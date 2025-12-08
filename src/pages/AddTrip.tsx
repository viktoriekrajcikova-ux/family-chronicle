import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripsContext";
import { uploadTripImage } from "../services/tripsService";
import Container from "../components/Container";
import Card from "../components/Card";
import { FormField } from "../components/FormField";
import Input from "../components/Input";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";

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

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(String(reader.result ?? null));
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim() || !date.trim()) {
      setError("Vyplň prosím názov, popis a datum.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        const uploadedUrl = await uploadTripImage(imageFile);
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      const newTrip = await addTrip({ title, description, date, imageUrl });
      if (!newTrip) throw new Error("Nepodařilo se vytvořit výlet.");

      toast.push("Výlet úspěšně přidán", { type: "success" });
      navigate(`/trips/${newTrip.id}`);
    } catch (err: any) {
      console.error("AddTrip error:", err);
      setError(err?.message ?? "Chyba při přidávání výletu.");
      toast.push(err?.message ?? "Chyba při přidávání výletu.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Přidat nový výlet</h1>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="Název" required>
              <Input
                type="text"
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
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-300 focus:ring-2"
                placeholder="Pár vět o výletu..."
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
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </FormField>

            {previewUrl && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Náhled obrázku</div>

                <div className="w-full max-w-md rounded-lg overflow-hidden border border-gray-100">
                  <img
                    src={previewUrl}
                    alt="Náhled obrázku"
                    className="w-full h-48 object-cover object-center"
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" onClick={handleRemoveImage}>
                    Odebrat obrázek
                  </Button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Button variant="primary" type="submit" loading={loading}>
                {loading ? <><Spinner size="sm" /> Ukládám...</> : "Uložit výlet"}
              </Button>

              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Zpět
              </Button>

              {error && <p className="text-sm text-red-600 ml-auto">{error}</p>}
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
