import type { Trip } from "../data/trips";

type Props = {
    trip: Trip
}

export default function TripCard( {trip}: Props) {
    return (
    <>
        <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <img src={trip.imageUrl} alt={trip.title} width="200" />
            <h2>{trip.title}</h2>
            <p>{trip.description}</p>
            <small>{trip.date}</small>
        </div>
    </>
    );
}