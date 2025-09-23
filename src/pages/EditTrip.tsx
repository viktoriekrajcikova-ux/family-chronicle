import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Trip } from "../data/trips";
import { supabase } from "../data/supabaseClient";

export default function EditTrip() {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();
    const [trip, setTrip] = useState<Trip | null>(null);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const numericId = Number(id);

        if (!id || isNaN(numericId)) {
        console.error("Invalid trip ID:", id);
        navigate("/"); // redirect na hlavní stránku
        return;
        }

        const fetchTrip = async () => {
        const { data, error } = await supabase
            .from("trips")
            .select("*")
            .eq("id", numericId)
            .single();

        if (error) {
            console.error("Supabase fetch error:", error.message);
            navigate("/"); // pokud nenajde, redirect
            return;
        }

        if (data) {
            setTrip(data);
            setTitle(data.title);
            setDescription(data.description);
            setDate(data.date);
            setImageUrl(data.imageUrl ?? "");
        }

        setLoading(false);
        };

        fetchTrip();
    }, [id, navigate]);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!trip) return;

        const { data, error } = await supabase
        .from("trips")
        .update({ title, description, date, imageUrl })
        .eq("id", trip.id)
        .select();

        if (error) {
            console.error("Supabase update error:", error.message);
            return;
        }

        const updatedTrip = (data ?? [])[0];
        if (updatedTrip) {
            setTrip(updatedTrip)
        }

        navigate(`/trips/${trip.id}`);
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