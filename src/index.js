import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App";

import { MusicPlayerProvider } from "./Components/Music/MusicPlayerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MusicPlayerProvider>
      <App />
    </MusicPlayerProvider>
  </React.StrictMode>
);

