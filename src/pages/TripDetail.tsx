import { useParams, Link } from "react-router-dom";
import { trips } from "../data/trips";
import type { Trip } from "../data/trips";
import TripCard from "../components/TripCard";

type TripDetailParams = {
  id: string; // vždycky přijde string z URL
};

export default function TripDetail() {
    const { id } = useParams<{id: string}>();
    const trip: Trip | undefined = trips.find(t => t.id === Number(id))
   
    if (!trip) return <h1>Vylet nenalezen</h1>
    return (<>
        <TripCard trip={trip} />
        <br />
        <Link to="/trips">Zpet na seznam</Link>
    </>)
}
