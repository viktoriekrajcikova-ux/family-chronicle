import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripsContext";

export default function AddTrip() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const { addTrip } = useTrips();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTrip = await addTrip({ title, description, date, imageUrl });

    if (newTrip) {
      navigate(`/trips/${newTrip.id}`);
    } else {
      console.error("Trip se nepodařilo přidat");
    }
  };


  return (
    <div>
      <h1>Přidat nový výlet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Název: </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Popis: </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Datum: </label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Obrázek: </label>
          <input
            type="text"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Uložit výlet</button>
      </form>
    </div>
  );
}
