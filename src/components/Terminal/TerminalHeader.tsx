import { TypewriterText } from "./TypewriterText";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";

export function TerminalHeader() {
  return (
    <header className="mb-10">
      {/* ASCII Banner — desktop */}
      <pre
        className="text-terminal-fg text-xs leading-tight hidden sm:block overflow-x-auto select-none"
        aria-label="AXELISBORED"
      >
{`
 █████╗ ██╗  ██╗███████╗██╗     ██╗███████╗    ██████╗  ██████╗ ██████╗ ███████╗██████╗
██╔══██╗╚██╗██╔╝██╔════╝██║     ██║██╔════╝    ██╔══██╗██╔═══██╗██╔══██╗██╔════╝██╔══██╗
███████║ ╚███╔╝ █████╗  ██║     ██║███████╗    ██████╔╝██║   ██║██████╔╝█████╗  ██║  ██║
██╔══██║ ██╔██╗ ██╔══╝  ██║     ██║╚════██║    ██╔══██╗██║   ██║██╔══██╗██╔══╝  ██║  ██║
██║  ██║██╔╝ ██╗███████╗███████╗██║███████║    ██████╔╝╚██████╔╝██║  ██║███████╗██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚══════╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
`.trim()}
      </pre>

      {/* Mobile fallback */}
      <div className="sm:hidden border border-terminal-border p-4">
        <p className="text-sm font-bold text-terminal-fg">
          ┌─ AXELISBORED ─────────┐
        </p>
        <p className="text-sm text-terminal-dim">
          │  IS BORED             │
        </p>
        <p className="text-sm font-bold text-terminal-fg">
          └───────────────────────┘
        </p>
      </div>

      {/* Subtitle with typewriter */}
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className="text-terminal-border">{">"}</span>
        <TypewriterText
          text="// personal project showcase :: vibe-coded apps"
          className="text-terminal-dim"
        />
        <BlinkingCursor />
      </div>

      {/* Separator */}
      <div className="mt-5 text-terminal-border text-xs overflow-hidden whitespace-nowrap">
        {"─".repeat(80)}
      </div>
    </header>
  );
}
