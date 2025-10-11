'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useScrolled from '@/hooks/useScrolled';

// Env-driven labels
const SITE_NAME  = process.env.NEXT_PUBLIC_SITE_NAME  ?? 'BlueNord Client';
const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? 'HomeClient';

type MenuItem = { href: string; label: string };
type MenuGroup = { key: string; label: string; href: string; items?: MenuItem[] };

const MENU: MenuGroup[] = [
  { key: 'home', label: HOME_LABEL, href: '/' },
  {
    key: 'company',
    label: 'Company',
    href: '/company',
    items: [
      { href: '/company', label: 'At a glance' },
      { href: '/company/governance', label: 'Governance' },
      { href: '/company/people-culture', label: 'People & Culture' },
      { href: '/company/operational-excellence', label: 'Operational Excellence' },
    ],
  },
  {
    key: 'assets',
    label: 'Assets',
    href: '/assets/tyra',
    items: [
      { href: '/assets/tyra', label: 'Tyra' },
      { href: '/assets/halfdan', label: 'Halfdan' },
      { href: '/assets/dan', label: 'Dan' },
      { href: '/assets/gorm', label: 'Gorm' },
    ],
  },
  {
    key: 'investors',
    label: 'Investors',
    href: '/investors',
    items: [
      { href: '/investors', label: 'Overview' },
      { href: '/investors/reports', label: 'Reports' },
      { href: '/investors/presentations', label: 'Presentations' },
      { href: '/investors/financial-calendar', label: 'Financial Calendar' },
      { href: '/investors/share', label: 'Share' },
      { href: '/investors/debt', label: 'Debt' },
      { href: '/investors/news', label: 'News' },
      { href: '/investors/contacts', label: 'Contacts' },
    ],
  },
  {
    key: 'financials',
    label: 'Financials',
    href: '/financials',
    items: [
      { href: '/financials', label: 'Key metrics' },
      { href: '/financials/q3-2025', label: 'Q3 2025' },
      { href: '/financials/q2-2025', label: 'Q2 2025' },
    ],
  },
];

export default function TopNav() {
  const pathname = usePathname() || '/';
  const [openKey, setOpenKey] = useState<string | null>(null);
  const scrolled = useScrolled(8);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  // Header frame
  const headerFrame = scrolled
    ? 'bg-nav-bg backdrop-blur-md shadow-sm'
    : 'bg-transparent';

  // Link classes
  const baseLink = 'rounded-xl px-3 py-1 transition-colors border';
  const linkIdleBefore   = 'text-brand-deep bg-brand-light/30 border-brand-light/60 hover:bg-brand-light/40';
  const linkActiveBefore = 'text-brand-deep bg-white/85 border-brand-light/60';
  const linkIdleAfter    = 'text-white hover:text-brand-light hover:bg-white/10 border-transparent';
  const linkActiveAfter  = 'text-brand-light bg-white/10 border-transparent';

  const linkClass = (active: boolean) =>
    [
      baseLink,
      scrolled
        ? (active ? linkActiveAfter : linkIdleAfter)
        : (active ? linkActiveBefore : linkIdleBefore),
    ].join(' ');

  // Open/close helpers (with a tiny delay on close to prevent flicker)
  const openMenu = (key: string) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setOpenKey(key);
  };
  const closeMenuSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenKey(null), 120);
  };

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenKey(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header role="banner" className={`fixed inset-x-0 top-0 z-50 transition-colors ${headerFrame}`}>
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
        {/* Brand logo with adaptive background */}
        <Link href="/" aria-label={SITE_NAME} className="flex items-center">
          <div
            className={[
              "flex items-center rounded-xl px-2.5 py-1.5 transition-colors",
              scrolled
                ? "bg-transparent border border-transparent"
                : "bg-brand-deep/95 border border-white/10 shadow-sm",
            ].join(" ")}
          >
            <Image
              src="/images/nordblue-2-1.png"
              alt="BlueNord"
              width={120}
              height={32}
              priority
              className="h-6 w-auto"
            />
          </div>
          <span className="sr-only">{SITE_NAME}</span>
        </Link>

        {/* Primary nav */}
        <nav className="relative ml-auto flex items-center gap-2 text-sm">
          {MENU.map((m) => {
            const active = isActive(m.href);
            const hasDropdown = (m.items?.length ?? 0) > 0;

            if (!hasDropdown) {
              return (
                <Link
                  key={m.key}
                  href={m.href}
                  aria-current={active ? 'page' : undefined}
                  className={linkClass(active)}
                >
                  {m.label}
                </Link>
              );
            }

            return (
              <div
                key={m.key}
                className="relative group"
                onMouseEnter={() => openMenu(m.key)}
                onMouseLeave={closeMenuSoon}
                onFocus={() => openMenu(m.key)} // keyboard focus
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenKey(null);
                }}
              >
                <Link
                  href={m.href}
                  aria-expanded={openKey === m.key}
                  aria-haspopup="menu"
                  aria-current={active ? 'page' : undefined}
                  className={linkClass(active)}
                >
                  {m.label}
                </Link>

                {/* Invisible hover bridge to prevent flicker */}
                <div className="pointer-events-none absolute left-0 top-full h-2 w-64" />

                {/* Dropdown panel */}
                {openKey === m.key && (
                  <div
                    role="menu"
                    onMouseEnter={() => openMenu(m.key)} // keep open when moving into panel
                    onMouseLeave={closeMenuSoon}
                    className="pointer-events-auto absolute left-0 top-[calc(100%+8px)] z-50 w-64 rounded-xl border bg-white/95 p-2 shadow-lg backdrop-blur-sm"
                  >
                    {m.items!.map((a) => {
                      const itemActive = isActive(a.href);
                      return (
                        <Link
                          key={a.href}
                          href={a.href}
                          role="menuitem"
                          className={[
                            'block rounded-lg px-3 py-1.5 transition-colors',
                            itemActive ? 'bg-brand-50 text-brand-800' : 'text-slate-700 hover:bg-slate-50',
                          ].join(' ')}
                          onClick={() => setOpenKey(null)} // close after click
                        >
                          {a.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}