import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ border: "1px solid black", padding: "10px" }}>
          <h4>Total Investment</h4>
          <p>₹0</p>
        </div>

        <div style={{ border: "1px solid black", padding: "10px" }}>
          <h4>Daily ROI</h4>
          <p>₹0</p>
        </div>

        <div style={{ border: "1px solid black", padding: "10px" }}>
          <h4>Total Level Income</h4>
          <p>₹0</p>
        </div>

        <div style={{ border: "1px solid black", padding: "10px" }}>
          <h4>Wallet Balance</h4>
          <p>₹0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;