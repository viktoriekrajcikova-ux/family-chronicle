import type { Trip } from "../data/trips";
import TripCard from "../components/TripCard";

type TripProps = {
  trips: Trip[];
}

export default function Trips({trips}: TripProps) {
  return <>
    <h1>Seznam výletů</h1>
    {trips.map(trip => (
        <TripCard key={trip.id} trip={trip} withLink />
    ))}
  </>;
}
