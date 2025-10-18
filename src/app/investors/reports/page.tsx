import React from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import Link from "next/link";

import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";

type Kind = "report" | "presentation" | "annual" | "other";
type ReportRow = {
  title: string;
  href: string;
  year?: number;
  date?: string;
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
  // Prefer generated; fall back to curated if present
  let json = "{}";
  try {
    json = await fs.readFile(path.join(process.cwd(), "public", "reports", "manifest.json"), "utf8");
  } catch {
    try {
      json = await fs.readFile(path.join(process.cwd(), "public", "data", "reports-manifest.json"), "utf8");
    } catch {
      return { items: [], years: [] };
    }
  }

  const data = JSON.parse(json) as Manifest;
  const items: ReportRow[] = (data.items ?? []).map((r) => ({
    ...r,
    title: r.title ?? r.href.split("/").pop() ?? "Untitled",
    kind: r.kind ?? detectKind(r),
  }));

  // newest first by date then title
  items.sort((a, b) => {
    const da = a.date ?? "1970-01-01";
    const db = b.date ?? "1970-01-01";
    if (db !== da) return db.localeCompare(da);
    return (a.title || "").localeCompare(b.title || "");
  });

  const years =
    data.years?.length
      ? [...data.years].sort((a, b) => b - a)
      : Array.from(new Set(items.map((i) => i.year).filter(Boolean) as number[])).sort((a, b) => b - a);

  return { items, years };
}

// Build a URL with updated params (server-safe)
function buildUrl(base: string, params: Record<string, string | undefined>) {
  const p = new URLSearchParams();
  if (params.year && params.year !== "all") p.set("year", params.year);
  if (params.type && params.type !== "all") p.set("type", params.type);
  if (params.q && params.q.trim()) p.set("q", params.q.trim());
  const qs = p.toString();
  return qs ? `${base}?${qs}` : base;
}

// display helpers
function sizeLabel(bytes?: number, mb?: number) {
  const v = typeof mb === "number" ? mb : typeof bytes === "number" ? bytes / (1024 * 1024) : undefined;
  if (v == null || !Number.isFinite(v)) return undefined;
  return v >= 1024 ? `${(v / 1024).toFixed(1)} GB` : `${v.toFixed(1)} MB`;
}
function kindLabel(k?: Kind) {
  return k === "presentation" ? "Presentation" : k === "annual" ? "Annual" : k === "other" ? "Document" : "Report";
}

export const metadata = { title: "Reports | BlueNord" };

export default async function ReportsPage({
  searchParams,
}: {
  searchParams?: { year?: string; type?: string; q?: string };
}) {
  const { items, years } = await loadManifest();

  const yearSel = searchParams?.year && searchParams.year !== "all" ? Number(searchParams.year) : null;
  const typeSel = (searchParams?.type as Kind | undefined) ?? undefined;
  const q = (searchParams?.q ?? "").trim().toLowerCase();

  const filtered = items.filter((it) => {
    if (yearSel && it.year !== yearSel) return false;
    if (typeSel && typeSel !== "all" && (it.kind ?? "report") !== typeSel) return false;
    if (q) {
      const title = (it.title || "").toLowerCase();
      const file = it.href.split("/").pop()?.toLowerCase() || "";
      if (!title.includes(q) && !file.includes(q)) return false;
    }
    return true;
  });

  const crumbs: Crumb[] = [
    { label: process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient", href: "/" },
    { label: "Investors", href: "/investors" },
    { label: "Reports", current: true },
  ];

  // current param values (strings) for link builders
  const yearStr = yearSel ? String(yearSel) : "all";
  const typeStr = (typeSel ?? "all") as string;
  const qStr = searchParams?.q ?? "";

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
        {/* Controls: server links (no client JS) */}
        <div className="relative z-[20] pointer-events-auto space-y-3">
          {/* Years as pill links */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-600 font-medium mr-1">Year</span>
            <Link
              href={buildUrl("/investors/reports", { year: "all", type: typeStr, q: qStr })}
              className={`rounded-full border px-3 py-1.5 ${yearStr === "all" ? "bg-slate-900 text-white" : "hover:bg-slate-50"}`}
            >
              All
            </Link>
            {years.map((y) => {
              const active = yearStr === String(y);
              return (
                <Link
                  key={y}
                  href={buildUrl("/investors/reports", { year: String(y), type: typeStr, q: qStr })}
                  className={`rounded-full border px-3 py-1.5 ${active ? "bg-slate-900 text-white" : "hover:bg-slate-50"}`}
                >
                  {y}
                </Link>
              );
            })}
          </div>

          {/* Types as pill links */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-600 font-medium mr-1">Type</span>
            {(["all", "report", "presentation", "annual", "other"] as const).map((t) => {
              const label = t === "report" ? "Reports" : t === "presentation" ? "Presentations" : t === "annual" ? "Annual" : t === "other" ? "Other" : "All";
              const active = typeStr === t;
              return (
                <Link
                  key={t}
                  href={buildUrl("/investors/reports", { year: yearStr, type: t, q: qStr })}
                  className={`rounded-full border px-3 py-1.5 ${active ? "bg-slate-900 text-white" : "hover:bg-slate-50"}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Search (plain GET) */}
          <form
            action="/investors/reports"
            method="get"
            className="flex items-center gap-2"
          >
            {/* keep existing selection via hidden inputs */}
            {yearStr !== "all" && <input type="hidden" name="year" value={yearStr} />}
            {typeStr !== "all" && <input type="hidden" name="type" value={typeStr} />}

            <input
              name="q"
              defaultValue={qStr}
              placeholder="Search by title or filename..."
              className="w-[360px] max-w-[60vw] rounded-lg border px-3 py-1.5 text-sm"
              type="search"
            />
            <button
              type="submit"
              className="rounded-full border px-3 py-1.5 text-sm hover:bg-slate-50"
              aria-label="Search"
            >
              Search
            </button>
            <span className="ml-2 text-xs text-slate-500">
              {filtered.length}/{items.length} items
            </span>
            {qStr ? (
              <Link
                href={buildUrl("/investors/reports", { year: yearStr, type: typeStr, q: "" })}
                className="ml-2 text-xs text-slate-600 hover:underline"
              >
                clear search
              </Link>
            ) : null}
          </form>
        </div>

        {/* Grid */}
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 relative z-[20]">
          {filtered.map((it, i) => {
            const size = sizeLabel(it.size_bytes, it.sizeMB);
            return (
              <li key={`${it.href}-${i}`} className="rounded-2xl border p-4 shadow-sm">
                <h3 className="text-slate-900 font-medium leading-snug">{it.title}</h3>
                <p className="mt-1 text-xs text-slate-500">
                  {it.year ?? "—"} {size ? <>· {size}</> : null} · {kindLabel(it.kind)}
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
          <p className="mt-3 text-sm text-slate-500">No matches. Try a different year/type, or clear the search.</p>
        )}
      </Section>
    </main>
  );
}