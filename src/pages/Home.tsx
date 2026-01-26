// src/pages/Home.tsx
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroInner}>
            <h1 className={styles.title}>
              Vítej v rodinné kronice
            </h1>

            <p className={styles.subtitle}>
              Tady si ukládáme všechny naše výlety, zážitky a malé okamžiky,
              které chceme uchovat. Budujeme místo plné vzpomínek.
            </p>

            {/* ACTION BUTTONS */}
            <div className={styles.actions}>
              <Link to="/trips">
                <Button variant="primary">
                  Seznam výletů
                </Button>
              </Link>

              <Link to="/add">
                <Button variant="secondary">
                  Přidat nový výlet
                </Button>
              </Link>

              <Link to="/change-password">
                <Button variant="ghost">
                  Změnit heslo
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* FOOT NOTE */}
      <Container>
        <div className={styles.footerNote}>
          Zapisujeme naše příběhy. Jeden výlet po druhém.
        </div>
      </Container>
    </>
  );
}
