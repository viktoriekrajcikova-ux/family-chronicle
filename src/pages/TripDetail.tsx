import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useTrips } from "../context/TripsContext";
import TripCard from "../components/TripCard";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";
import type { Trip } from "../data/trips";

export default function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, deleteTrip } = useTrips();
  const location = useLocation();
  const toast = useToast();

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
      <Container className="py-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-xl font-semibold text-red-600 mb-4">Neplatné ID</h1>
          <Link to="/trips" className="text-indigo-600 hover:underline">Zpět na seznam</Link>
        </div>
      </Container>
    );
  }

  if (!trip) {
    return (
      <Container className="py-10">
        <div className="max-w-2xl mx-auto text-center text-gray-600">
          <Spinner size="md" />
          <p className="mt-3">Načítám…</p>
        </div>
      </Container>
    );
  }

  const handleDelete = async () => {
    const ok = confirm("Opravdu chceš tento výlet smazat? Tato akce je nevratná.");
    if (!ok) return;

    setError(null);
    try {
      setLoading(true);
      await deleteTrip(trip.id, trip.imageUrl ?? null);
      toast.push("Výlet smazán.", { type: "success" });
      navigate("/trips");
    } catch (err: any) {
      console.error("Chyba při mazání výletu:", err);
      const msg = err?.message ?? "Nepodařilo se smazat výlet.";
      setError(msg);
      toast.push(msg, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Hlavní karta s obrázkem a titulkem */}
        <Card padded hover>
          <TripCard trip={trip} withLink={false} />
        </Card>

        {/* Detail info */}
        <Card padded>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{trip.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{trip.date}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => navigate(`/edit/${trip.id}`, { state: { trip } })}
                  disabled={loading}
                >
                  Upravit
                </Button>

                <Button onClick={handleDelete} variant="danger" disabled={loading}>
                  {loading ? <Spinner size="sm" /> : null}
                  <span>{loading ? "Mažu..." : "Smazat"}</span>
                </Button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                {error}
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Popis</h3>
              <p className="whitespace-pre-wrap text-gray-700">{trip.description}</p>
            </div>
          </div>

          <div className="mt-6">
            <Link to="/trips" className="text-sm text-indigo-600 hover:underline">
              ← Zpět na seznam
            </Link>
          </div>
        </Card>
      </div>
    </Container>
  );
}
