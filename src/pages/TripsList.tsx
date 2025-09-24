import { Link } from "react-router-dom";
import { useTrips } from "../context/TripsContext";
import TripCard from "../components/TripCard";

export default function TripList() {
  const { trips, loading } = useTrips();

  if (loading) return <p>Načítám výlety...</p>;
  if (trips.length === 0) return <p>Zatím žádné výlety nejsou.</p>;

  return (
    <div>
      <h1>Seznam výletů</h1>
      <Link to="/add">Přidat výlet</Link>
      <div>
        {trips.map((trip) => (
          <Link key={trip.id} to={`/trips/${trip.id}`}>
            <TripCard trip={trip} />
          </Link>
        ))}
      </div>
    </div>
  );
}
