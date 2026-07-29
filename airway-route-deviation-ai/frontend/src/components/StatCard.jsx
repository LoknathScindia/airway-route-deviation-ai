function StatCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        borderLeft: `6px solid ${color}`,
      }}
    >
      <h3 style={{ margin: 0, color: "#6b7280", fontSize: "16px" }}>
        {title}
      </h3>

      <h1 style={{ marginTop: "10px", color: "#0f172a" }}>
        {value}
      </h1>
    </div>
  );
}

export default StatCard;