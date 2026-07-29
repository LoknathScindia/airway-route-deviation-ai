import axios from "./auth";

export const getLiveFlights = async () => {
  const response = await axios.get("/live-flights");
  return response.data;
};