import { useState, useEffect } from "react";
import "@/styles/widget.css";
import "./Clock.css";

function Clock() {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getRegion = () => {
    const timezone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    const region = timezone.split("/")[1]?.replace(/_/g, " ") || timezone;
    return region;
  };

  const getUTCOffset = () => {
    const now = new Date();
    const offset = -now.getTimezoneOffset() / 60;
    const sign = offset >= 0 ? "+" : "";
    return `UTC${sign}${Math.round(offset)}`;
  };

  return (
    <div className="widget clock">
      <h2>Clock</h2>
      <p className="clock-label">
        {getRegion()} ({getUTCOffset()})
      </p>
      <div className="clock-display">{time}</div>
    </div>
  );
}

export default Clock;
