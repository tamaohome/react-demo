import React, { useState, useEffect } from "react";
import "@/styles/widget.css";
import "@/components/clock/Clock.css";
import { Icon } from "@/components/ui/icon";

export const Clock: React.FC = () => {
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
      <h2>
        <Icon name="Clock" /> Clock
      </h2>
      <p className="clock-label">
        {getRegion()} ({getUTCOffset()})
      </p>
      <div className="clock-display">{time}</div>
    </div>
  );
};
