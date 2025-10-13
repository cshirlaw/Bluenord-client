'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// BlueNord live pieces you already have:
import InvestorsClient from '@/components/InvestorsClient';

// ───────────────────────────────────────────────────────────────────────────────
// Small inline demo components to sit beside the bp.com screenshots
// (kept here for portability; swap out with real shared components later)
// ───────────────────────────────────────────────────────────────────────────────

function Card(props: React.PropsWithChildren<{ title: string; subtitle?: string }>) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-2">
        <h3 className="text-base font-semibold text-slate-900">{props.title}</h3>
        {props.subtitle ? (
          <p className="text-sm text-slate-600">{props.subtitle}</p>
        ) : null}
      </div>
      <div>{props.children}</div>
    </div>
  );
}

function SharePriceBoxMock() {
  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-baseline justify-between">
        <div className="text-sm font-medium text-slate-600">BlueNord (OSE)</div>
        <div className="text-xs text-slate-500">Prices delayed ~20 min</div>
      </div>
      <div className="mt-2 text-2xl font-semibold">NOK 179.40</div>
      <div className="text-sm text-emerald-600">+1.2% today</div>
      <div className="mt-3 text-xs text-slate-500">
        Demo widget for parity; can be wired to delayed quotes or vendor later.
      </div>
    </div>
  );
}

