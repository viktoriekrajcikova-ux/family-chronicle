import { Link } from "react-router-dom";
import type { Trip } from "../data/trips";

type Props = {
  trip: Trip;
  withLink?: boolean;
};

export default function TripCard({ trip, withLink = false }: Props) {
  const CardInner = (
    <article className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Responsive image box: keep aspect ratio and scale height by breakpoint */}
      <div
        className="
          w-full
          bg-gray-100
          overflow-hidden
          /* mobile: 3:2-ish, sm+: 16:9-ish */
          aspect-[3/2] sm:aspect-video
        "
        aria-hidden={!trip.imageUrl}
      >
        {trip.imageUrl ? (
          <img
            src={trip.imageUrl}
            alt={trip.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Bez obrázku
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {withLink ? (
            <Link to={`/trips/${trip.id}`} className="hover:underline underline-offset-2">
              {trip.title}
            </Link>
          ) : (
            trip.title
          )}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3">{trip.description}</p>

        <small className="text-xs text-gray-500 block">{trip.date}</small>
      </div>
    </article>
  );

  return withLink ? <Link to={`/trips/${trip.id}`} className="block">{CardInner}</Link> : <div className="block">{CardInner}</div>;
}
