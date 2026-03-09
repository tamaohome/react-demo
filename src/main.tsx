import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Sample } from "@/components/Sample";
import { Clock } from "@/components/Clock";
import { Calculator } from "@/components/Calculator";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Sample />
    <Clock />
    <Calculator />
  </StrictMode>,
);
