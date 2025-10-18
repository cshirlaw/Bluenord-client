// src/app/investors/presentations/page.tsx
import React from "react";
import { promises as fs } from "fs";
import path from "path";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import PresentationsClient from "@/components/PresentationsClient";

export const metadata = { title: "Presentations | BlueNord" };
export const revalidate = 3600;

type ManifestItem = {
  href: string;
  title?: string;
  date?: string;
  year?: number;
  size_bytes?: number;
};

type Manifest = { items: ManifestItem[] };

async function loadManifest(): Promise<Manifest> {
  const file = path.join(process.cwd(), "public", "reports", "manifest.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as Manifest;
}

export default async function PresentationsPage() {
  const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient";
  const manifest = await loadManifest();

  // Map to items expected by the client
  const items = (manifest.items ?? []).map((r) => {
    const y = r.year ?? (r.date ? new Date(r.date).getFullYear() : undefined);
    return {
      href: r.href,
      title: r.title ?? r.href.split("/").pop()!,
      date: r.date ?? (y ? `${y}-01-01` : "1970-01-01"),
      year: y,
      sizeMB:
        typeof r.size_bytes === "number" ? r.size_bytes / 1024 / 1024 : undefined,
    };
  });

  const years = Array.from(
    new Set(
      items
        .map((r) => r.year)
        .filter((x): x is number => typeof x === "number")
    )
  ).sort((a, b) => b - a);

  return (
    <main className="mx-auto max-w-6xl px-4 space-y-12 pb-16">
      <PageHero
        imageSrc="/images/investors-hero.jpg" /* use any existing image */
        imageAlt="Investor presentations"
        title="Presentations"
        intro="Recent investor and conference presentations."
        mode="cover"
        size="compact"
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <a href="/" className="hover:underline">
              {HOME_LABEL}
            </a>
          </li>
          <li aria-hidden className="opacity-50">
            ›
          </li>
          <li>
            <a href="/investors" className="hover:underline">
              Investors
            </a>
          </li>
          <li aria-hidden className="opacity-50">
            ›
          </li>
          <li aria-current="page" className="text-slate-700 font-medium">
            Presentations
          </li>
        </ol>
      </nav>

      <Section eyebrow="Library" title="Investor presentations">
        <div className="relative z-[1]">
          <PresentationsClient items={items} years={years} />
        </div>
      </Section>
    </main>
  );
}