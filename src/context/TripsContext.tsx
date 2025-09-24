import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../data/supabaseClient";
import type { Trip } from "../data/trips";

type TripsContextType = {
  trips: Trip[];
  loading: boolean;
  fetchTrips: () => Promise<void>;
  addTrip: (trip: Omit<Trip, "id">) => Promise<void>;
  editTrip: (id: number, updates: Partial<Trip>) => Promise<void>;
  deleteTrip: (id: number) => Promise<void>;
  getTripById: (id: number) => Trip | undefined;
};

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export function TripsProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("trips").select("*").order("date", { ascending: true });
    if (error) {
      console.error("Chyba při načítání výletů:", error.message);
    } else {
      setTrips(data as Trip[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // add
  const addTrip = async (trip: Omit<Trip, "id">) => {
    const { data, error } = await supabase.from("trips").insert([trip]).select();
    if (error) {
      console.error("Chyba při přidání tripu:", error.message);
      return;
    }
    if (data) setTrips((prev) => [...prev, data[0]]);
  };

  // edit
  const editTrip = async (id: number, updates: Partial<Trip>) => {
    const { data, error } = await supabase
      .from("trips")
      .update(updates)
      .eq("id", id)
      .select();
    if (error) {
      console.error("Chyba při editaci tripu:", error.message);
      return;
    }
    if (data) {
      setTrips((prev) => prev.map((t) => (t.id === id ? data[0] : t)));
    }
  };

  // delete
  const deleteTrip = async (id: number) => {
    const { error } = await supabase.from("trips").delete().eq("id", id);
    if (error) {
      console.error("Chyba při mazání tripu:", error.message);
      return;
    }
    setTrips((prev) => prev.filter((t) => t.id !== id));
  };

  // getTrip
  const getTripById = (id: number) => trips.find((t) => t.id === id);

  return (
    <TripsContext.Provider
      value={{ trips, loading, fetchTrips, addTrip, editTrip, deleteTrip, getTripById }}
    >
      {children}
    </TripsContext.Provider>
  );
}

export function useTrips() {
  const ctx = useContext(TripsContext);
  if (!ctx) throw new Error("useTrips must be used within a TripsProvider");
  return ctx;
}
