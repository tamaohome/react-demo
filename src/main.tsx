import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/sample/Sample.tsx";
import Clock from "./components/clock/Clock.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Clock />
  </StrictMode>,
);
