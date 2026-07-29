import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

function isValidAirport(airport) {
  return (
    airport &&
    airport.latitude !== undefined &&
    airport.longitude !== undefined &&
    airport.latitude !== null &&
    airport.longitude !== null &&
    !isNaN(Number(airport.latitude)) &&
    !isNaN(Number(airport.longitude))
  );
}

function FitBounds({
  departureAirport,
  destinationAirport,
  alternateRoute,
}) {
  const map = useMap();

  useEffect(() => {
    const points = [];

    if (isValidAirport(departureAirport)) {
      points.push([
        Number(departureAirport.latitude),
        Number(departureAirport.longitude),
      ]);
    }

    if (isValidAirport(destinationAirport)) {
      points.push([
        Number(destinationAirport.latitude),
        Number(destinationAirport.longitude),
      ]);
    }

    if (
      alternateRoute?.success &&
      Array.isArray(alternateRoute.route)
    ) {
      alternateRoute.route.forEach((airport) => {
        if (isValidAirport(airport)) {
          points.push([
            Number(airport.latitude),
            Number(airport.longitude),
          ]);
        }
      });
    }

    if (points.length === 0) return;

    // Only one airport available
    if (points.length === 1) {
      map.setView(points[0], 6, {
        animate: true,
      });
      return;
    }

    const bounds = L.latLngBounds(points);

    map.flyToBounds(bounds, {
      padding: [80, 80],
      maxZoom: 7,
      duration: 1.2,
    });
  }, [
    departureAirport,
    destinationAirport,
    alternateRoute,
    map,
  ]);

  return null;
}

export default FitBounds;