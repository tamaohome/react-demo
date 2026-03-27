import { useState, useEffect } from "react";

function CurrentDate() {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("ja-JP");
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayStr = days[now.getDay()];
      setDate(`${dateStr} (${dayStr})`);
    };

    updateDate();
    const timer = setInterval(updateDate, 1000);

    return () => clearInterval(timer);
  }, []);

  return <span>{date}</span>;
}

function CurrentTime() {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString("ja-JP"));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("ja-JP"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <span>{time}</span>;
}

export function MenuBar() {
  return (
    <>
      <div role="presentation" className="h-8"></div>
      <header className="fixed top-0 right-0 left-0 z-50 flex h-8 items-center justify-between bg-black/65 px-4 text-sm shadow backdrop-blur-sm">
        <h1 className="font-semibold">React + Vite + Tailwind CSS Demo</h1>
        <div className="font-mono text-xs text-gray-300">
          <CurrentDate />
          <span className="mx-2">|</span>
          <CurrentTime />
        </div>
      </header>
    </>
  );
}
