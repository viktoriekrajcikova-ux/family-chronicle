import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>👋 Vítej v rodinné kronice</h1>
      <p>Tady si ukládáme všechny naše výlety a zážitky.</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/trips">
          <button style={{ marginRight: "10px" }}>Seznam výletů</button>
        </Link>
        <Link to="/add">
          <button>Přidat nový výlet</button>
        </Link>
        <Link to="/change-password" style={{ marginLeft: "10px" }}>
          <button>Změnit heslo</button>
        </Link>
      </div>
    </div>
  );
}