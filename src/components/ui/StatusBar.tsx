"use client";

import { useEffect, useState } from "react";

export function StatusBar() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toISOString().replace("T", " ").slice(0, 19) + " UTC");
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mt-16 pt-2 border-t border-terminal-border">
      <div className="flex flex-wrap justify-between gap-2 text-xs text-terminal-border">
        <span>{"─── AXELISBORED TERMINAL v0.1 ───"}</span>
        <span className="text-terminal-dim">{time}</span>
        <span>{"[ CONNECTED ]"}</span>
      </div>
    </footer>
  );
}
