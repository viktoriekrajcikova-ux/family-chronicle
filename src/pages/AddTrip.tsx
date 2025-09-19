import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Trip } from "../data/trips";

type AddTripProps = {
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
}

export default function AddTrip({setTrips}: AddTripProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTrip: Trip = {
      id: Date.now(),
      title,
      description,
      date,
      imageUrl: image || "https://via.placeholder.com/200",
    };

    setTrips(prev => [...prev, newTrip]);
    navigate("/");

    setTitle("");
    setDescription("");
    setDate("");
    setImage("");
  }

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
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Uložit výlet</button>
      </form>
    </div>
  );
}
