import { Link } from "react-router-dom";
import { useTrips } from "../context/TripsContext";
import TripCard from "../components/TripCard";

export default function TripList() {
  const { trips } = useTrips();

  const hasTrips = trips && trips.length > 0;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Seznam výletů</h1>
        <Link
          to="/add"
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Přidat výlet
        </Link>
      </div>

      {/* Empty state */}
      {!hasTrips && (
        <div className="text-center py-10 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-medium mb-3">Žádné výlety</h2>
          <Link
            to="/add"
            className="text-indigo-600 hover:underline font-medium"
          >
            Přidat první výlet
          </Link>
        </div>
      )}

      {/* Trip list grid */}
      {hasTrips && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Link key={trip.id} to={`/trips/${trip.id}`} className="block">
              <TripCard trip={trip} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
