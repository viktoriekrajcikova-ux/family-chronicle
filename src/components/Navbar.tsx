import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import Container from "./Container";
import clsx from "clsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const linkClass = (isActive: boolean) =>
    clsx(
      "px-3 py-2 rounded-md text-sm font-medium transition",
      isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
    );

  return (
    <nav className="bg-white border-b">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition">
            Family Chronicle
          </NavLink>

          {/* Desktop menu */}
          <div className="hidden sm:flex items-center gap-3">
            <NavLink to="/trips" className={({ isActive }) => linkClass(isActive)}>
              Výlety
            </NavLink>

            <NavLink to="/add" className={({ isActive }) => linkClass(isActive)}>
              Přidat
            </NavLink>

            {user ? (
              <>
                <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>
                <Button variant="ghost" className="text-sm" onClick={signOut}>
                  Odhlásit
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => linkClass(isActive)}>
                  Přihlásit
                </NavLink>
                <NavLink to="/register" className={({ isActive }) => linkClass(isActive)}>
                  Registrovat
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Otevřít menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={clsx("sm:hidden border-t bg-white transition-max-height duration-200 overflow-hidden", {
          "max-h-96": open,
          "max-h-0": !open,
        })}
        aria-hidden={!open}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavLink to="/trips" onClick={() => setOpen(false)} className={({ isActive }) => linkClass(isActive)}>
            Výlety
          </NavLink>

          <NavLink to="/add" onClick={() => setOpen(false)} className={({ isActive }) => linkClass(isActive)}>
            Přidat
          </NavLink>

          {user ? (
            <>
              <div className="px-3 py-2 text-sm text-gray-600">Signed in as <span className="font-medium">{user.email}</span></div>
              <button
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                Odhlásit
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)} className={({ isActive }) => linkClass(isActive)}>
                Přihlásit
              </NavLink>
              <NavLink to="/register" onClick={() => setOpen(false)} className={({ isActive }) => linkClass(isActive)}>
                Registrovat
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
