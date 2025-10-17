import React from "react";
import { promises as fs } from "fs";
import path from "path";
import ReportsLiteClient from "@/components/ReportsLiteClient"; // your working client

export const metadata = { title: "Reports & Results (Lite) | BlueNord" };
export const revalidate = 3600;

type ManifestItem = {
  href: string; title?: string; date?: string; year?: number; size_bytes?: number;
};
type Manifest = { items: ManifestItem[] };

async function loadManifest(): Promise<Manifest> {
  const file = path.join(process.cwd(), "public", "reports", "manifest.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as Manifest;
}

export default async function ReportsLiteIsolatedPage() {
  const manifest = await loadManifest();

  const items = (manifest.items ?? []).map((r) => {
    const y = r.year ?? (r.date ? new Date(r.date).getFullYear() : undefined);
    return {
      href: r.href,
      title: r.title ?? r.href.split("/").pop()!,
      year: y,
      date: r.date ?? (y ? `${y}-01-01` : "1970-01-01"),
      size_bytes: r.size_bytes,
    };
  });

  const years = Array.from(
    new Set(items.map((r) => r.year).filter((x): x is number => typeof x === "number"))
  ).sort((a, b) => b - a);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-semibold">Reports & Results (Lite)</h1>
        <p className="text-slate-600">
          A lightweight view of annual and interim reports, results presentations and downloads.
        </p>
      </header>
      <ReportsLiteClient items={items} years={years} />
    </main>
  );
}