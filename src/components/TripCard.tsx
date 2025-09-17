import { Link } from "react-router-dom";
import type { Trip } from "../data/trips";

type Props = {
    trip: Trip
    withLink?: boolean
}

export default function TripCard( {trip, withLink = false}: Props) {
    return (
    <>
        <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <img src={trip.imageUrl} alt={trip.title} width="200" />
        <h2>
            {withLink ? (
                <Link to={`/trips/${trip.id}`}>{trip.title}</Link>
            ) : (
                trip.title
            )}
        </h2>
            <p>{trip.description}</p>
            <small>{trip.date}</small>
        </div>
    </>
    );
}