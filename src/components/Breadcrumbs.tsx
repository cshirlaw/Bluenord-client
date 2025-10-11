'use client';

import Link from 'next/link';

export type Crumb = { href: string; label: string; current?: boolean };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-white">
      <ol className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2 text-sm text-gray-600">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-300">/</span>}
              {isLast ? (
                <span className="text-gray-900">{c.label}</span>
              ) : (
                <Link
                  href={c.href}
                  className="hover:text-gray-900"
                  aria-current={c.current ? 'page' : undefined}
                >
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}