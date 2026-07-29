import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TopAirportsChart({ predictions, airportMap }) {
  const airportCounts = {};

  predictions.forEach((flight) => {
    airportCounts[flight.departure_airport] =
      (airportCounts[flight.departure_airport] || 0) + 1;

    airportCounts[flight.destination_airport] =
      (airportCounts[flight.destination_airport] || 0) + 1;
  });

  const data = Object.entries(airportCounts)
    .map(([airportCode, flights]) => ({
      airport: airportMap?.[airportCode] || airportCode,
      flights,
    }))
    .sort((a, b) => b.flights - a.flights)
    .slice(0, 5);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Top Airports
      </h2>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 30,
              left: 120,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              allowDecimals={false}
            />

            <YAxis
              type="category"
              dataKey="airport"
              width={180}
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Bar
              dataKey="flights"
              fill="#2563eb"
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TopAirportsChart;