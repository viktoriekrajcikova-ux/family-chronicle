import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center space-y-6">
      <h1 className="text-4xl font-bold">
        Vítej v rodinné kronice
      </h1>

      <p className="text-gray-600 text-lg leading-relaxed">
        Tady si ukládáme všechny naše výlety, zážitky a malé okamžiky,
        které chceme uchovat.  
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <Link
          to="/trips"
          className="px-5 py-3 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition text-sm font-medium"
        >
          Seznam výletů
        </Link>

        <Link
          to="/add"
          className="px-5 py-3 rounded bg-green-600 text-white hover:bg-green-700 transition text-sm font-medium"
        >
          Přidat nový výlet
        </Link>

        <Link
          to="/change-password"
          className="px-5 py-3 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm font-medium"
        >
          Změnit heslo
        </Link>
      </div>

      <div className="mt-8 border-t pt-6 text-sm text-gray-500">
        Zapisujeme naše příběhy. Jeden výlet po druhém.
      </div>
    </div>
  );
}
