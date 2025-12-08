import { Link } from "react-router-dom";
import type { Trip } from "../data/trips";

type Props = {
  trip: Trip;
  withLink?: boolean;
};

export default function TripCard({ trip, withLink = false }: Props) {
  const Wrapper = withLink ? Link : "div";

  return (
    <Wrapper
      to={withLink ? `/trips/${trip.id}` : undefined}
      className="block"
    >
      <article
        className="
          bg-white border border-gray-200 rounded-xl overflow-hidden 
          shadow-sm hover:shadow-md hover:-translate-y-[1px]
          transition-all duration-200
        "
      >
        {/* Image */}
        <div className="w-full aspect-[3/2] sm:aspect-video bg-gray-100">
          {trip.imageUrl ? (
            <img
              src={trip.imageUrl}
              alt={trip.title || "Fotka z výletu"}
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

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3
            className="
              text-lg font-semibold text-gray-900
              group-hover:text-indigo-700 transition-colors
            "
          >
            {withLink ? (
              <span className="underline-offset-2 group-hover:underline">
                {trip.title}
              </span>
            ) : (
              trip.title
            )}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-3">
            {trip.description}
          </p>

          <small className="text-xs text-gray-500 block">
            {trip.date}
          </small>
        </div>
      </article>
    </Wrapper>
  );
}
