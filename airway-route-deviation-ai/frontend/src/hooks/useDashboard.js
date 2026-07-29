import { useEffect, useState } from "react";
import { getDashboardStats } from "@/api/dashboard";

export function useDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return { stats, loading, error };
}