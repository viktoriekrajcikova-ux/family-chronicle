import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-semibold">Family Chronicle</Link>
          <nav className="flex items-center gap-3">
            <Link to="/trips" className="text-sm text-gray-700 hover:text-gray-900">Výlety</Link>
            <Link to="/add" className="text-sm text-indigo-600 hover:underline">Přidat</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
