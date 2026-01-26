// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "./Container";
import Button from "./Button";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  // zavřít menu při změně routy
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Container>
      <div className={styles.bar}>
        {/* LOGO */}
        <NavLink to="/" className={styles.logo}>
          Family Chronicle <span className={styles.dot}>•</span>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className={styles.desktopNav}>
          <NavLink to="/trips" className={styles.link}>
            Výlety
          </NavLink>
          <NavLink to="/add" className={styles.link}>
            Přidat
          </NavLink>
          <NavLink to="/about" className={styles.link}>
            O nás
          </NavLink>
        </nav>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          {user && (
            <span className={styles.email}>{user.email}</span>
          )}

          {user ? (
            <Button
              variant="ghost"
              className={styles.logout}
              onClick={signOut}
            >
              Odhlásit
            </Button>
          ) : (
            <NavLink to="/login" className={styles.link}>
              Přihlásit
            </NavLink>
          )}

          {/* BURGER */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label="Otevřít menu"
            className={styles.burger}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className={styles.mobileMenu}>
          <NavLink to="/trips" className={styles.mobileLink}>
            Výlety
          </NavLink>

          <NavLink to="/add" className={styles.mobileLink}>
            Přidat
          </NavLink>

          <NavLink to="/about" className={styles.mobileLink}>
            O nás
          </NavLink>

          {user ? (
            <>
              <div className={styles.mobileEmail}>{user.email}</div>
              <button
                onClick={signOut}
                className={styles.mobileLogout}
              >
                Odhlásit
              </button>
            </>
          ) : (
            <NavLink to="/login" className={styles.mobileLink}>
              Přihlásit
            </NavLink>
          )}
        </div>
      )}
    </Container>
  );
}
