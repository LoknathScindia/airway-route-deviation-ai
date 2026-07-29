function MapLegend() {
  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        Map Legend
      </h3>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        <div className="flex items-center gap-3">
          <div
            className="h-1 w-10 border-t-4 border-dashed border-blue-600"
          />
          <span className="text-sm text-slate-700">
            Planned Flight Route
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="h-1 w-10 rounded bg-green-600"
          />
          <span className="text-sm text-slate-700">
            AI Alternate Route
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl">🛫</span>
          <span className="text-sm text-slate-700">
            Departure Airport
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl">🛬</span>
          <span className="text-sm text-slate-700">
            Destination Airport
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl">✈</span>
          <span className="text-sm text-slate-700">
            AI Recommended Waypoint
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            AI
          </span>

          <span className="text-sm text-slate-700">
            AI Optimised Routing
          </span>
        </div>

      </div>
    </div>
  );
}

export default MapLegend;