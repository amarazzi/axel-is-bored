import { ReactNode } from "react";

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  titleExtra?: ReactNode;
}

export function TerminalWindow({
  title,
  children,
  className = "",
  titleExtra,
}: TerminalWindowProps) {
  return (
    <div className={`border border-terminal-border ${className}`}>
      {/* Title bar */}
      <div className="flex items-center border-b border-terminal-border px-3 py-1.5">
        <span className="text-terminal-dim text-xs mr-1">┌─[</span>
        <span className="text-terminal-fg font-bold text-sm">{title}</span>
        <span className="text-terminal-dim text-xs ml-1">]</span>
        {titleExtra && (
          <span className="ml-auto text-xs text-terminal-dim">{titleExtra}</span>
        )}
      </div>
      {/* Content */}
      <div className="p-4">{children}</div>
    </div>
  );
}
