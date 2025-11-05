// src/pages/TripDetail.tsx
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { useTrips } from "../context/TripsContext";
import TripCard from "../components/TripCard";
import type { Trip } from "../data/trips";

export default function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, deleteTrip } = useTrips();
  const location = useLocation();

  const numericId = Number(id);
  const stateTrip = (location.state as { trip?: Trip } | null)?.trip;

 
  const trip = useMemo(() => {
    if (stateTrip) return stateTrip;
    return trips.find((t) => Number(t.id) === numericId);
  }, [stateTrip, trips, numericId]);

  if (!Number.isFinite(numericId)) return <h1>Neplatné ID</h1>;
  if (!trip) return <h1>Načítám…</h1>;

  const handleDelete = async () => {
    await deleteTrip(trip.id);
    navigate("/trips");
  };
  
  return (
    <>
      <TripCard trip={trip} />
      <h1>Detail výletu</h1>
      <button onClick={handleDelete}>Smazat</button>
      <button onClick={() => navigate(`/edit/${trip.id}`)}>Upravit</button>
      <br />
      <Link to="/trips">Zpět na seznam</Link>
    </>
  );
}
