// src/app/investors/share/page.tsx
import React from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import ShareWidget from "@/components/ShareWidget";

export default function SharePage() {
  const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient";

  const items = [
    { label: HOME_LABEL, href: "/" },
    { label: "Investors", href: "/investors" },
    { label: "The BlueNord Share", current: true },
  ] as const;

  // Single source of truth for instrument meta
  const TICKER = "BNOR";
  const ISIN = "NO0010379266";
  const EXCHANGE = "Euronext Oslo (Oslo Børs)";

  // Official link-outs
  const EURONEXT_MARKET =
    "https://live.euronext.com/en/product/equities/NO0010379266-XOSL/market-information";
  const EURONEXT_COMPANY =
    "https://live.euronext.com/en/product/equities/NO0010379266-XOSL/company-information";
  const PRIMARY_INSIDERS =
    "https://live.euronext.com/en/product/equities/NO0010379266-XOSL/company-information#company-press-releases";
  const YAHOO =
    "https://uk.finance.yahoo.com/quote/BNOR.OL/";
  const LEGACY_SITE =
    "https://www.bluenord.com/the-bluenord-share/";

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-10">
      <Breadcrumbs items={items as any} />

      {/* Header */}
      <header>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">The BlueNord Share</h1>
        <p className="mt-3 max-w-2xl text-base sm:text-lg opacity-80">
          Live market overview for BlueNord and authoritative links to the official exchange.
        </p>
      </header>

      {/* Live chart widget */}
      <Section eyebrow="Market overview" title="Price and volume (OSL: BNOR)">
  <ShareWidget />

  {/* Caption for TradingView symbol availability */}
  <p className="mt-2 text-sm opacity-70">
    Live interactive chart is available on{" "}
    <a
      href="https://www.tradingview.com/symbols/OSL-BNOR/"
      target="_blank"
      rel="noreferrer"
      className="underline"
    >
      TradingView (OSL: BNOR)
    </a>.
  </p>

  <p className="mt-3 text-xs opacity-70">
    Data shown via a third-party public widget and may be delayed. For authoritative and
    complete information, use the Euronext Oslo links below.
  </p>
</Section>

      {/* Key facts + link cards */}
      <Section eyebrow="Key facts" title="Instrument details and official sources">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-4">
            <div className="text-xs uppercase opacity-70">Exchange</div>
            <div className="text-lg font-medium">{EXCHANGE}</div>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="text-xs uppercase opacity-70">Ticker</div>
            <div className="text-lg font-semibold">BNOR</div>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="text-xs uppercase opacity-70">ISIN</div>
            <div className="text-lg font-mono">{ISIN}</div>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="text-xs uppercase opacity-70">Currency</div>
            <div className="text-lg font-medium">NOK</div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href={EURONEXT_MARKET}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border p-5 hover:shadow focus:outline-none focus:ring"
          >
            <h3 className="font-semibold">View on Euronext</h3>
            <p className="opacity-70 text-sm">
              Official market information for {TICKER} on {EXCHANGE}.
            </p>
          </Link>

          <Link
            href={EURONEXT_COMPANY}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border p-5 hover:shadow focus:outline-none focus:ring"
          >
            <h3 className="font-semibold">Company information</h3>
            <p className="opacity-70 text-sm">
              Company profile, identifiers, and exchange reference data.
            </p>
          </Link>

          <Link
            href={PRIMARY_INSIDERS}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border p-5 hover:shadow focus:outline-none focus:ring"
          >
            <h3 className="font-semibold">Announcements / primary insiders</h3>
            <p className="opacity-70 text-sm">
              Official announcements and insider notifications as published to the exchange.
            </p>
          </Link>

          <Link
            href={YAHOO}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border p-5 hover:shadow focus:outline-none focus:ring"
          >
            <h3 className="font-semibold">Yahoo Finance (summary)</h3>
            <p className="opacity-70 text-sm">
              Public snapshot with price, range, and volume for quick reference.
            </p>
          </Link>

          <Link
            href={LEGACY_SITE}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border p-5 hover:shadow focus:outline-none focus:ring"
          >
            <h3 className="font-semibold">Current corporate page</h3>
            <p className="opacity-70 text-sm">
              BlueNord’s existing “The BlueNord Share” page for reference.
            </p>
          </Link>
        </div>

        <p className="mt-6 text-xs opacity-70">
          Note: For compliance, treat Euronext Oslo as the authoritative source of market data and
          disclosures for BlueNord.
        </p>
      </Section>
    </main>
  );
}