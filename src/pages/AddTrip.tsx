import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Trip } from "../data/trips";
import { supabase } from "../data/supabaseClient";

type AddTripProps = {
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
}

export default function AddTrip({setTrips}: AddTripProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("trips")
      .insert([{ title, description, date, imageUrl }])
      .select();

    if (error) {
      console.error(error.message);
      return;
    }

    const tripsData = (data ?? []) as Trip[];
    if (!tripsData[0]) {
      console.error("Trip nebyl vložen!");
      return;
    }
    navigate(`/trips/${tripsData[0].id}`);
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
