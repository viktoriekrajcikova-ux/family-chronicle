import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Domů</Link>
      <Link to="/trips">Výlety</Link>
      <Link to="/add">Přidat výlet</Link>
      <Link to="/about">O nás</Link>
    </nav>
  );
}
