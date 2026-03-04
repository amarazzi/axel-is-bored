import Image from "next/image";

interface ProjectScreenshotProps {
  src: string;
  alt: string;
  projectName: string;
}

export function ProjectScreenshot({ src, alt, projectName }: ProjectScreenshotProps) {
  return (
    <div className="my-4">
      {/* Monitor frame — top bar */}
      <div className="border border-terminal-border border-b-0 px-2 py-1 flex justify-between items-center text-xs text-terminal-dim">
        <span>{"┌ PREVIEW"}</span>
        <span>{`[ ${projectName.toUpperCase()} ]`}</span>
        <span>{"[×]"}</span>
      </div>

      {/* Screenshot with scanline overlay */}
      <div className="scanlines border border-terminal-border overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={450}
          className="w-full h-auto grayscale-[15%] opacity-90 hover:opacity-100 transition-opacity duration-200"
        />
      </div>

      {/* Monitor frame — bottom bar */}
      <div className="border border-terminal-border border-t-0 px-2 py-0.5 text-xs text-terminal-border">
        {`└─ screenshot`}
      </div>
    </div>
  );
}

/* ASCII placeholder shown when no screenshot is available */
export function ProjectScreenshotPlaceholder({ projectName }: { projectName: string }) {
  return (
    <div className="my-4 border border-terminal-border p-4 text-center text-terminal-border text-xs">
      <pre className="leading-tight">{`
  ┌─────────────────────────────────┐
  │                                 │
  │   [ NO SCREENSHOT AVAILABLE ]   │
  │   ${projectName.toUpperCase().padEnd(31, " ")}│
  │                                 │
  └─────────────────────────────────┘
      `.trim()}</pre>
    </div>
  );
}
