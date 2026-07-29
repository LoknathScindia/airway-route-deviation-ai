import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PredictionsTimeline({ predictions }) {
  const timeline = predictions.map((prediction, index) => ({
    name: index + 1,
    confidence: Number((prediction.confidence * 100).toFixed(2)),
  }));

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Prediction Confidence Timeline
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timeline}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="confidence"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PredictionsTimeline;