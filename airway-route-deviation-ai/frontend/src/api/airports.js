import api from "./axios";

export async function getAirports() {
  const response = await api.get("/airports");
  return response.data;
}

export function buildAirportMap(airports) {
  const map = {};

  airports.forEach((airport) => {
    map[airport.icao] = airport.name;
  });

  return map;
}

export function getAirportName(code, airportMap) {
  return airportMap[code] || code;
}