"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileNav from "@/components/MobileNav";

const nav = [
  { href: "/company", label: "Company" },
  { href: "/assets", label: "Assets" },
  // { href: "/investors", label: "Investors" }, // handled as dropdown below
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      role="banner"
      className={[
        // isolate + z-50 prevents clipping and ensures dropdown sits above content
        "sticky top-0 z-50 isolate border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70",
        scrolled ? "shadow-sm" : "shadow-none",
      ].join(" ")}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" aria-label="BlueNord Home" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">BlueNord</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          {/* Simple top-level links */}
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "px-3 py-3 text-sm transition-colors",
                  "focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-black/40",
                  active ? "font-semibold text-black" : "text-black/60 hover:text-black/80",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Investors dropdown (CSS-only; no JS timers) */}
          <div className="relative group">
            {/* Trigger button keeps focus -> menu stays open with keyboard */}
            <button
              className="inline-flex items-center gap-2 px-3 py-3 text-sm font-medium text-black/70 hover:text-black focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-black/40"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              Investors
              <svg width="14" height="14" aria-hidden>
                <path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            {/* Hover bridge: prevents the “gap drop” when moving cursor down */}
            <span className="pointer-events-none absolute left-0 right-0 top-full h-2 content-[''] group-hover:pointer-events-auto group-focus-within:pointer-events-auto" />

            {/* Panel */}
            <div
              className="
                absolute left-0 top-full mt-2 w-72 rounded-2xl border bg-white shadow-xl
                opacity-0 -translate-y-1 scale-95 pointer-events-none
                transition ease-out duration-150 origin-top
                group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto
                group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:pointer-events-auto
                z-[60]
              "
              role="menu"
              aria-label="Investors"
            >
              <ul className="py-2">
                <li>
                  <Link
                    href="/investors"
                    className="block px-4 py-2 text-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50"
                    role="menuitem"
                  >
                    Investors home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/investors/reports"
                    className="block px-4 py-2 text-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50"
                    role="menuitem"
                  >
                    Reports &amp; presentations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/investors/share"
                    className="block px-4 py-2 text-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50"
                    role="menuitem"
                  >
                    The BlueNord share
                  </Link>
                </li>
                {/* Add more items as needed */}
              </ul>
            </div>
          </div>

          {/* Optional: keep a quick-action button if you want */}
          <Link
            href="/investors#reports"
            className="ml-1 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
          >
            Reports
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
        >
          Menu
          <span className="sr-only">{mobileOpen ? "Close" : "Open"} navigation</span>
        </button>
      </div>

      {/* Mobile nav remains separate (click/accordion) */}
      <div id="mobile-nav">
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} items={[...nav, { href: "/investors", label: "Investors" }]} />
      </div>
    </header>
  );
}