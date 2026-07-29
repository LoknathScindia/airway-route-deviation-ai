import { Polyline } from "react-leaflet";

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

function RouteLayer({
  departureAirport,
  destinationAirport,
  alternateRoute,
}) {
  const plannedRoute =
    isValidAirport(departureAirport) &&
    isValidAirport(destinationAirport)
      ? [
          [
            Number(departureAirport.latitude),
            Number(departureAirport.longitude),
          ],
          [
            Number(destinationAirport.latitude),
            Number(destinationAirport.longitude),
          ],
        ]
      : [];

  const alternateCoordinates =
    alternateRoute?.success && Array.isArray(alternateRoute.route)
      ? alternateRoute.route
          .filter(isValidAirport)
          .map((airport) => [
            Number(airport.latitude),
            Number(airport.longitude),
          ])
      : [];

  return (
    <>
      {/* Planned Route */}
      {plannedRoute.length === 2 && (
        <Polyline
          positions={plannedRoute}
          pathOptions={{
            color: "#2563eb",
            weight: 4,
            opacity: 0.85,
            dashArray: "10 10",
            lineCap: "round",
            lineJoin: "round",
          }}
        />
      )}

      {/* Alternate Route */}
      {alternateCoordinates.length >= 2 && (
        <Polyline
          positions={alternateCoordinates}
          pathOptions={{
            color: "#16a34a",
            weight: 6,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
          }}
        />
      )}
    </>
  );
}

export default RouteLayer;