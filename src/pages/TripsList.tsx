import { Link } from "react-router-dom";
import { useTrips } from "../context/TripsContext";
import TripCard from "../components/TripCard";
import Container from "../components/Container";
import Button from "../components/Button";
import Card from "../components/Card";

export default function TripList() {
  const { trips } = useTrips();

  const hasTrips = Array.isArray(trips) && trips.length > 0;

  return (
    <Container className="py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Seznam výletů</h1>

        <Button>
          <Link to="/add">Přidat výlet</Link>
        </Button>
      </div>

      {/* Empty state */}
      {!hasTrips && (
        <Card padded className="text-center py-12 bg-gray-50 border-dashed">
          <h2 className="text-xl font-medium text-gray-700 mb-2">
            Zatím nemáš žádné výlety
          </h2>
          <p className="text-gray-500 mb-4">Začni přidáním prvního výletu.</p>

          <Button variant="primary">
            <Link to="/add">Přidat první výlet</Link>
          </Button>
        </Card>
      )}

      {/* Trip list grid */}
      {hasTrips && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Link
              key={trip.id}
              to={`/trips/${trip.id}`}
              className="block group"
            >
              <div className="transform transition duration-300 group-hover:scale-[1.01] group-hover:-translate-y-1">
                <TripCard trip={trip} withLink={false} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
