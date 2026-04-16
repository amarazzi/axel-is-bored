"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/components/Language/LanguageProvider";

const DISPLAY_MS  = 2400;
const ERASE_MS    = 55;
const TYPE_MS     = 80;
const PAUSE_MS    = 150;

export function TypewriterHeading() {
  const { t } = useLanguage();
  const phrases = t["home.phrases"] as string[];
  const [suffix, setSuffix] = useState(phrases[0]);
  const phrasesRef = useRef(phrases);

  useEffect(() => {
    phrasesRef.current = phrases;
  }, [phrases]);

  useEffect(() => {
    // Respetar preferencia de usuario de movimiento reducido
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout>;
    let phraseIdx = 0;

    const erase = (current: string) => {
      if (current.length === 0) {
        phraseIdx = (phraseIdx + 1) % phrasesRef.current.length;
        timer = setTimeout(() => type(phrasesRef.current[phraseIdx], 0), PAUSE_MS);
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

    timer = setTimeout(() => {
      erase(phrasesRef.current[0]);
    }, DISPLAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <h1 className="text-3xl mb-8 leading-tight t-accent font-light tracking-tight">
      axel {suffix}
      <span aria-hidden className="tw-cursor" />
    </h1>
  );
}
