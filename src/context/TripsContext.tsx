import { createContext, useContext, useState, useEffect } from "react";
import type { Trip } from "../data/trips";
import * as tripsService from "../services/tripsService"

type TripsContextType = {
  trips: Trip[];

  addTrip: (tripData: Omit<Trip, "id">) => Promise<Trip | null>;
  updateTrip: (id: number, tripData: Partial<Trip>) => Promise<Trip | null>;
  deleteTrip: (id: number) => Promise<boolean>;
  fetchTrips: () => Promise<void>;
  getTripById: (id: number) => Trip | undefined;
};

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const TripsProvider = ({ children }: { children: React.ReactNode }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrips = async () => {
      const data = await tripsService.fetchTrips();
      setTrips(data);
    };
    loadTrips();
  }, []);

const addTrip = async (tripData: Omit<Trip, "id">): Promise<Trip | null> => {
  const newTrip = await tripsService.addTrip(tripData);
  if (newTrip) {
    setTrips(prev => [newTrip, ...prev]);
  }
  return newTrip;
};


  const updateTrip = async (id: number, tripData: Partial<Trip>) => {
    const updated = await tripsService.updateTrip(id, tripData);
    if (updated) {
      setTrips(prev => prev.map(t => (t.id === id ? updated : t)));
    }
    return updated;
  };

  const deleteTrip = async (id: number) => {
    const success = await tripsService.deleteTrip(id);
    if (success) {
      setTrips(prev => prev.filter(t => t.id !== id));
    }
    return success;
  };

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await fetchTrips();
      setTrips(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const getTripById = (id: number) => trips.find(t => Number(t.id) === Number(id));

  return (
    <TripsContext.Provider value={{ trips, addTrip, updateTrip, deleteTrip, fetchTrips, getTripById }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => {
  const ctx = useContext(TripsContext);
  if (!ctx) throw new Error("useTrips must be used within TripsProvider");
  return ctx;
};
