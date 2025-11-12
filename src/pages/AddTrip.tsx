import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripsContext";
import { uploadTripImage } from "../data/tripService";

export default function AddTrip() {
  const { addTrip } = useTrips();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = "";
      if (imageFile) {
        const uploadedUrl = await uploadTripImage(imageFile);
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      const newTrip = await addTrip({ title, description, date, imageUrl });
      navigate(`/trips/${newTrip.id}`);
    } catch (err: any) {
      setError("Chyba při přidávání výletu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Přidat nový výlet</h1>

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

        <label>
          Obrázek:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Ukládám..." : "Uložit výlet"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
