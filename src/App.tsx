import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import TripDetail from "./pages/TripDetail";
import AddTrip from "./pages/AddTrip";
import About from "./pages/About";
import EditTrip from "./pages/EditTrip";
import { supabase } from "./data/supabaseClient";

export default function App() {
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const { data, error } = await supabase.from("trips").select("*");
      if (data) setTrips(data);
    };
    fetchTrips();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<Trips trips={trips}/>} />
        <Route path="/trips/:id" element={<TripDetail/>} />
        <Route path="/add" element={<AddTrip setTrips={setTrips}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/edit/:id" element={<EditTrip/>} />
      </Routes>
    </>
  )
}