import { useEffect, useState } from "react";
import { getAirports } from "@/api/airports";

export function useAirports() {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAirports() {
      try {
        const data = await getAirports();
        setAirports(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadAirports();
  }, []);

  return { airports, loading };
}