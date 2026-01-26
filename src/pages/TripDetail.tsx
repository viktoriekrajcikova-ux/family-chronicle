// src/pages/TripDetail.tsx
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useTrips } from "../context/TripsContext";
import TripCard from "../components/tripCard/TripCard";
import Container from "../components/Container";
import Card from "../components/tripCard/Card";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useToast from "../components/toast/useToast";
import type { Trip } from "../data/trips";
import styles from "./TripDetail.module.css";

export default function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, deleteTrip } = useTrips();
  const location = useLocation();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const numericId = Number(id);
  const stateTrip = (location.state as { trip?: Trip } | null)?.trip ?? null;

  const trip = useMemo<Trip | undefined>(() => {
    if (stateTrip) return stateTrip;
    return trips.find((t) => Number(t.id) === numericId);
  }, [stateTrip, trips, numericId]);

  if (!trip) {
    return (
      <Container>
        <div className={styles.loading}>
          <Spinner size="md" />
        </div>
      </Container>
    );
  }

  const handleDelete = async () => {
    if (!confirm("Opravdu chceš tento výlet smazat?")) return;

    try {
      setLoading(true);
      await deleteTrip(trip.id, trip.imageUrl ?? null);
      toast.push("Výlet byl smazán.", { type: "success" });
      navigate("/trips");
    } catch (err: any) {
      const msg = err?.message ?? "Nepodařilo se smazat výlet.";
      setError(msg);
      toast.push(msg, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        {/* HLAVNÍ KARTA */}
        <div className={styles.cardWrapper}>
          <TripCard trip={trip} />
        </div>

        {/* AKCE */}
        <div className={styles.cardWrapper}>
          <Card>
            <div className={styles.actions}>
              <div className={styles.buttons}>
                <Button
                  onClick={() =>
                    navigate(`/edit/${trip.id}`, { state: { trip } })
                  }
                  disabled={loading}
                >
                  Upravit
                </Button>

                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Smazat"}
                </Button>
              </div>

              <Link to="/trips" className={styles.backLink}>
                ← Zpět na seznam
              </Link>
            </div>

            {error && <div className={styles.error}>{error}</div>}
          </Card>
        </div>
      </div>
    </Container>
  );
}
