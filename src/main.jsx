import React from "react";
import ReactDOM from "react-dom/client";
// Global styles first, so component styles can override them.
import "./styles/tokens.css";
import "./styles/base.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// A note for anyone who opens the dev tools.
console.log(
  "%cYou opened the drawings.%c\nThis site is open source: https://github.com/jbear05/react-portfolio",
  "font: 700 14px/1.6 'IBM Plex Mono', monospace; color: #ff5a1f;",
  "font: 12px/1.6 'IBM Plex Mono', monospace;"
);
