import { Link } from "react-router-dom";
import { useTrips } from "../context/TripsContext";
import TripCard from "../components/TripCard";

export default function TripList() {
  const { trips } = useTrips();

  if (!trips) {
    return <p>Loading...</p>;
  }

  if (trips.length === 0) {
    return (
      <div>
        <h2>Žádné výlety</h2>
        <Link to="/add">Přidat první výlet</Link>
      </div>
    );
  }

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
