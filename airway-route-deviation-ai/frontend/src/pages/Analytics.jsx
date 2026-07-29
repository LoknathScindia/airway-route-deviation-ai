import { useEffect, useMemo, useState } from "react";

import { getPredictions } from "@/api/prediction";
import { getAirports, buildAirportMap } from "@/api/airports";

import AnalyticsCards from "@/components/analytics/AnalyticsCards";
import FlightStatusChart from "@/components/analytics/FlightStatusChart";
import PredictionsTimeline from "@/components/analytics/PredictionsTimeline";
import TopAirportsChart from "@/components/analytics/TopAirportsChart";
import ReviewStatus from "@/components/analytics/ReviewStatus";

function Analytics() {
  const [predictions, setPredictions] = useState([]);
  const [airportMap, setAirportMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const [predictionData, airportData] = await Promise.all([
        getPredictions(),
        getAirports(),
      ]);

      setPredictions(predictionData);
      setAirportMap(buildAirportMap(airportData));
    } catch (error) {
      console.error("Failed to load analytics:", error);
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    const totalFlights = predictions.length;

    const deviations = predictions.filter(
      (p) => p.prediction === 1
    ).length;

    const normalFlights = totalFlights - deviations;

    const averageConfidence =
      totalFlights === 0
        ? 0
        : predictions.reduce(
            (sum, p) => sum + p.confidence,
            0
          ) / totalFlights;

    const reviewed = predictions.filter(
      (p) => p.review_status === "Reviewed"
    ).length;

    const flagged = predictions.filter(
      (p) => p.review_status === "Flagged"
    ).length;

    return {
      totalFlights,
      deviations,
      normalFlights,
      averageConfidence: averageConfidence * 100,
      reviewed,
      flagged,
    };
  }, [predictions]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-gray-500">
          Loading analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Flight Analytics
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor flight predictions, deviations and operational
          performance.
        </p>
      </div>

      <AnalyticsCards stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <FlightStatusChart stats={stats} />

        <PredictionsTimeline predictions={predictions} />

        <TopAirportsChart
          predictions={predictions}
          airportMap={airportMap}
        />

        <ReviewStatus predictions={predictions} />
      </div>
    </div>
  );
}

export default Analytics;