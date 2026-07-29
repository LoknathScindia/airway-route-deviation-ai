import { useEffect, useMemo, useState } from "react";

function AirportSelect({
  label,
  airports,
  value,
  onChange,
}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (value && typeof value === "object") {
      setSearch(`${value.name} (${value.icao})`);
    }
  }, [value]);

  const filteredAirports = useMemo(() => {
    if (!search) return airports.slice(0, 20);

    return airports
      .filter((airport) => {
        const text = `${airport.name} ${airport.icao}`.toLowerCase();

        return text.includes(search.toLowerCase());
      })
      .slice(0, 20);
  }, [airports, search]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type="text"
        placeholder="Search airport..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
      />

      <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-300 bg-white">
        {filteredAirports.map((airport) => (
          <button
            type="button"
            key={airport.icao}
            onClick={() => {
              onChange(airport);
              setSearch(`${airport.name} (${airport.icao})`);
            }}
            className={`flex w-full flex-col items-start px-4 py-3 text-left hover:bg-blue-50 ${
              value?.icao === airport.icao
                ? "bg-blue-100"
                : ""
            }`}
          >
            <span className="font-medium">
              {airport.name}
            </span>

            <span className="text-sm text-slate-500">
              {airport.icao}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AirportSelect;