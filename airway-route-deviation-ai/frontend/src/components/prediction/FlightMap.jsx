import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import AirportMarkers from "./map/AirportMarkers";
import RouteLayer from "./map/RouteLayer";
import FitBounds from "./map/FitBounds";
import MapLegend from "./map/MapLegend";
import LiveFlightMarkers from "./map/LiveFlightMarkers";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FlightMap({ result }) {
  if (!result) return null;

  const departureAirport = result.departure_airport;
  const destinationAirport = result.destination_airport;
  const alternateRoute = result.alternate_route;

  return (
    <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-5 border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Flight Route Visualization
        </h2>

        <p className="mt-1 text-slate-500">
          Interactive map showing the planned route, AI-generated alternate
          route, and live aircraft positions.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          scrollWheelZoom={true}
          style={{
            height: "550px",
            width: "100%",
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors &copy; CARTO"
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          <RouteLayer
            departureAirport={departureAirport}
            destinationAirport={destinationAirport}
            alternateRoute={alternateRoute}
          />

          <AirportMarkers
            departureAirport={departureAirport}
            destinationAirport={destinationAirport}
            alternateRoute={alternateRoute}
          />

          <FitBounds
            departureAirport={departureAirport}
            destinationAirport={destinationAirport}
            alternateRoute={alternateRoute}
          />

          {/* Live Aircraft */}
          <LiveFlightMarkers />
        </MapContainer>
      </div>

      <MapLegend />

      {alternateRoute?.success && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5">
          <h3 className="text-lg font-bold text-green-800">
            AI Route Optimisation
          </h3>

          <p className="mt-2 text-green-700">
            An alternate flight path has been generated to reduce operational
            risk while improving overall route efficiency.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-green-600">
                Estimated Fuel Saving
              </p>

              <h4 className="text-xl font-bold">
                {result.fuel_saving} kg
              </h4>
            </div>

            <div>
              <p className="text-sm text-green-600">
                Estimated CO₂ Reduction
              </p>

              <h4 className="text-xl font-bold">
                {result.co2_reduction} kg
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlightMap;