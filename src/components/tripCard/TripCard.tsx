// src/components/tripCard/TripCard.tsx
import { Link } from "react-router-dom";
import type { Trip } from "../../data/trips";
import CardBase from "./CardBase";
import styles from "./TripCard.module.css";

type Props = {
  trip: Trip;
  withLink?: boolean;
};

export default function TripCard({ trip, withLink = false }: Props) {
  const content = (
    <CardBase hover className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        {trip.imageUrl ? (
          <img
            src={trip.imageUrl}
            alt={trip.title || "Fotka z výletu"}
            loading="lazy"
            decoding="async"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>Bez obrázku</div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <p className={styles.badge}>Výlet</p>

        <h3 className={styles.title}>{trip.title}</h3>

        <p className={styles.description}>{trip.description}</p>

        <p className={styles.date}>{trip.date}</p>
      </div>
    </CardBase>
  );

  return withLink ? (
    <Link to={`/trips/${trip.id}`} className={styles.link}>
      {content}
    </Link>
  ) : (
    content
  );
}
