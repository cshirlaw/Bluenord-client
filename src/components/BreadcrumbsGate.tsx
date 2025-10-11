'use client';

import { usePathname } from 'next/navigation';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';

// Env-driven labels
const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? 'HomeClient';

// Optional: include breadcrumbs on /assets too
const INCLUDE_ASSETS = true;

// Optional: load pretty names from content map (fallbacks applied if missing)
let PAGE_LABELS: Record<string, string> = {};
try {
  // If your tsconfig has "resolveJsonModule": true, this import works:
  // @ts-expect-error - allow json import if TS isn't configured
  PAGE_LABELS = require('@/src/content/pages.json');
} catch {}

function titleize(s: string) {
  return s
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .replace(/\bQ(\d)\b/gi, 'Q$1');
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
      const key = '/' + seg.toLowerCase();
      const label = PAGE_LABELS[key] || titleize(seg);
      const current = i === parts.length - 1;
      return { href, label, current };
    }),
  ];

  return <Breadcrumbs items={items} />;
}