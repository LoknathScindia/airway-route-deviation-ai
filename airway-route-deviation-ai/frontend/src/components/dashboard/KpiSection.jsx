import {
  Plane,
  AlertTriangle,
  Activity,
  Fuel,
} from "lucide-react";

import KpiCard from "./KpiCard";

function KpiSection({ stats }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        title="Flights Analysed"
        value={stats.total_predictions}
        subtitle="Predictions processed"
        icon={Plane}
        color="bg-blue-600"
      />

      <KpiCard
        title="Route Deviations"
        value={stats.route_deviations}
        subtitle="Potential deviations detected"
        icon={AlertTriangle}
        color="bg-red-500"
      />

      <KpiCard
        title="Normal Flights"
        value={stats.normal_flights}
        subtitle="Flights operating normally"
        icon={Activity}
        color="bg-emerald-500"
      />

      <KpiCard
        title="Average Confidence"
        value={`${Number(stats.average_confidence).toFixed(2)}%`}
        subtitle="Model confidence"
        icon={Fuel}
        color="bg-amber-500"
      />
    </div>
  );
}

export default KpiSection;