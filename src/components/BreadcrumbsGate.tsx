'use client';

import { usePathname } from 'next/navigation';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';

// Env-driven labels
const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? 'HomeClient';

// Optional: include breadcrumbs on /assets too
const INCLUDE_ASSETS = true;

// Accept both shapes:
//  A) { "investors": { "title": "Investors", "body": [...] }, ... }
//  B) { "/investors": "Investors", ... }
type PagesJson =
  | Record<string, { title?: string; body?: unknown }>
  | Record<string, string>;

let PAGES: PagesJson = {};
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PAGES = require('@/content/pages.json') as PagesJson;
} catch {
  // No pages.json available — we'll fall back to titleized segments.
}

function titleize(s: string) {
  return s
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .replace(/\bQ(\d)\b/gi, 'Q$1');
}

function getPrettyLabel(seg: string): string {
  // Support keys with and without leading slash
  const k1 = seg.toLowerCase();        // e.g. "investors"
  const k2 = '/' + k1;                 // e.g. "/investors"

  // Shape B: direct string map
  const asString =
    (PAGES as Record<string, string>)[k1] ??
    (PAGES as Record<string, string>)[k2];
  if (typeof asString === 'string') return asString;

  // Shape A: object with title
  const asObj =
    (PAGES as Record<string, { title?: string }>)[k1] ??
    (PAGES as Record<string, { title?: string }>)[k2];
  if (asObj?.title) return asObj.title;

  // Fallback
  return titleize(seg);
}

export default function BreadcrumbsGate() {
  const pathname = usePathname() || '/';

  const show =
    pathname.startsWith('/investors') ||
    pathname.startsWith('/financials') ||
    (INCLUDE_ASSETS && pathname.startsWith('/assets'));

  if (!show) return null;

  const parts = pathname.split('/').filter(Boolean);

  const items: Crumb[] = [
    { href: '/', label: HOME_LABEL },
    ...parts.map((seg, i) => {
      const href = '/' + parts.slice(0, i + 1).join('/');
      const label = getPrettyLabel(seg);
      const current = i === parts.length - 1;
      return { href, label, current };
    }),
  ];

  return <Breadcrumbs items={items} />;
}