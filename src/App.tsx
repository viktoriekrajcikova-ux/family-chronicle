import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TripDetail from "./pages/TripDetail";
import AddTrip from "./pages/AddTrip";
import About from "./pages/About";
import EditTrip from "./pages/EditTrip";
import TripsList from "./pages/TripsList";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<TripsList />}/>
        <Route path="/trips/:id" element={<TripDetail/>} />
        <Route path="/add" element={<AddTrip />} />
        <Route path="/about" element={<About />} />
        <Route path="/edit/:id" element={<EditTrip/>} />
      </Routes>
    </>
  )
}