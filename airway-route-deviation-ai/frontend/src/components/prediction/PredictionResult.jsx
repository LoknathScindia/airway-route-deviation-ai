function PredictionResult({ result }) {
  if (!result) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-slate-800">
          AI Flight Prediction Report
        </h2>

        <p className="mt-4 text-slate-500">
          Submit a flight to generate an AI-powered operational analysis.
        </p>
      </div>
    );
  }

  const confidence = (result.confidence * 100).toFixed(2);

  const riskColor =
    result.risk_level === "High"
      ? "bg-red-100 text-red-700"
      : result.risk_level === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  const statusColor =
    result.prediction === 1
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";

  return (
    <div className="rounded-2xl bg-white shadow-xl">

      {/* Header */}

      <div className="rounded-t-2xl bg-slate-800 p-8 text-white">
        <h2 className="text-3xl font-bold">
          ✈ AI Flight Prediction Report
        </h2>

        <p className="mt-2 text-slate-300">
          AI-generated operational analysis for the selected flight.
        </p>
      </div>

      <div className="space-y-8 p-8">

        {/* Airports */}

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-xl border p-5">
            <p className="text-sm text-slate-500">
              Departure Airport
            </p>

            <h3 className="mt-2 text-lg font-bold">
              {result.departure_airport.name}
            </h3>

            <p className="text-slate-500">
              {result.departure_airport.icao}
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-slate-500">
              Destination Airport
            </p>

            <h3 className="mt-2 text-lg font-bold">
              {result.destination_airport.name}
            </h3>

            <p className="text-slate-500">
              {result.destination_airport.icao}
            </p>
          </div>

        </div>

        {/* Prediction Summary */}

        <div className="grid gap-6 md:grid-cols-3">

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
              Confidence
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {confidence}%
            </h2>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">

              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${confidence}%`,
                }}
              />

            </div>

          </div>

          <div className="rounded-xl border p-5">

            <p className="text-sm text-slate-500">
              Risk Level
            </p>

            <span
              className={`mt-3 inline-block rounded-full px-4 py-2 font-semibold ${riskColor}`}
            >
              {result.risk_level}
            </span>

          </div>

        </div>

        {/* AI Analysis */}

        <div className="rounded-xl border bg-slate-50 p-6">

          <h3 className="mb-4 text-xl font-bold">
            AI Analysis
          </h3>

          <div className="space-y-5">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Reason
              </p>

              <p className="mt-1 text-slate-700">
                {result.reason}
              </p>

            </div>

            <div>

              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Recommendation
              </p>

              <p className="mt-1 text-slate-700">
                {result.recommendation}
              </p>

            </div>

          </div>

        </div>

        {/* Environmental Impact */}

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-xl bg-blue-50 p-6">

            <p className="text-sm text-slate-500">
              Estimated Fuel Saving
            </p>

            <h2 className="mt-3 text-3xl font-bold text-blue-700">
              {result.fuel_saving} kg
            </h2>

          </div>

          <div className="rounded-xl bg-emerald-50 p-6">

            <p className="text-sm text-slate-500">
              Estimated CO₂ Reduction
            </p>

            <h2 className="mt-3 text-3xl font-bold text-emerald-700">
              {result.co2_reduction} kg
            </h2>

          </div>

        </div>

        {/* Alternate Route */}

        {result.alternate_route && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">

            <h3 className="mb-4 text-xl font-bold text-blue-800">
              Recommended Alternate Route
            </h3>

            <div className="space-y-3">

              {result.alternate_route.route?.map(
                (airport, index) => (
                  <div
                    key={airport.icao}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-semibold">
                        {airport.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {airport.icao}
                      </p>
                    </div>
                  </div>
                )
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default PredictionResult;