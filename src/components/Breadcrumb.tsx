"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Crumb = {
  label: string;
  href?: string;
  current?: boolean;
};

const LABELS: Record<string, string> = {
  company: "Company",
  assets: "Assets",
  investors: "Investors",
  contact: "Contact",
};

export default function Breadcrumbs({
  items,
  trail, // legacy prop name we still support
}: {
  items?: readonly Crumb[];
  trail?: readonly Crumb[];
}) {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);

  // Auto-generate if nothing is provided
  const autoTrail: Crumb[] = [
    { href: "/", label: "Home" },
    ...parts.map((seg, i) => {
      const href = "/" + parts.slice(0, i + 1).join("/");
      const label = LABELS[seg] || seg.replace(/-/g, " ");
      const isLast = i === parts.length - 1;
      return { href: isLast ? undefined : href, label, current: isLast };
    }),
  ];

  const crumbs: readonly Crumb[] = items ?? trail ?? autoTrail;

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((c, i) => {
          const isLast = c.current ?? i === crumbs.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1">
              {!isLast && c.href ? (
                <Link
                  href={c.href}
                  className="hover:text-black underline underline-offset-4"
                >
                  {c.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-gray-700 font-medium" : "text-gray-500"}
                >
                  {c.label}
                </span>
              )}
              {!isLast && <span className="text-gray-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}