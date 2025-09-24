import { Link, useNavigate, useParams } from "react-router-dom";
import { useTrips } from "../context/TripsContext";
import TripCard from "../components/TripCard";

export default function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trips, deleteTrip } = useTrips();

  
  const numericId = Number(id);
  const trip = trips.find(t => t.id === numericId);

  if (!trip) return <h1>Výlet nenalezen</h1>;

  const handleDelete = async () => {
    await deleteTrip(trip.id);
    navigate("/");
  };

  return (
    <>
      <TripCard trip={trip} />
      <h1>Detail výletu</h1>
      <button onClick={handleDelete}>Smazat</button>
      <button onClick={() => navigate(`/edit/${trip.id}`)}>Upravit</button>
      <br />
      <Link to="/trips">Zpět na seznam</Link>
    </>
  );
}
