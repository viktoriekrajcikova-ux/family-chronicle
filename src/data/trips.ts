// src/data/trips.ts
export type Trip = {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl?: string | null;
  created_at?: string;
};
