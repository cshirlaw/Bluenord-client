import React from "react";

export type Crumb = {
  label: string;
  href?: string;        // <-- make optional
  current?: boolean;    // optional flag; if true, render as current page
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = items ?? [];

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap gap-2 text-muted-foreground">
        {trail.map((c, i) => {
          const isLast = c.current ?? i === trail.length - 1;
          const content =
            c.href && !isLast ? (
              <a href={c.href} className="hover:underline">
                {c.label}
              </a>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={isLast ? "text-foreground" : ""}
              >
                {c.label}
              </span>
            );

          return (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span className="opacity-60">/</span>}
              {content}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}