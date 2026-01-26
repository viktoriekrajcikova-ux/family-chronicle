// src/pages/TripList.tsx
import { Link } from "react-router-dom";
import { useTrips } from "../context/TripsContext";
import TripCard from "../components/tripCard/TripCard";
import Container from "../components/Container";
import Button from "../components/Button";
import Card from "../components/tripCard/Card";
import styles from "./TripList.module.css";

export default function TripList() {
  const { trips } = useTrips();
  const hasTrips = Array.isArray(trips) && trips.length > 0;

  return (
    <Container>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Výlety</h1>

          <Button>
            <Link to="/add">Přidat výlet</Link>
          </Button>
        </div>

        {/* Empty state */}
        {!hasTrips && (
          <Card className={styles.empty}>
            <h2 className={styles.emptyTitle}>
              Zatím nemáš žádné výlety
            </h2>
            <p className={styles.emptyText}>
              Začni přidáním první vzpomínky.
            </p>

            <Button variant="primary">
              <Link to="/add">Přidat první výlet</Link>
            </Button>
          </Card>
        )}

        {/* Trip list */}
        {hasTrips && (
          <div className={styles.grid}>
            {trips.map((trip) => (
              <Link
                key={trip.id}
                to={`/trips/${trip.id}`}
                className={styles.cardLink}
              >
                <TripCard trip={trip} withLink={false} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
