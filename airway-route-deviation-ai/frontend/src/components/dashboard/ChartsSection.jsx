import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import ChartCard from "./ChartCard";

const flightTrendData = [
  { day: "Mon", flights: 180 },
  { day: "Tue", flights: 220 },
  { day: "Wed", flights: 260 },
  { day: "Thu", flights: 240 },
  { day: "Fri", flights: 310 },
  { day: "Sat", flights: 290 },
  { day: "Sun", flights: 340 },
];

const deviationData = [
  { name: "Normal", value: 82 },
  { name: "Deviation", value: 18 },
];

const COLORS = ["#2563EB", "#EF4444"];

function ChartsSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartCard title="Flight Trend">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={flightTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="flights"
              stroke="#2563EB"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Deviation Distribution">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={deviationData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {deviationData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

export default ChartsSection;