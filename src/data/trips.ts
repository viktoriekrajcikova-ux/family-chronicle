export type Trip = {
    id: number;
    title: string;
    description: string;
    date: string; // ISO
    imageUrl: string;
};

export const trips: Trip[] = [
    {id: 1, title: "Výlet na hory", description: "Krásný den strávený na horách.", date: "2023-05-15", imageUrl: "/images/mountains.jpg"},
    {id: 2, title: "Návštěva zoo", description: "Viděli jsme spoustu zvířat.", date: "2023-06-20", imageUrl: "/images/zoo.jpg"},    
];

export type TripInsert = Omit<Trip, "id">;