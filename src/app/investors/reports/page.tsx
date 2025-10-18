import React from "react";
import { promises as fs } from "node:fs";
import path from "node:path";

import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";

type Kind = "report" | "presentation" | "annual" | "other";

export const metadata = { title: "Reports | BlueNord" };

type ReportRow = {
  title: string;
  href: string;
  year?: number;
  date?: string;           // ISO (from generator)
  size_bytes?: number;
  sizeMB?: number;
  kind?: Kind;
};

type Manifest = { items?: ReportRow[]; years?: number[] };

function detectKind(r: ReportRow): Kind {
  const t = `${r.title ?? ""} ${r.href}`.toLowerCase();
  if (/presentation|deck|capital markets|investor day/.test(t)) return "presentation";
  if (/annual report|annual-report/.test(t)) return "annual";
  if (/(report|q[1-4]\b|interim|half[-\s]?year|full[-\s]?year)/.test(t)) return "report";
  return "other";
}

async function loadManifest(): Promise<{ items: ReportRow[]; years: number[] }> {
  // Prefer generated manifest; fall back to curated if present
  let json = "{}";
  try {
    json = await fs.readFile(path.join(process.cwd(), "public", "reports", "manifest.json"), "utf8");
  } catch {
    json = await fs.readFile(path.join(process.cwd(), "public", "data", "reports-manifest.json"), "utf8");
  }
  const data = JSON.parse(json) as Manifest;

  const items: ReportRow[] = (data.items ?? []).map((r) => ({
    ...r,
    title: r.title ?? r.href.split("/").pop() ?? "Untitled",
    kind: r.kind ?? detectKind(r),
  }));

  // newest first (by date then title)
  items.sort((a, b) => {
    const da = a.date ?? "1970-01-01";
    const db = b.date ?? "1970-01-01";
    if (db !== da) return db.localeCompare(da);
    return (a.title || "").localeCompare(b.title || "");
  });

  const years =
    data.years?.length
      ? [...data.years].sort((a, b) => b - a)
      : Array.from(new Set(items.map((i) => i.year).filter(Boolean) as number[])).sort(
          (a, b) => b - a
        );

  return { items, years };
}

function formatMB(bytes?: number) {
  if (!bytes || !Number.isFinite(bytes)) return undefined;
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams?: { year?: string; type?: Kind | "all"; q?: string };
}) {
  const { items, years } = await loadManifest();

  // read filters from URL (server-side only)
  const yearParam = searchParams?.year ?? "all";
  const typeParam = (searchParams?.type ?? "all") as Kind | "all";
  const qParam = (searchParams?.q ?? "").trim().toLowerCase();

  const yearSel: number | null = yearParam !== "all" ? Number(yearParam) : null;
  const typeSel: Kind | null = typeParam !== "all" ? (typeParam as Kind) : null;

  const filtered = items.filter((it) => {
    if (yearSel && it.year !== yearSel) return false;
    if (typeSel && (it.kind ?? "report") !== typeSel) return false; // <-- no "all" compare
    if (qParam) {
      const title = (it.title || "").toLowerCase();
      const file = it.href.split("/").pop()?.toLowerCase() || "";
      if (!title.includes(qParam) && !file.includes(qParam)) return false;
    }
    return true;
  });

  const crumbs: Crumb[] = [
    { label: process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient", href: "/" },
    { label: "Investors", href: "/investors" },
    { label: "Reports", current: true },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 space-y-12 pb-16">
      <PageHero
        imageSrc="/images/hero/reports.jpg"
        imageAlt="Reports & Results"
        title="Reports & Results"
        intro="Annual and interim reports, results presentations and downloads."
        mode="cover"
        size="compact"
      />

      <Breadcrumbs items={crumbs} />

      <Section eyebrow="Library" title="Latest filings & documents">
        {/* GET form keeps filters in the URL; server filters on render */}
        <form method="GET" className="mb-4 flex flex-wrap items-center gap-3">
          {/* Year */}
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <span className="font-medium">Year</span>
            <select
              name="year"
              defaultValue={yearParam}
              className="rounded-lg border px-2.5 py-1.5 text-sm"
              onChange={(e) => e.currentTarget.form?.requestSubmit()}
            >
              <option value="all">All</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </label>

          {/* Type */}
          <label className="ml-2 flex items-center gap-2 text-sm text-slate-600">
            <span className="font-medium">Type</span>
            <select
              name="type"
              defaultValue={typeParam}
              className="rounded-lg border px-2.5 py-1.5 text-sm"
              onChange={(e) => e.currentTarget.form?.requestSubmit()}
            >
              <option value="all">All</option>
              <option value="report">Reports</option>
              <option value="presentation">Presentations</option>
              <option value="annual">Annual</option>
              <option value="other">Other</option>
            </select>
          </label>

          {/* Search */}
          <input
            type="search"
            name="q"
            defaultValue={searchParams?.q ?? ""}
            placeholder="Search by title or filename..."
            className="ml-auto w-[320px] max-w-[55vw] rounded-lg border px-3 py-1.5 text-sm"
            onChange={(e) => {
              const form = e.currentTarget.form;
              if (!form) return;
              // small debounce so typing feels natural
              (form as any).__t && clearTimeout((form as any).__t);
              (form as any).__t = setTimeout(() => form.requestSubmit(), 250);
            }}
          />
        </form>

        {/* Results */}
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((it) => {
            const mb =
              typeof it.sizeMB === "number"
                ? `${it.sizeMB.toFixed(1)} MB`
                : formatMB(it.size_bytes);

            const kind =
              it.kind === "presentation"
                ? "Presentation"
                : it.kind === "annual"
                ? "Annual"
                : it.kind === "other"
                ? "Document"
                : "Report";

            return (
              <li key={`${it.href}-${it.title}`} className="rounded-2xl border p-4 shadow-sm">
                <h3 className="text-slate-900 font-medium leading-snug">{it.title}</h3>
                <p className="mt-1 text-xs text-slate-500">
                  {it.year ?? "—"} {mb ? <>· {mb}</> : null} · {kind}
                </p>
                <div className="mt-3 flex gap-2">
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm hover:bg-slate-50"
                  >
                    Open
                  </a>
                  <a
                    href={it.href}
                    download
                    className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm hover:bg-slate-50"
                  >
                    Download
                  </a>
                </div>
              </li>
            );
          })}
        </ul>

        {filtered.length === 0 && (
          <p className="mt-2 text-sm text-slate-500">No matches. Try clearing filters.</p>
        )}
      </Section>
    </main>
  );
}