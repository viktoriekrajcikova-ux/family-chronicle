// src/pages/TripDetail.tsx
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useTrips } from "../context/TripsContext";
import TripCard from "../components/TripCard";
import Spinner from "../components/Spinner";
import type { Trip } from "../data/trips";

export default function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, deleteTrip } = useTrips();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const numericId = Number(id);

  
  const stateTrip = (location.state as { trip?: Trip } | null)?.trip ?? null;

  const trip = useMemo<Trip | undefined>(() => {
    if (stateTrip) return stateTrip;
    return trips.find((t) => Number(t.id) === numericId);
  }, [stateTrip, trips, numericId]);

  if (!Number.isFinite(numericId)) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-xl font-semibold text-red-600">Neplatné ID</h1>
        <Link to="/trips" className="text-indigo-600 hover:underline">Zpět na seznam</Link>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-gray-600">Načítám…</p>
      </div>
    );
  }

  const handleDelete = async () => {
    const ok = confirm("Opravdu chceš tento výlet smazat? Tato akce je nevratná.");
    if (!ok) return;

    setError(null);
    try {
      setLoading(true);
      // deleteTrip má signaturu (id: number, imageUrl?: string | null)
      await deleteTrip(trip.id, trip.imageUrl ?? null);
      // po úspěšném smazání přesměruj na seznam
      navigate("/trips");
    } catch (err: any) {
      console.error("Chyba při mazání výletu:", err);
      setError(err?.message ?? "Nepodařilo se smazat výlet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* TripCard zobrazuje hlavní info (image, title, date...) */}
      <TripCard trip={trip} />

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Detail výletu</h2>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm text-gray-600"><strong>Název:</strong> {trip.title}</p>
          <p className="text-sm text-gray-600"><strong>Datum:</strong> {trip.date}</p>
          <p className="text-sm text-gray-600"><strong>Popis:</strong></p>
          <p className="whitespace-pre-wrap">{trip.description}</p>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => navigate(`/edit/${trip.id}`, { state: { trip } })}
            disabled={loading}
            className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-70"
          >
            Upravit
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-70 inline-flex items-center gap-2"
          >
            {loading ? <Spinner size={16} /> : null}
            <span>{loading ? "Mažu..." : "Smazat"}</span>
          </button>

          <Link
            to="/trips"
            className="ml-auto text-sm text-indigo-600 hover:underline"
          >
            Zpět na seznam
          </Link>
        </div>
      </div>
    </div>
  );
}
