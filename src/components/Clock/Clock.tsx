import React, { useState, useEffect } from "react";
import { Window } from "@/components/ui/Window";
import { TitleBar } from "@/components/ui/TitleBar";

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
    <Window>
      <TitleBar icon="Clock">Clock</TitleBar>
      <p className="text-sm text-gray-600 tracking-widest text-center">
        {getRegion()} ({getUTCOffset()})
      </p>
      <div className="text-6xl font-mono tracking-wider mt-3 mb-4 text-center [text-shadow:3px_3px_0px_rgba(0,0,0,0.1)]">
        {time}
      </div>
    </Window>
  );
};
