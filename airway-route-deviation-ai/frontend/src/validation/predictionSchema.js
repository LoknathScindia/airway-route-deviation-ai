import { z } from "zod";

const airportSchema = z
  .object({
    icao: z.string().min(4, "Invalid ICAO code"),
    name: z.string().min(1, "Airport name is required"),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })
  .passthrough();

export const predictionSchema = z.object({
  departure_airport: airportSchema,
  destination_airport: airportSchema,

  longitude: z.coerce.number(),
  latitude: z.coerce.number(),
  velocity: z.coerce.number().min(0),
  true_track: z.coerce.number().min(0).max(360),
  vertical_rate: z.coerce.number(),
  baro_altitude: z.coerce.number(),
  geo_altitude: z.coerce.number(),
});