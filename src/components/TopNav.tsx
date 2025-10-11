'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// Env-driven labels (set in .env.local or Vercel)
const SITE_NAME  = process.env.NEXT_PUBLIC_SITE_NAME  ?? 'BlueNord Client';
const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? 'HomeClient';

type MenuItem = { href: string; label: string };
type MenuGroup = {
  key: string;
  label: string;
  href: string;          // landing page when the heading itself is clicked
  items?: MenuItem[];    // presence => dropdown
};

// Central menu config — edit labels/links here
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
  const pathname = usePathname();
  const [openKey, setOpenKey] = useState<string | null>(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-6 px-4">
        {/* Brand */}
        <Link href="/" className="text-sm font-semibold tracking-tight" aria-label={SITE_NAME}>
          {SITE_NAME}
        </Link>

        {/* Primary nav */}
        <nav className="relative flex items-center gap-4 text-sm">
          {MENU.map((m) => {
            const active = isActive(m.href);
            const hasDropdown = (m.items?.length ?? 0) > 0;

            if (!hasDropdown) {
              return (
                <Link
                  key={m.key}
                  href={m.href}
                  aria-current={active ? 'page' : undefined}
                  className={active ? 'font-medium text-gray-900' : 'text-gray-600 hover:text-gray-900'}
                >
                  {m.label}
                </Link>
              );
            }

            return (
              <div
                key={m.key}
                className="relative group pt-2" // pt-2 + hover bridge prevents flicker
                onMouseEnter={() => setOpenKey(m.key)}
                onMouseLeave={() => setOpenKey((k) => (k === m.key ? null : k))}
                onFocus={() => setOpenKey(m.key)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenKey(null);
                }}
              >
                <Link
                  href={m.href}
                  aria-expanded={openKey === m.key}
                  aria-haspopup="menu"
                  aria-current={active ? 'page' : undefined}
                  className={active ? 'font-medium text-gray-900' : 'text-gray-600 hover:text-gray-900'}
                >
                  {m.label}
                </Link>

                {/* Invisible hover bridge */}
                <div className="absolute left-0 top-full h-2 w-56" />

                {/* Dropdown */}
                {openKey === m.key && (
                  <div
                    role="menu"
                    className="absolute left-0 top-[calc(100%+8px)] z-30 w-56 rounded-xl border bg-white p-2 shadow
                               group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                  >
                    {m.items!.map((a) => {
                      const itemActive = isActive(a.href);
                      return (
                        <Link
                          key={a.href}
                          href={a.href}
                          className={`block rounded-lg px-3 py-1.5 ${
                            itemActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          role="menuitem"
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