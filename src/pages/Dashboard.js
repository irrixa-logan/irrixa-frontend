import React from "react";
import { useAuth } from "../AuthContext";

const mockData = [
  {
    block: "D2_Bay_1",
    irrigation_mm: 1.3,
    irrigation_minutes: 5.9,
    kc: 0.715,
    ndvi: 0.571,
    eto: 1.82,
  },
  {
    block: "D2_Bay_10",
    irrigation_mm: 1.81,
    irrigation_minutes: 9.2,
    kc: 0.993,
    ndvi: 0.794,
    eto: 1.82,
  },
];

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Irrixa Dashboard</h1>
        <div className="flex gap-4 items-center">
          <span className="text-gray-700">{user?.email}</span>
          <button
            onClick={logout}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {mockData.map((block, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="font-semibold text-lg mb-2">{block.block}</h2>
            <p>💧 {block.irrigation_mm} mm ({block.irrigation_minutes} min)</p>
            <p>🌿 NDVI: {block.ndvi}</p>
            <p>📈 Kc: {block.kc}</p>
            <p>☀️ ETo: {block.eto} mm</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

