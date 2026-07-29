import { useEffect, useMemo, useState } from "react";

import {
  getPredictions,
  updatePrediction,
  deletePrediction,
} from "@/api/prediction";

import {
  getAirports,
  buildAirportMap,
} from "@/api/airports";

import HistoryTable from "@/components/history/HistoryTable";
import HistoryFilters from "@/components/history/HistoryFilters";

function History() {
  const [predictions, setPredictions] = useState([]);
  const [airportMap, setAirportMap] = useState({});
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadPredictions();
    loadAirports();
  }, []);

  async function loadPredictions() {
    try {
      setLoading(true);
      const data = await getPredictions();
      setPredictions(data);
    } catch (error) {
      console.error("Failed to load prediction history:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadAirports() {
    try {
      const airports = await getAirports();
      setAirportMap(buildAirportMap(airports));
    } catch (error) {
      console.error("Failed to load airports:", error);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this prediction?")) return;

    try {
      await deletePrediction(id);

      setPredictions((prev) =>
        prev.filter((prediction) => prediction.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete prediction.");
    }
  }

  async function handleEdit(item) {
    const review_status = prompt(
      "Review Status",
      item.review_status
    );

    if (!review_status) return;

    const notes = prompt(
      "Notes",
      item.notes ?? ""
    );

    try {
      await updatePrediction(item.id, {
        review_status,
        notes,
      });

      setPredictions((prev) =>
        prev.map((prediction) =>
          prediction.id === item.id
            ? {
                ...prediction,
                review_status,
                notes,
              }
            : prediction
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update prediction.");
    }
  }

  const filteredPredictions = useMemo(() => {
    return predictions.filter((prediction) => {
      const matchesSearch =
        prediction.departure_airport
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        prediction.destination_airport
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        prediction.review_status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [predictions, searchTerm, statusFilter]);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-lg">
        Loading prediction history...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Prediction History
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage all previous predictions.
        </p>
      </div>

      <HistoryFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <HistoryTable
        predictions={filteredPredictions}
        airportMap={airportMap}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default History;