import { useState } from "react";
import type { Trip } from "../data/trips";

export default function AddTrip() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTrip: Trip = {
      id: Date.now(),
      title,
      description,
      date,
      image: image || "https://via.placeholder.com/200",
    };

    console.log("novy vylet pridan", newTrip);

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
