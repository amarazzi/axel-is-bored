import Link from "next/link";

interface PostRowProps {
  title: string;
  meta: string;
  description?: string;
  href: string;
  external?: boolean;
}

export function PostRow({ title, meta, description, href, external }: PostRowProps) {
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-8">
        <p className="post-title" style={{ fontSize: "var(--text-base)", fontWeight: 300 }}>
          {title}
        </p>
        <span className="shrink-0 t-muted" style={{ fontSize: "var(--text-xs)", whiteSpace: "nowrap" }}>
          {meta}
        </span>
      </div>
      {description && (
        <p className="t-muted" style={{ fontSize: "var(--text-xs)", fontWeight: 300, lineHeight: 1.6, marginTop: "4px" }}>
          {description}
        </p>
      )}
    </>
  );

  const className = "group block";
  const style = { padding: "1rem 0", borderBottom: "1px solid var(--theme-border)" };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {inner}
    </Link>
  );
}
