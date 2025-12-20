import React from "react";
import Connect from "./Connect";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Connect />

      <Toaster
        position="top-left"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#000",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid #333",
          },
        }}
      />
    </div>
  );
}

export default App;
