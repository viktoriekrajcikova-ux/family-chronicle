import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight text-gray-800 hover:text-indigo-600 transition"
          >
            Family Chronicle
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">

            <Link
              to="/trips"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 py-1"
            >
              Výlety
            </Link>

            <Link
              to="/add"
              className="text-sm font-medium text-indigo-600 hover:underline py-1"
            >
              Přidat
            </Link>

            {/* Přihlášený uživatel */}
            {user ? (
              <>
                <span className="text-sm text-gray-500 hidden sm:block">
                  {user.email}
                </span>
                <Button
                  variant="ghost"
                  className="text-sm"
                  onClick={signOut}
                >
                  Odhlásit
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 py-1"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 py-1"
                >
                  Registrovat
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
