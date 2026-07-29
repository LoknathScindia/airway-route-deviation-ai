function StatCard({ title, value, color }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-sm font-medium text-gray-500">
        {title}
      </h3>

      <p className={`mt-3 text-3xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}

function AnalyticsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Total Flights"
        value={stats.totalFlights}
        color="text-blue-600"
      />

      <StatCard
        title="Route Deviations"
        value={stats.deviations}
        color="text-red-600"
      />

      <StatCard
        title="Normal Flights"
        value={stats.normalFlights}
        color="text-green-600"
      />

      <StatCard
        title="Average Confidence"
        value={`${stats.averageConfidence.toFixed(1)}%`}
        color="text-purple-600"
      />

      <StatCard
        title="Reviewed"
        value={stats.reviewed}
        color="text-indigo-600"
      />

      <StatCard
        title="Flagged"
        value={stats.flagged}
        color="text-yellow-600"
      />
    </div>
  );
}

export default AnalyticsCards;