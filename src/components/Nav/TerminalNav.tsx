import Link from "next/link";

const navLinks = [
  { label: "[HOME]", href: "/", external: false },
  { label: "[GITHUB]", href: "https://github.com/amarazzi", external: true },
];

export function TerminalNav() {
  return (
    <nav className="flex items-center gap-4 text-xs text-terminal-dim mb-6 pb-3 border-b border-terminal-border">
      <span className="text-terminal-fg font-bold tracking-tight">
        AXELISBORED://
      </span>
      {navLinks.map((link) =>
        link.external ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-terminal-fg transition-colors duration-100"
          >
            {link.label}
          </a>
        ) : (
          <Link
            key={link.label}
            href={link.href}
            className="hover:text-terminal-fg transition-colors duration-100"
          >
            {link.label}
          </Link>
        )
      )}
      <span className="ml-auto text-terminal-border">v0.1.0</span>
    </nav>
  );
}
