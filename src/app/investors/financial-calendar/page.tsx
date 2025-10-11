import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function FinancialCalendarPage() {
  return (
    <>
      {/* Hero with subtle gradient overlay */}
      <PageHero
        imageSrc="/images/hero/hero.jpg"
        imageAlt="Financial calendar"
        title="Financial calendar"
        intro="Upcoming results, reports and investor events."
        overlay="gradient"
        overlayStrength={70}
        size="compact"
        mode="contain"
      />

      <main className="mx-auto max-w-6xl px-4 pb-10 space-y-4">
        <h1 className="sr-only">Financial calendar</h1>

        {/* Example list (replace with real data) */}
        <ul className="mt-2 space-y-3">
          <li className="rounded-2xl border p-4">
            <div className="text-sm opacity-70">10 Sep 2025</div>
            <div className="font-medium">Pareto Securities Energy Conference</div>
          </li>
          <li className="rounded-2xl border p-4">
            <div className="text-sm opacity-70">31 Oct 2025</div>
            <div className="font-medium">Q3 2025 Trading Update</div>
          </li>
        </ul>

        <Link href="/investors" className="underline text-sm">
          ← Back to Investors
        </Link>
      </main>
    </>
  );
}