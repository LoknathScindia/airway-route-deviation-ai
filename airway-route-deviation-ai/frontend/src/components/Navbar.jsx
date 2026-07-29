function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        padding: "18px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Flight</h2>

      <div>
        Dashboard | Prediction | History | Analytics
      </div>
    </nav>
  );
}

export default Navbar;