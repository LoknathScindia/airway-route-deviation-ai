import api from "./axios";

/**
 * Create a new prediction
 */
export const createPrediction = async (predictionData) => {
  const response = await api.post("/predict", predictionData);
  return response.data;
};

/**
 * Get prediction history
 */
export const getPredictions = async () => {
  const response = await api.get("/predictions");
  return response.data;
};

/**
 * Update prediction review
 */
export const updatePrediction = async (id, data) => {
  const response = await api.put(`/predictions/${id}`, data);
  return response.data;
};

/**
 * Delete prediction
 */
export const deletePrediction = async (id) => {
  const response = await api.delete(`/predictions/${id}`);
  return response.data;
};

/**
 * Live aircraft prediction
 */
export const predictRouteDeviation = async (flightData) => {
  const response = await api.post("/predict/live", {
    longitude: flightData.longitude,
    latitude: flightData.latitude,
    velocity: flightData.velocity,
    true_track: flightData.true_track,
    vertical_rate: flightData.vertical_rate,
    baro_altitude: flightData.baro_altitude,
    geo_altitude: flightData.geo_altitude,
  });

  return response.data;
};