'use client';

import React from "react";
import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
  current?: boolean;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = items ?? [];

  return (
    <nav
      aria-label="Breadcrumb"
      className="pointer-events-auto text-[11px] md:text-xs text-slate-500"
    >
      <ol className="flex flex-wrap items-center gap-1 md:gap-1.5">
        {trail.map((c, i) => {
          const isLast = c.current ?? i === trail.length - 1;
          const key = `${c.href ?? c.label}-${i}`;

          return (
            <li key={key} className="flex items-center gap-1 md:gap-1.5">
              {i > 0 && <span aria-hidden className="opacity-50">›</span>}

              {!isLast && c.href ? (
                <Link
                  href={c.href}
                  className="hover:underline hover:text-slate-700 transition-colors"
                >
                  {c.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="text-slate-700 font-medium"
                >
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}