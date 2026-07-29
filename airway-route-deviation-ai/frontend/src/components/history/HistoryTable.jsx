import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getAirportName } from "@/api/airports";

function HistoryTable({
  predictions,
  airportMap,
  onDelete,
  onEdit,
}) {
  if (!predictions || predictions.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-gray-500">
          No prediction history available.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prediction History</CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Departure</th>
              <th className="p-3 text-left">Destination</th>
              <th className="p-3 text-left">Prediction</th>
              <th className="p-3 text-left">Confidence</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Review</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {predictions.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{item.id}</td>

                <td className="p-3">
                  <div className="font-medium">
                    {getAirportName(
                      item.departure_airport,
                      airportMap
                    )}
                  </div>

                  <div className="text-xs text-gray-500">
                    ({item.departure_airport})
                  </div>
                </td>

                <td className="p-3">
                  <div className="font-medium">
                    {getAirportName(
                      item.destination_airport,
                      airportMap
                    )}
                  </div>

                  <div className="text-xs text-gray-500">
                    ({item.destination_airport})
                  </div>
                </td>

                <td className="p-3">
                  {item.prediction === 1
                    ? "Deviation"
                    : "Normal"}
                </td>

                <td className="p-3">
                  {(item.confidence * 100).toFixed(2)}%
                </td>

                <td className="p-3">{item.status}</td>

                <td className="p-3">
                  {item.review_status}
                </td>

                <td className="p-3">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </td>

                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(item.id)}
                    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export default HistoryTable;