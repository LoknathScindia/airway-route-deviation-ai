function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-xl font-semibold text-slate-900">
        {title}
      </h2>

      <div className="h-80">
        {children}
      </div>
    </div>
  );
}

export default ChartCard;