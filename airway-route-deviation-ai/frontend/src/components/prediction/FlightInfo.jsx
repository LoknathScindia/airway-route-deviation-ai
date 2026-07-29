import {
  calculateDistance,
  calculateFlightTime,
  calculateFuel,
  calculateCO2,
} from "../../utils/flightCalculations";

function FlightInfo({ result }) {
  if (!result) return null;

  const departure = result.departure_airport;
  const destination = result.destination_airport;

  const distance = calculateDistance(departure, destination);
  const flightTime = calculateFlightTime(distance);
  const fuel = calculateFuel(distance);
  const co2 = calculateCO2(fuel);

  const confidence = (result.confidence * 100).toFixed(2);

  const statusColor =
    result.prediction === 1
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";

  return (
    <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">

      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Flight Information
        </h2>

        <p className="mt-1 text-slate-500">
          Operational flight statistics and AI prediction summary.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl border p-5">
          <p className="text-sm text-slate-500">
            Departure
          </p>

          <h3 className="mt-2 font-bold">
            {departure?.name}
          </h3>

          <p className="text-sm text-slate-500">
            {departure?.icao}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-slate-500">
            Destination
          </p>

          <h3 className="mt-2 font-bold">
            {destination?.name}
          </h3>

          <p className="text-sm text-slate-500">
            {destination?.icao}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-slate-500">
            Distance
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {distance} km
          </h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-slate-500">
            Flight Time
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {flightTime}
          </h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-slate-500">
            Estimated Fuel Usage
          </p>

          <h2 className="mt-2 text-2xl font-bold text-blue-700">
            {fuel} kg
          </h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-slate-500">
            Estimated CO₂ Emissions
          </p>

          <h2 className="mt-2 text-2xl font-bold text-emerald-700">
            {co2} kg
          </h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-slate-500">
            Prediction
          </p>

          <span
            className={`mt-3 inline-block rounded-full px-4 py-2 font-semibold ${statusColor}`}
          >
            {result.status}
          </span>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-slate-500">
            Model Confidence
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {confidence}%
          </h2>
        </div>

      </div>

      <div className="mt-6 rounded-xl bg-slate-50 p-6">

        <h3 className="mb-4 text-lg font-bold text-slate-800">
          Flight Summary
        </h3>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              AI Assessment
            </p>

            <p className="mt-2 text-slate-700">
              {result.reason}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Operational Recommendation
            </p>

            <p className="mt-2 text-slate-700">
              {result.recommendation}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default FlightInfo;