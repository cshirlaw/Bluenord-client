// src/app/financials/q3-2025/page.tsx
import PageHero from "@/components/PageHero";
import Link from "next/link";

export default function Q3_2025Page() {
  return (
    <div className="space-y-10">
      <PageHero
        imageSrc="/images/hero/hero.jpg"   // or your specific hero for Q3
        title="Q3 2025 presentation (interactive)"
        intro="Production, Tyra ramp, hedging and distribution framework."
        mode="contain"
        size="compact"
      />

      <main className="mx-auto max-w-6xl px-4 space-y-12">
        {/* Overview */}
        <section className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">Overview</h2>
          <p className="mt-2 text-sm text-slate-700">
            Replace this with your interactive intro / key highlights.
          </p>
        </section>

        {/* Example sections — drop in your real components */}
        <section className="rounded-2xl border p-6">
          <h3 className="font-medium">Production</h3>
          <div className="mt-3 text-sm text-slate-700">
            {/* <ProductionChart data={...} /> */}
            Chart placeholder.
          </div>
        </section>

        <section className="rounded-2xl border p-6">
          <h3 className="font-medium">Hedging</h3>
          <div className="mt-3 text-sm text-slate-700">
            {/* <HedgeChart data={...} /> */}
            Chart placeholder.
          </div>
        </section>

        <div className="pt-2">
          <Link href="/financials" className="text-sm underline">
            ← Back to Financials
          </Link>
        </div>
      </main>
    </div>
  );
}