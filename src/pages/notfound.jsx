import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6"> This perfume page doesn’t exist</p>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Go to Home
      </button>
    </div>
  );
}
