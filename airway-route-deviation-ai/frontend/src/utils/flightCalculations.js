// Convert degrees to radians
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// Great-circle distance using Haversine formula
export function calculateDistance(dep, dest) {
  if (!dep || !dest) return 0;

  const R = 6371; // Earth's radius (km)

  const dLat = toRadians(dest.latitude - dep.latitude);
  const dLon = toRadians(dest.longitude - dep.longitude);

  const lat1 = toRadians(dep.latitude);
  const lat2 = toRadians(dest.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c).toFixed(0);
}

// Average commercial aircraft speed ≈ 850 km/h
export function calculateFlightTime(distance) {
  if (!distance) return "0 min";

  const hours = distance / 850;

  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);

  return `${h}h ${m}m`;
}

// Very rough estimate
export function calculateFuel(distance) {
  if (!distance) return 0;

  return (distance * 5).toFixed(0);
}

// Rough estimate
export function calculateCO2(fuel) {
  if (!fuel) return 0;

  return (fuel * 3.16).toFixed(0);
}