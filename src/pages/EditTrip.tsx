import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Trip } from "../data/trips";

type EditTripProps = {
    trips: Trip[];
    setTrips: React.Dispatch<React.SetStateAction<Trip[]>>
}

export default function EditTrip({trips, setTrips}: EditTripProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    const trip = trips.find(t => t.id === Number(id));
    
    useEffect(() => {
        if (!trip) {
        navigate("/"); 
        }
    }, [trip, navigate]);

    // pokud je undefined → nastaví prázdný string
    const [title, setTitle] = useState(trip?.title ?? "");
    const [description, setDescription] = useState(trip?.description ?? "");
    const [date, setDate] = useState(trip?.date ?? "");
    const [image, setImage] = useState(trip?.imageUrl ?? "");

    const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    if (!trip) return;

    const updatedTrip: Trip = {
      ...trip,
      title,
      description,
      date,
      imageUrl: image,
    };

    setTrips(prev =>
      prev.map(t => (t.id === trip.id ? updatedTrip : t))
    );

    navigate(`/trips/${trip.id}`);
}


    return (
        <>
        <h1>Editace</h1>
        
        <form onSubmit={handleSubmit}>
            <h2>Upravit výlet</h2>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Název"
                required
            />
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Popis"
                required
            />
            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
            />
            <input
                type="text"
                value={image}
                onChange={e => setImage(e.target.value)}
                placeholder="URL obrázku"
            />
            <button type="submit">Uložit změny</button>
        </form>
        </>
    )
}