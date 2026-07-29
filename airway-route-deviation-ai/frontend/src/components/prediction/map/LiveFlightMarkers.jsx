import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { getLiveFlights } from "@/api/liveFlights";
import { predictRouteDeviation } from "@/api/prediction";

const aircraftIcon = new L.DivIcon({
  className: "",
  html: `
    <div style="
      font-size:20px;
      transform: rotate(45deg);
    ">
      ✈️
    </div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export default function LiveFlightMarkers() {
  const [flights, setFlights] = useState([]);
  const [loadingPrediction, setLoadingPrediction] = useState({});
  const [predictions, setPredictions] = useState({});

  const loadFlights = async () => {
    try {
      const data = await getLiveFlights();
      setFlights(data);
    } catch (err) {
      console.error("Failed to load live flights", err);
    }
  };

  useEffect(() => {
    loadFlights();

    const interval = setInterval(loadFlights, 15000);

    return () => clearInterval(interval);
  }, []);

  const handlePrediction = async (flight) => {
    setLoadingPrediction((prev) => ({
      ...prev,
      [flight.icao24]: true,
    }));

    try {
      const result = await predictRouteDeviation({
        longitude: flight.longitude,
        latitude: flight.latitude,
        velocity: flight.velocity,
        true_track: flight.true_track,
        vertical_rate: flight.vertical_rate,
        baro_altitude: flight.baro_altitude,
        geo_altitude: flight.geo_altitude,
      });

      setPredictions((prev) => ({
        ...prev,
        [flight.icao24]: result,
      }));
    } catch (err) {
      console.error(err);

      alert("Prediction failed.");
    } finally {
      setLoadingPrediction((prev) => ({
        ...prev,
        [flight.icao24]: false,
      }));
    }
  };

  return (
    <>
      {flights.map((flight) => {
        const prediction = predictions[flight.icao24];

        return (
          <Marker
            key={flight.icao24}
            position={[flight.latitude, flight.longitude]}
            icon={aircraftIcon}
          >
            <Popup minWidth={300}>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">
                  {flight.callsign || "Unknown Flight"}
                </h3>

                <p>
                  <strong>Country:</strong> {flight.country}
                </p>

                <p>
                  <strong>Altitude:</strong>{" "}
                  {flight.baro_altitude ?? "N/A"} m
                </p>

                <p>
                  <strong>Speed:</strong>{" "}
                  {flight.velocity ?? "N/A"} m/s
                </p>

                <p>
                  <strong>Heading:</strong>{" "}
                  {flight.true_track ?? "N/A"}°
                </p>

                <p>
                  <strong>Vertical Rate:</strong>{" "}
                  {flight.vertical_rate ?? "N/A"} m/s
                </p>

                <button
                  onClick={() => handlePrediction(flight)}
                  disabled={loadingPrediction[flight.icao24]}
                  className="w-full rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {loadingPrediction[flight.icao24]
                    ? "Predicting..."
                    : "Predict Route Deviation"}
                </button>

                {prediction && (
                  <div className="mt-3 rounded border p-3 bg-gray-50">
                    <h4 className="font-bold mb-2">
                      AI Prediction
                    </h4>

                    <p>
                      <strong>Status:</strong>{" "}
                      {prediction.status}
                    </p>

                    <p>
                      <strong>Confidence:</strong>{" "}
                      {(prediction.confidence * 100).toFixed(2)}%
                    </p>

                    <p>
                      <strong>Risk Level:</strong>{" "}
                      {prediction.risk_level}
                    </p>

                    <p>
                      <strong>Reason:</strong>{" "}
                      {prediction.reason}
                    </p>

                    <p>
                      <strong>Recommendation:</strong>{" "}
                      {prediction.recommendation}
                    </p>

                    <p>
                      <strong>Fuel Saving:</strong>{" "}
                      {prediction.fuel_saving}%
                    </p>

                    <p>
                      <strong>CO₂ Reduction:</strong>{" "}
                      {prediction.co2_reduction}%
                    </p>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}