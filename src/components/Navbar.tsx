// src/components/Navbar.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  const linkClass = (isActive: boolean) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <NavLink to="/" className="text-xl font-semibold text-gray-900">
            Family Chronicle
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-2">

            <NavLink to="/trips" className={({ isActive }) => linkClass(isActive)}>
              Výlety
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/add"
                  className={({ isActive }) => linkClass(isActive)}
                >
                  Přidat výlet
                </NavLink>

                <button
                  onClick={signOut}
                  className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout ({user.email})
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => linkClass(isActive)}>
                  Login
                </NavLink>
                <NavLink to="/register" className={({ isActive }) => linkClass(isActive)}>
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile burger button */}
          <div className="sm:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden border-t bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">

            <NavLink to="/trips" onClick={() => setOpen(false)}
              className={({ isActive }) => linkClass(isActive)}>
              Výlety
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/add"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => linkClass(isActive)}
                >
                  Přidat výlet
                </NavLink>

                <button
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout ({user.email})
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => linkClass(isActive)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => linkClass(isActive)}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
