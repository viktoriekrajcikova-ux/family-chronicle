import { useParams } from "react-router-dom";

type TripDetailParams = {
  id: string; // vždycky přijde string z URL
};

export default function TripDetail() {
  const { id } = useParams<TripDetailParams>();
  return <h1>Detail výletu: {id}</h1>;
}
