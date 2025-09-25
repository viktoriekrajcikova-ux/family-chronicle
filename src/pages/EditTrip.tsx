import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTrips } from "../context/TripsContext";

export default function EditTrip() {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();
    const { trips, updateTrip } = useTrips();
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [imageUrl, setImageUrl] = useState("");

      useEffect(() => {
        if (!id) return;

        const numericId = Number(id);
        const found = trips.find(t => t.id === numericId);

        if (!found) {
        setLoading(true)
        console.error("Trip not found:", id);
        navigate("/");
        return;
        }

        setTitle(found.title);
        setDescription(found.description);
        setDate(found.date);
        setImageUrl(found.imageUrl ?? "");
  }, [id, trips, navigate]);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        const numericId = Number(id);
        await updateTrip(numericId, { title, description, date, imageUrl });

        navigate(`/trips/${numericId}`);
    };

    if (loading) return <p>Loading...</p>;

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
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="URL obrázku"
            />
            <button type="submit">Uložit změny</button>
        </form>
        </>
    )
}