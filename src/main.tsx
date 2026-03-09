import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Sample } from "@/components/sample/Sample.tsx";
import { Clock } from "@/components/clock/Clock.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Sample />
    <Clock />
  </StrictMode>,
);
