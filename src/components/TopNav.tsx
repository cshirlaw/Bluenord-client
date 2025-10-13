'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useScrolled from '@/hooks/useScrolled';

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
    href: '/assets', // ← fixed: go to assets landing
    items: [
      { href: '/assets', label: 'At a glance' }, // ← added landing link
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
      { href: '/investors/presentations', label: 'Presentations' }, // normalized below
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

const normalizeHref = (item: { href: string; label: string }) =>
  item.label === 'Presentations' ? '/financials' : item.href;

export default function TopNav() {
  const pathname = usePathname() || '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const scrolled = useScrolled(8);

  const isActiveTop = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  const headerFrame = scrolled
    ? 'bg-nav-bg backdrop-blur-md shadow-sm'
    : 'bg-transparent';

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

  // Lock body scroll when mobile panel open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  return (
    <header role="banner" className={`fixed inset-x-0 top-0 z-50 isolate transition-colors ${headerFrame}`}>
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
        {/* Brand */}
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

        {/* Desktop nav (CSS hover dropdowns) */}
        <nav className="relative ml-auto hidden items-center gap-2 text-sm md:flex">
          {MENU.map((m) => {
            const activeTop = isActiveTop(m.href);
            const hasDropdown = (m.items?.length ?? 0) > 0;

            if (!hasDropdown) {
              return (
                <Link
                  key={m.key}
                  href={m.href}
                  aria-current={activeTop ? 'page' : undefined}
                  className={linkClass(activeTop)}
                >
                  {m.label}
                </Link>
              );
            }

            return (
              <div key={m.key} className="relative group">
                {/* Trigger */}
                <Link
                  href={m.href}
                  aria-haspopup="menu"
                  aria-expanded={undefined}
                  aria-current={activeTop ? 'page' : undefined}
                  className={linkClass(activeTop)}
                >
                  {m.label}
                </Link>

                {/* Hover bridge: prevents gap flicker between trigger and panel */}
                <span
                  aria-hidden
                  className="
                    absolute left-0 right-0 top-full h-2
                    pointer-events-none
                    group-hover:pointer-events-auto
                    group-focus-within:pointer-events-auto
                  "
                />

                {/* Panel (no gap; use top-full + mt-2) */}
                <div
                  role="menu"
                  aria-label={m.label}
                  className="
                    absolute left-0 top-full mt-2 z-50 w-72 rounded-xl border bg-white p-2 shadow-lg backdrop-blur-sm
                    opacity-0 -translate-y-1 scale-95 pointer-events-none
                    transition ease-out duration-150 origin-top
                    group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto
                    group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:pointer-events-auto
                  "
                >
                  {m.items!.map((a) => {
                    const hrefResolved = normalizeHref(a);
                    return (
                      <Link
                        key={a.href}
                        href={hrefResolved}
                        role="menuitem"
                        className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        {a.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center rounded-xl border px-3 py-1.5 text-sm md:hidden
                     text-brand-deep bg-brand-light/30 border-brand-light/60 hover:bg-brand-light/40"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/30 transition-opacity ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />

      {/* Mobile panel (slide-down) */}
      <div
        className={`md:hidden fixed inset-x-0 top-0 z-50 origin-top transform transition-transform
                    ${mobileOpen ? 'translate-y-0' : '-translate-y-full'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-white shadow-lg">
          {/* Panel header */}
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
              <Image src="/images/nordblue-2-1.png" alt="BlueNord" width={110} height={28} className="h-6 w-auto" />
              <span className="sr-only">{SITE_NAME}</span>
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border px-3 py-1.5 text-sm
                         text-slate-700 hover:bg-slate-50"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Panel body */}
          <nav className="mx-auto max-w-6xl px-4 pb-6">
            <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 overflow-hidden">
              {MENU.map((m) => {
                const hasChildren = (m.items?.length ?? 0) > 0;
                const open = mobileSection === m.key;

                if (!hasChildren) {
                  return (
                    <li key={m.key}>
                      <Link
                        href={m.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between px-4 py-3 text-sm text-slate-800 hover:bg-slate-50"
                      >
                        <span>{m.label}</span>
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={m.key}>
                    <button
                      type="button"
                      aria-expanded={open}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-800 hover:bg-slate-50"
                      onClick={() => setMobileSection(open ? null : m.key)}
                    >
                      <span className="font-medium">{m.label}</span>
                      <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" aria-hidden>
                        <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {open && (
                      <div className="bg-slate-50">
                        {m.items!.map((a) => {
                          const hrefResolved = normalizeHref(a);
                          return (
                            <Link
                              key={a.href}
                              href={hrefResolved}
                              onClick={() => setMobileOpen(false)}
                              className="block px-6 py-2.5 text-sm text-slate-700 hover:bg-white"
                            >
                              {a.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}