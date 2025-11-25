// src/context/TripsContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { Trip } from "../data/trips";
import * as tripsService from "../services/tripsService";

type TripsContextType = {
  trips: Trip[];
  addTrip: (tripData: Omit<Trip, "id" | "created_at">) => Promise<Trip | null>;
  updateTrip: (id: number, tripData: Partial<Omit<Trip, "id" | "created_at">>) => Promise<Trip | null>;
  deleteTrip: (id: number, imageUrl?: string | null) => Promise<void>;
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
      try {
        const data = await tripsService.fetchTrips();
        setTrips(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? String(err));
      } finally {
        setLoading(false);
      }
    };
    loadTrips();
  }, []);

  const addTrip = async (tripData: Omit<Trip, "id" | "created_at">): Promise<Trip | null> => {
    const newTrip = await tripsService.addTrip(tripData);
    if (newTrip) setTrips(prev => [newTrip, ...prev]);
    return newTrip;
  };

  const updateTrip = async (id: number, tripData: Partial<Omit<Trip, "id" | "created_at">>) => {
    const updated = await tripsService.updateTrip(id, tripData);
    if (updated) setTrips(prev => prev.map(t => (t.id === id ? updated : t)));
    return updated;
  };

  const deleteTrip = async (id: number, imageUrl?: string | null) => {
    await tripsService.deleteTrip(id, imageUrl);
    setTrips(prev => prev.filter(t => t.id !== id));
  };

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await tripsService.fetchTrips();
      setTrips(data);
    } catch (err: any) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

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
