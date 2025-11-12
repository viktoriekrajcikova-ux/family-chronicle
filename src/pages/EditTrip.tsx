import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTrips } from "../context/TripsContext";
import { uploadTripImage, deleteTripImage } from "../data/tripService";

export default function EditTrip() {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();
    const { trips, updateTrip } = useTrips();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const numericId = Number(id);
    const trip = trips.find((t) => t.id === numericId);

       useEffect(() => {
    if (trip) {
      setTitle(trip.title);
      setDescription(trip.description);
      setDate(trip.date);
      setImageUrl(trip.imageUrl ?? null);
    }
  }, [trip]);

  if (!trip) return <p>Načítám výlet...</p>;

  const handleRemoveImage = async () => {
    if (!imageUrl) return;
    if (!confirm("Opravdu chceš odstranit tento obrázek?")) return;

    await deleteTripImage(imageUrl);
    setImageUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let finalImageUrl = imageUrl;

      
      if (newImageFile) {
        
        if (imageUrl) await deleteTripImage(imageUrl);

        const uploadedUrl = await uploadTripImage(newImageFile);
        if (uploadedUrl) finalImageUrl = uploadedUrl;
      }

      await updateTrip(trip.id, {
        title,
        description,
        date,
        imageUrl: finalImageUrl || "",
      });

      navigate(`/trips/${trip.id}`);
    } catch (err: any) {
      setError("Chyba při ukládání změn: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upravit výlet</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Název:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Popis:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Datum:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        {imageUrl ? (
          <div>
            <p>Aktuální obrázek:</p>
            <img
              src={imageUrl}
              alt="Aktuální"
              style={{ width: "300px", borderRadius: "8px", marginBottom: "10px" }}
            />
            <br />
            <button type="button" onClick={handleRemoveImage}>
              Odebrat obrázek
            </button>
          </div>
        ) : (
          <p>Žádný obrázek není nahrán.</p>
        )}

        <label>
          Nahrát nový obrázek:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Ukládám..." : "Uložit změny"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}