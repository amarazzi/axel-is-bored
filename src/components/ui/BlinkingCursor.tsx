"use client";

interface BlinkingCursorProps {
  char?: string;
  className?: string;
}

export function BlinkingCursor({
  char = "▮",
  className = "",
}: BlinkingCursorProps) {
  return (
    <span
      className={`cursor-blink text-terminal-fg ${className}`}
      aria-hidden="true"
    >
      {char}
    </span>
  );
}
