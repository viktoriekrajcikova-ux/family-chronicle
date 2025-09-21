import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Trip } from "../data/trips";
import TripCard from "../components/TripCard";
import { supabase } from "../data/supabaseClient";

export default function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const numericId = Number(id);
    if (!id || isNaN(numericId)) {
      console.error("Invalid trip ID:", id);
      navigate("/trips");
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
        navigate("/trips");
        return;
      }

      setTrip(data);
      setLoading(false);
    };

    fetchTrip();
  }, [id, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!trip) return <h1>Výlet nenalezen</h1>;

  const handleDelete = async () => {
    const { error } = await supabase.from("trips").delete().eq("id", trip.id);
    if (error) {
      console.error(error.message);
      return;
    }
    navigate("/trips");
  };

  return (
    <>
      <h1>Trip Detail</h1>
      <TripCard trip={trip} />
      <button onClick={handleDelete}>Smazat</button>
      <button onClick={() => navigate(`/edit/${trip.id}`)}>Upravit</button>
      <Link to="/trips">Zpět na seznam</Link>
    </>
  );
}
