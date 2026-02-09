// src/pages/AddTrip.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripsContext";
import useToast  from "../components/toast/useToast";

export default function AddTrip() {
  const { addTrip } = useTrips();
  const navigate = useNavigate();
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTrip = await addTrip({
      title,
      description,
      date,
      image,
    });

    if (!newTrip) {
      toast.error("Nepodařilo se uložit výlet");
      return;
    }

    toast.success("Výlet uložen");
    navigate(`/trips/${newTrip.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Přidat nový výlet</h1>

      <label htmlFor="title">Název</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="description">Popis</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label htmlFor="date">Datum</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <label htmlFor="image">Obrázek</label>
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
      />

      <button type="submit">Uložit výlet</button>
    </form>
  );
}