function ConsentBannerMock() {
  const [hidden, setHidden] = React.useState(false);
  if (hidden) return null;
  return (
    <div className="fixed inset-x-0 bottom-2 z-20 mx-2 rounded-xl border bg-white p-4 shadow-lg md:mx-auto md:max-w-3xl">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-700">
          We use cookies to improve your experience. Manage your choices any time.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setHidden(true)}
            className="rounded-lg border px-3 py-1.5 text-sm"
          >
            Reject non-essential
          </button>
          <button
            onClick={() => setHidden(true)}
            className="rounded-lg bg-[#00A3E0] px-3 py-1.5 text-sm font-medium text-white"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-l-4 border-[#00A3E0] bg-slate-50 p-3 text-xs text-slate-600">
      {children}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Page
// ───────────────────────────────────────────────────────────────────────────────

export default function BpParityPage() {
  return (
    <main className="mx-auto max-w-7xl px-3 py-6 md:px-6 lg:py-10">
      <header className="mb-6 md:mb-8">
        <motion.h1
          className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          BP.com ↔ BlueNord — Feature Parity Showcase
        </motion.h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Side-by-side comparison for stakeholder review. Left: screenshot from bp.com.
          Right: our live or demo equivalent in BlueNord-Core. Replace the placeholder
          images in <code>/public/compare/</code> to update the left column.
        </p>
        <div className="mt-3 text-sm">
          <Link
            href="/investors"
            className="text-[#00A3E0] underline-offset-2 hover:underline"
          >
            Go to Investors hub
          </Link>{' '}
          ·{' '}
          <Link
            href="/financials"
            className="text-[#00A3E0] underline-offset-2 hover:underline"
          >
            Go to Financials
          </Link>
        </div>
      </header>

      {/* Section 1: Global Header & Navigation */}
      <Section
        title="Global Header & Navigation"
        bpImage="/compare/bp-header.jpg"
        bpAlt="bp.com global header and navigation"
      >
        <Card
          title="BlueNord Top Navigation"
          subtitle="Sticky header, responsive menu, search-ready structure"
        >
          <Note>
            Our site’s global header is rendered in <code>layout.tsx</code>. This box
            shows the look-and-feel parity. We can add a mega-menu and global search
            overlay to match enterprise behaviour.
          </Note>
          <div className="mt-3 rounded-xl border p-4 text-sm">
            The actual header is above (part of the page chrome). We can demo a
            mega-menu and search overlay on request.
          </div>
        </Card>
      </Section>

      {/* Section 2: Homepage Hero & Cards */}
      <Section
        title="Homepage Hero & Feature Cards"
        bpImage="/compare/bp-home.jpg"
        bpAlt="bp.com homepage hero and feature cards"
      >
        <Card
          title="BlueNord Hero & Cards"
          subtitle="SSR content blocks, motion reveals, accent #00A3E0"
        >
          <Note>
            We use server components and image optimisation. Cards link to key hubs and
            use motion on scroll for a premium feel, mirroring bp’s contemporary UX.
          </Note>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 rounded-xl border p-4">
              <div className="text-sm font-medium text-slate-700">Hero block</div>
              <div className="mt-2 text-xs text-slate-600">
                Replaceable headline, image, and CTA. Mobile-first layout.
              </div>
            </div>
            <div className="flex-1 rounded-xl border p-4">
              <div className="text-sm font-medium text-slate-700">Feature cards</div>
              <div className="mt-2 text-xs text-slate-600">
                Cards grid with category tags and “Read more” links.
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Section 3: Investors Hub / Results & Presentations */}
      <Section
        title="Investors Hub — Results & Presentations"
        bpImage="/compare/bp-investors.jpg"
        bpAlt="bp.com investors results and presentations archive"
      >
        <Card
          title="BlueNord Investors (Live)"
          subtitle="Manifest-driven archive with filters, file sizes, and 'Open all'"
        >
          <Note>
            Powered by <code>public/reports/manifest.json</code> built by{' '}
            <code>scripts/build-reports-manifest.mjs</code>. Add PDFs under{' '}
            <code>public/reports/&lt;year&gt;/</code> (lowercase-kebab-case filenames).
          </Note>
          <div className="mt-3">
            <InvestorsClient />
          </div>
        </Card>
      </Section>

      {/* Section 4: Financials Featured PDF / Key Documents */}
      <Section
        title="Financials — Featured PDF / Key Documents"
        bpImage="/compare/bp-financials.jpg"
        bpAlt="bp.com key documents and financial calendar"
      >
        <Card
          title="BlueNord Financials"
          subtitle="Featured PDF + quick links to core financial documents"
        >
          <Note>
            Our <code>/financials</code> page can pin a featured PDF and present key
            documents in a compact list. We can add a calendar feed to mirror bp.com’s
            events.
          </Note>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <Link
              href="/financials"
              className="rounded-lg border px-3 py-1.5 text-[#00A3E0]"
            >
              View Financials
            </Link>
            <Link
              href="/investors#reports"
              className="rounded-lg border px-3 py-1.5 text-[#00A3E0]"
            >
              All Reports
            </Link>
          </div>
        </Card>
      </Section>

      {/* Section 5: Share Price Widget */}
      <Section
        title="Share Price / Market Data Widget"
        bpImage="/compare/bp-shareprice.jpg"
        bpAlt="bp.com share price widget with delayed data label"
      >
        <Card
          title="BlueNord Share Price (Demo)"
          subtitle="Compact ticker with delayed-data label"
        >
          <SharePriceBoxMock />
        </Card>
      </Section>

      {/* Section 6: Cookie Consent */}
      <Section
        title="Cookie Consent (OneTrust style)"
        bpImage="/compare/bp-consent.jpg"
        bpAlt="bp.com cookie consent banner"
      >
        <Card
          title="BlueNord Consent Banner (Demo)"
          subtitle="Lightweight, accessible banner — vendor-ready swap"
        >
          <Note>
            For parity, we can integrate OneTrust or a light open-source banner. This
            demo shows the UX pattern; button labels and links can map to your policy.
          </Note>
          <div className="relative mt-3">
            <ConsentBannerMock />
            <div className="rounded-xl border p-4 text-xs text-slate-600">
              Use the buttons in the banner at the bottom of the screen to dismiss.
            </div>
          </div>
        </Card>
      </Section>

      {/* Section 7: Footer / Global Links */}
<Section
  title="Global Footer"
  bpImage="/compare/bp-footer.jpg"
  bpAlt="bp.com footer links and disclosures"
  fit="contain"        // ← key change: no cropping, scales to fit
  aspect="4/3"         // ← optional: gives more vertical room
>
  <Card
    title="BlueNord Footer"
    subtitle="Structured links, disclosures, accessibility"
  >
    {/* ... */}
  </Card>
</Section>

      {/* Help text for screenshots */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900">How to update screenshots</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>
            Take clean desktop screenshots (≈1440px wide) of bp.com sections you want to
            compare.
          </li>
          <li>
            Save them to <code>public/compare/</code> using the filenames referenced in
            this page (e.g. <code>bp-home.jpg</code>).
          </li>
          <li>
            Commit and deploy — this page will pick them up automatically.
          </li>
        </ol>
      </div>
    </main>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Section wrapper: left = bp.com screenshot, right = BlueNord live/demo block
// ───────────────────────────────────────────────────────────────────────────────

function Section({
  title,
  bpImage,
  bpAlt,
  children,
  fit = "cover",          // ← add default fit
  aspect = "16/10",       // ← add default aspect
}: {
  title: string;
  bpImage: string;
  bpAlt: string;
  children: React.ReactNode;
  fit?: "cover" | "contain";
  aspect?: string; // e.g. "16/10", "4/3", "21/9"
}) {
  return (
    <section className="mb-10 md:mb-12">
      {/* ... */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className="rounded-2xl border bg-white p-3 shadow-sm">
          <div className="px-1 pb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            BP.com
          </div>
          {/* use the adjustable aspect + fit */}
          <div className={`relative aspect-[${aspect}] w-full overflow-hidden rounded-xl border bg-white`}>
            <Image
              src={bpImage}
              alt={bpAlt}
              fill
              className={fit === "contain" ? "object-contain p-2" : "object-cover"}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Replace this placeholder: <code>{bpImage}</code>
          </div>
        </div>

        {/* Right column unchanged */}
        <div className="rounded-2xl border bg-white p-3 shadow-sm">
          <div className="px-1 pb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            BlueNord
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}