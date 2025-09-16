import { trips } from "../data/trips";
import TripCard from "../components/TripCard";

export default function Trips() {
  return <>
    <h1>Seznam výletů</h1>
    {trips.map(trip => (
        <TripCard key={trip.id} trip={trip} />
    ))}
  </>;
}
