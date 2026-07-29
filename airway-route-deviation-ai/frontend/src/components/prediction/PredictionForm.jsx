import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { predictionSchema } from "@/validation/predictionSchema";
import { createPrediction } from "@/api/prediction";

import AirportSelect from "@/components/prediction/AirportSelect";
import { useAirports } from "@/hooks/useAirports";

function PredictionForm({ onPrediction }) {
  const [loading, setLoading] = useState(false);

  const { airports, loading: airportsLoading } = useAirports();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      departure_airport: null,
      destination_airport: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        ...data,
        departure_airport: data.departure_airport.icao,
        destination_airport: data.destination_airport.icao,
      };

      const result = await createPrediction(payload);

      onPrediction({
        ...result,
        departure_airport: data.departure_airport,
        destination_airport: data.destination_airport,
      });

      reset();
    } catch (error) {
      console.error(error);
      alert("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "longitude", label: "Longitude", type: "number" },
    { name: "latitude", label: "Latitude", type: "number" },
    { name: "velocity", label: "Velocity", type: "number" },
    { name: "true_track", label: "True Track", type: "number" },
    { name: "vertical_rate", label: "Vertical Rate", type: "number" },
    { name: "baro_altitude", label: "Barometric Altitude", type: "number" },
    { name: "geo_altitude", label: "Geometric Altitude", type: "number" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl bg-white p-8 shadow-lg"
    >
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div>
          <Controller
            name="departure_airport"
            control={control}
            render={({ field }) => (
              <AirportSelect
                label="Departure Airport"
                airports={airports}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {errors.departure_airport && (
            <p className="mt-1 text-sm text-red-500">
              {errors.departure_airport.message}
            </p>
          )}
        </div>

        <div>
          <Controller
            name="destination_airport"
            control={control}
            render={({ field }) => (
              <AirportSelect
                label="Destination Airport"
                airports={airports}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {errors.destination_airport && (
            <p className="mt-1 text-sm text-red-500">
              {errors.destination_airport.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              {field.label}
            </label>

            <input
              type={field.type}
              step={field.type === "number" ? "any" : undefined}
              {...register(field.name, {
                valueAsNumber: field.type === "number",
              })}
              className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
            />

            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-500">
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading || airportsLoading}
        className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {airportsLoading
          ? "Loading Airports..."
          : loading
          ? "Predicting..."
          : "Predict Flight"}
      </button>
    </form>
  );
}

export default PredictionForm;