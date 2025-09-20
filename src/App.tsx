import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import TripDetail from "./pages/TripDetail";
import AddTrip from "./pages/AddTrip";
import About from "./pages/About";
import { trips as initialTrip } from "./data/trips";
import type { Trip } from "./data/trips";
import EditTrip from "./pages/EditTrip";

export default function App() {
  const [trips, setTrips] = useState<Trip[]>(initialTrip);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<Trips trips={trips}/>} />
        <Route path="/trips/:id" element={<TripDetail trips={trips} setTrips={setTrips}/>} />
        <Route path="/add" element={<AddTrip setTrips={setTrips}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/edit/:id" element={<EditTrip trips={trips} setTrips={setTrips}/>} />
      </Routes>
    </>
  )
}