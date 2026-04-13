"use client";

import { useEffect } from "react";

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        animation: "fadeIn 0.15s ease",
        cursor: "zoom-out",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <button
        onClick={onClose}
        aria-label="cerrar"
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#888",
          fontSize: "1.2rem",
          lineHeight: 1,
          padding: "0.25rem",
        }}
      >
        ✕
      </button>

      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "100%",
          maxHeight: "85vh",
          borderRadius: "12px",
          objectFit: "contain",
          animation: "scaleIn 0.15s ease",
          cursor: "zoom-out",
        }}
      />
    </div>
  );
}
