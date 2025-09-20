import { useParams, Link, useNavigate } from "react-router-dom";
import type { Trip } from "../data/trips";
import TripCard from "../components/TripCard";

type TripDetailParams = {
  id: string; // vždycky přijde string z URL
};

type TripDetailProps = {
  trips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
}

export default function TripDetail({trips, setTrips}: TripDetailProps) {
    const { id } = useParams<{id: string}>();
    const trip: Trip | undefined = trips.find(t => t.id === Number(id))
    const navigate = useNavigate();

    if (!trip) return <h1>Vylet nenalezen</h1>
    const handleDelete = () => {
        setTrips(prev => prev.filter(t => t.id !== trip.id))
        navigate("/")
    };
    return (<>
        <TripCard trip={trip} />
        <br />
        <br />
        <button onClick={handleDelete}>Smazat</button>
        <Link to={`/edit/${trip.id}`}>Upravit</Link>
        <Link to="/trips">Zpet na seznam</Link>
    </>)
}
