import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Trip } from "../data/trips";
import { supabase } from "../data/supabaseClient";
import TripCard from "../components/TripCard";

export default function TripsList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrips = async () => {
        const { data, error } = await supabase.from("trips").select("*");

        if (error) {
            console.error("Error fetching trips:", error.message);
            setError(error.message);
            setLoading(false);
            return;
        }

        setTrips(data || []);
        setLoading(false);
    };

    fetchTrips();
  }, []);

    if (loading) return <p>Načítám výlety...</p>;
    if (error) return <p>Chyba: {error}</p>;
    if (trips.length === 0) return <p>Zatím nemáš žádné výlety.</p>;

    return (
        <div>
        <h1>Seznam výletů</h1>
        <Link to="/add">➕ Přidat nový výlet</Link>
        <div style={{ marginTop: "20px" }}>
            {trips.map(trip => (
            <Link key={trip.id} to={`/trips/${trip.id}`} style={{ textDecoration: "none" }}>
                <TripCard trip={trip} />
            </Link>
            ))}
        </div>
        </div>
  );
}