'use client';

import { usePathname } from 'next/navigation';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';
import useScrolled from '@/hooks/useScrolled';

// Env-driven labels
const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? 'HomeClient';

// Optional: include breadcrumbs on /assets too
const INCLUDE_ASSETS = true;

type PagesJson =
  | Record<string, { title?: string; body?: unknown }>
  | Record<string, string>;

let PAGES: PagesJson = {};
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PAGES = require('@/content/pages.json');
} catch {}

function titleize(s: string) {
  return s.replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, (m) => m.toUpperCase())
          .replace(/\bQ(\d)\b/gi, 'Q$1');
}

function getPrettyLabel(seg: string): string {
  const k1 = seg.toLowerCase();
  const k2 = '/' + k1;
  const asString =
    (PAGES as Record<string, string>)[k1] ??
    (PAGES as Record<string, string>)[k2];
  if (typeof asString === 'string') return asString;

  const asObj =
    (PAGES as Record<string, { title?: string }>)[k1] ??
    (PAGES as Record<string, { title?: string }>)[k2];
  if (asObj?.title) return asObj.title;

  return titleize(seg);
}

export default function BreadcrumbsGate() {
  const pathname = usePathname() || '/';
  const scrolled = useScrolled(8);

  const show =
    pathname.startsWith('/investors') ||
    pathname.startsWith('/financials') ||
    (INCLUDE_ASSETS && pathname.startsWith('/assets')) ||
    pathname.startsWith('/company');

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

  // “Logo notch”: before scroll the logo pill sits top-left, so add left padding.
  const notchLeft = scrolled ? '' : 'pl-[140px] sm:pl-[160px]';

  return (
  <div className={`${notchLeft} relative z-[60] pointer-events-auto`}>
    <Breadcrumbs items={items} />
  </div>
);
}