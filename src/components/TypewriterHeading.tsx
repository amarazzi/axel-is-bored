"use client";

import { useState, useEffect } from "react";

const PHRASES = [
  "hace cosas",
  "escribe",
  "vibecodea",
  "diseña",
  "lee",
  "corre",
];

const DISPLAY_MS  = 2400;
const ERASE_MS    = 55;
const TYPE_MS     = 80;
const PAUSE_MS    = 150;

export function TypewriterHeading() {
  const [suffix, setSuffix] = useState(PHRASES[0]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let phraseIdx = 0;

    const erase = (current: string) => {
      if (current.length === 0) {
        phraseIdx = (phraseIdx + 1) % PHRASES.length;
        timer = setTimeout(() => type(PHRASES[phraseIdx], 0), PAUSE_MS);
        return;
      }
      const next = current.slice(0, -1);
      setSuffix(next);
      timer = setTimeout(() => erase(next), ERASE_MS);
    };

    const type = (target: string, pos: number) => {
      const next = target.slice(0, pos + 1);
      setSuffix(next);
      if (pos + 1 >= target.length) {
        timer = setTimeout(() => erase(target), DISPLAY_MS);
        return;
      }
      timer = setTimeout(() => type(target, pos + 1), TYPE_MS);
    };

    // Primer ciclo: mostrar la primera frase, luego arrancar
    timer = setTimeout(() => {
      erase(PHRASES[0]);
    }, DISPLAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes tw-blink {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 0; }
        }
        .tw-cursor {
          display: inline-block;
          width: 1px;
          height: 0.85em;
          background-color: currentColor;
          margin-left: 3px;
          vertical-align: middle;
          animation: tw-blink 1s step-end infinite;
        }
      `}</style>
      <h1 className="text-3xl mb-8 leading-tight t-accent font-light tracking-tight">
        axel {suffix}
        <span aria-hidden className="tw-cursor" />
      </h1>
    </>
  );
}
