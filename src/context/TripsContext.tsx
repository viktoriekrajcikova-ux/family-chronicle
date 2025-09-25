import { createContext, useContext, useState, useEffect } from "react";
import type { Trip } from "../data/trips";
import * as tripsService from "../services/tripsService"

type TripsContextType = {
  trips: Trip[];

  addTrip: (tripData: Omit<Trip, "id">) => Promise<Trip | null>;
  updateTrip: (id: number, tripData: Partial<Trip>) => Promise<Trip | null>;
  deleteTrip: (id: number) => Promise<boolean>;
};

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const TripsProvider = ({ children }: { children: React.ReactNode }) => {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const loadTrips = async () => {
      const data = await tripsService.fetchTrips();
      setTrips(data);
    };
    loadTrips();
  }, []);

  const addTrip = async (tripData: Omit<Trip, "id">) => {
    const newTrip = await tripsService.addTrip(tripData);
    if (newTrip) {
      setTrips(prev => [...prev, newTrip]);
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

  return (
    <TripsContext.Provider value={{ trips, addTrip, updateTrip, deleteTrip }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => {
  const ctx = useContext(TripsContext);
  if (!ctx) throw new Error("useTrips must be used within TripsProvider");
  return ctx;
};
