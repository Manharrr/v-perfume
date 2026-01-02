import React from "react";
import Connect from "./connect";
import { Toaster } from "react-hot-toast";
import Adminconnect from "./adminconnect";

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
