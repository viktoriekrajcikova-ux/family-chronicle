import { Link } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";

export default function Home() {
  return (
    <Container className="py-12 text-center">
      <div className="max-w-3xl mx-auto space-y-8">

        <h1 className="text-4xl font-bold text-gray-900">
          Vítej v rodinné kronice
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed max-w-prose mx-auto">
          Tady si ukládáme všechny naše výlety, zážitky a malé okamžiky,  
          které chceme uchovat. Budujeme místo plné vzpomínek.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link to="/trips">
            <Button variant="primary" className="w-full sm:w-auto">
              Seznam výletů
            </Button>
          </Link>

          <Link to="/add">
            <Button variant="secondary" className="w-full sm:w-auto">
              Přidat nový výlet
            </Button>
          </Link>

          <Link to="/change-password">
            <Button variant="ghost" className="w-full sm:w-auto">
              Změnit heslo
            </Button>
          </Link>
        </div>

        <div className="pt-8 border-t text-sm text-gray-500">
          Zapisujeme naše příběhy. Jeden výlet po druhém.
        </div>
      </div>
    </Container>
  );
}
