// src/app/investors/new-reports/page.tsx
import React from "react";
import { promises as fs } from "fs";
import path from "path";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import ReportsClient from "@/components/ReportsClient";

export const metadata = { title: "Reports & Results | BlueNord" };
export const revalidate = 3600; // ISR

type ManifestItem = {
  href: string;
  title?: string;
  date?: string;       // "YYYY-MM-DD"
  year?: number;
  size_bytes?: number; // bytes
  featured?: boolean;
};
type Manifest = { items: ManifestItem[] };

async function loadManifest(): Promise<Manifest> {
  const file = path.join(process.cwd(), "public", "reports", "manifest.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as Manifest;
}

export default async function NewReportsPage() {
  const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient";

  const manifest = await loadManifest();

  const items = (manifest.items ?? []).map((r) => {
    const y = r.year ?? (r.date ? new Date(r.date).getFullYear() : undefined);
    return {
      title: r.title ?? r.href.split("/").pop()!,
      date: r.date ?? (y ? `${y}-01-01` : "1970-01-01"),
      href: r.href, // /reports/<year>/<file>.pdf (already public)
      sizeMB: typeof r.size_bytes === "number" ? r.size_bytes / 1024 / 1024 : undefined,
      featured: r.featured ?? false,
    };
  });

  const years = Array.from(
    new Set(
      (manifest.items ?? [])
        .map((r) => r.year ?? (r.date ? new Date(r.date).getFullYear() : undefined))
        .filter((x): x is number => typeof x === "number")
    )
  ).sort((a, b) => b - a);

  return (
    // isolate = new stacking context; relative + z-0 so children can layer above hero safely
    <main className="relative isolate z-0 mx-auto max-w-6xl px-4 space-y-12 pb-16">
      <PageHero
        imageSrc="/images/hero/reports.jpg"
        imageAlt="Reports & Results"
        title="Reports & Results"
        intro="Annual and interim reports, results presentations and downloads."
        mode="cover"
        size="compact"
      />

      {/* Everything interactive sits inside its own raised layer */}
      <div className="relative z-[20] pointer-events-auto space-y-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
          <ol className="flex flex-wrap items-center gap-1">
            <li><a href="/" className="hover:underline">{HOME_LABEL}</a></li>
            <li aria-hidden className="opacity-50">›</li>
            <li><a href="/investors" className="hover:underline">Investors</a></li>
            <li aria-hidden className="opacity-50">›</li>
            <li aria-current="page" className="text-slate-700 font-medium">New Reports</li>
          </ol>
        </nav>

        <Section eyebrow="Library" title="Latest filings & presentations" className="relative z-[30]">
          {/* Extra wrapper to guarantee this panel floats above any background layers */}
          <div className="relative z-[40] pointer-events-auto">
            <ReportsClient items={items} years={years} />
          </div>
        </Section>
      </div>
    </main>
  );
}