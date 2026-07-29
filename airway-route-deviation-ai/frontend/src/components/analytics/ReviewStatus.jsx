import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
];

function ReviewStatus({ predictions }) {
  const counts = {
    Pending: 0,
    Reviewed: 0,
    Flagged: 0,
  };

  predictions.forEach((prediction) => {
    if (counts[prediction.review_status] !== undefined) {
      counts[prediction.review_status]++;
    }
  });

  const data = Object.entries(counts).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Review Status
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ReviewStatus;