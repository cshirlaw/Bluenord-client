"use client";

import React from "react";
import Chip from "@/components/Chip";
import TypeDropdown from "@/components/TypeDropdown";

/** ---------------- Types passed from the server page ---------------- */
type ServerReport = {
  title: string;
  date: string;     // ISO "YYYY-MM-DD"
  href: string;     // /reports/<year>/<file>.pdf
  sizeMB?: number;
  featured?: boolean;
};
/** ------------------------------------------------------------------- */

type Kind = "presentation" | "report" | "annual" | "other";
type TypeSel = "all" | "presentation" | "report" | "annual";

type Report = {
  href: string;
  title?: string;
  size_bytes?: number;
  size?: string;
  year?: number;
  kind?: Kind;
  featured?: boolean;
};

function humanFileSize(bytes?: number) {
  if (!bytes || bytes <= 0) return undefined;
  const u = ["KB","MB","GB","TB"]; let b = bytes, i = -1;
  do { b /= 1024; i++; } while (b >= 1024 && i < u.length - 1);
  return `${b.toFixed(1)} ${u[i]}`;
}

// Kind detection
function isPresentation(x: Report): boolean {
  const t = `${x.title ?? ""} ${x.href}`.toLowerCase();
  return /presentation|deck|cmd|capital markets|investor day/.test(t) || /\/presentations?\//.test(x.href.toLowerCase());
}
function isAnnual(x: Report): boolean {
  const t = `${x.title ?? ""} ${x.href}`.toLowerCase();
  return /annual report|annual-report|annual and sustainability|annual\s*&\s*sustainability/.test(t) || /\/annuals?\//.test(t);
}
function detectKind(x: Report): Kind {
  if (isPresentation(x)) return "presentation";
  if (isAnnual(x)) return "annual";
  const t = `${x.title ?? ""} ${x.href}`.toLowerCase();
  if (/(report|financial statements|accounts|quarter|q[1-4]\b|interim|half[-\s]?year|h[12]\b|full[-\s]?year)/.test(t)) return "report";
  return "other";
}

/** Build dynamic year buckets from data. */
function buildYearBuckets(allYearsDesc: number[]) {
  const set = new Set(allYearsDesc);
  const minYear = Math.min(...allYearsDesc);
  const buckets: { key: string; label: string; contains: (y?: number) => boolean }[] = [];

  for (const y of allYearsDesc) {
    buckets.push({ key: `y${y}`, label: String(y), contains: (yr?: number) => yr === y });
  }
  if (minYear <= 2021 && allYearsDesc.some(y => y <= 2021 && y >= 2013)) {
    buckets.push({ key: "r2013_2021", label: "2013–2021", contains: (y?: number) => typeof y === "number" && y >= 2013 && y <= 2021 });
  }
  if (minYear <= 2012 && allYearsDesc.some(y => y <= 2012 && y >= 2005)) {
    buckets.push({ key: "r2005_2012", label: "2005–2012", contains: (y?: number) => typeof y === "number" && y >= 2005 && y <= 2012 });
  }
  buckets.push({ key: "all", label: "All", contains: (_?: number) => true });
  return buckets;
}

export default function ReportsClient({
  items,
  years,
}: {
  items: ServerReport[];
  years: number[];
}) {
  const mapped: Report[] = React.useMemo(() => {
    return items.map((it) => {
      const y = new Date(it.date).getFullYear();
      const sizeBytes = typeof it.sizeMB === "number" ? it.sizeMB * 1024 * 1024 : undefined;
      return { href: it.href, title: it.title, size_bytes: sizeBytes, year: y, featured: it.featured };
    }).map(r => ({ ...r, kind: detectKind(r) }));
  }, [items]);

  const YEAR_FILTERS = React.useMemo(() => buildYearBuckets(years), [years]);
  type BucketKey = (typeof YEAR_FILTERS)[number]["key"];

  const [q, setQ] = React.useState("");
  const defaultBucket: BucketKey = (YEAR_FILTERS[0]?.key as BucketKey) ?? ("all" as BucketKey);
  const [selectedBucket, setSelectedBucket] = React.useState<BucketKey>(defaultBucket);
  const [typeSel, setTypeSel] = React.useState<TypeSel>("report");
  const [touched, setTouched] = React.useState(false);

  const sorted = React.useMemo(() => {
    return [...mapped].sort((a, b) => {
      const ay = a.year ?? 0, by = b.year ?? 0;
      if (by !== ay) return by - ay;
      return (a.title ?? a.href).localeCompare(b.title ?? b.href);
    });
  }, [mapped]);

  const filtered = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    const bucket = YEAR_FILTERS.find(b => b.key === selectedBucket);
    return sorted.filter(r => {
      if (bucket && !bucket.contains(r.year)) return false;
      if (typeSel !== "all" && r.kind !== typeSel) return false;
      if (needle) {
        const hay = `${r.title ?? ""} ${r.href}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [sorted, YEAR_FILTERS, selectedBucket, typeSel, q]);

  const toRender = React.useMemo(() => {
    const isDefault = !touched && q.trim() === "" && selectedBucket === defaultBucket && typeSel === "report";
    return isDefault ? filtered.slice(0, 1) : filtered;
  }, [filtered, touched, q, selectedBucket, typeSel, defaultBucket]);

  function pickBucket(k: BucketKey) { setTouched(true); setSelectedBucket(k); }
  function onSearch(v: string) { setTouched(true); setQ(v); }
  function onTypeChange(v: TypeSel) { setTouched(true); setTypeSel(v); }

  function openAll() {
    const maxToOpen = Math.min(filtered.length, 12);
    filtered.slice(0, maxToOpen).forEach((r, i) => {
      setTimeout(() => window.open(r.href, "_blank", "noopener,noreferrer"), i * 100);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {YEAR_FILTERS.map((b) => (
            <Chip key={b.key} active={selectedBucket === b.key} onClick={() => pickBucket(b.key as any)}>
              {b.label}
            </Chip>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <TypeDropdown value={typeSel} onChange={onTypeChange} />
          <input
            type="search"
            placeholder="Search…"
            value={q}
            onChange={(e) => onSearch(e.target.value)}
            className="w-56 rounded-2xl border px-4 py-2 text-sm outline-none focus:ring"
            aria-label="Search reports"
          />
          {toRender.length > 0 && (
            <span className="text-sm opacity-70 whitespace-nowrap">
              {toRender.length} item{toRender.length === 1 ? "" : "s"}
            </span>
          )}
          <button
            disabled={filtered.length === 0}
            onClick={openAll}
            className="rounded-2xl border px-3 py-2 text-sm disabled:opacity-50"
            title={filtered.length ? `Open first ${Math.min(filtered.length, 12)} in new tabs` : "No results to open"}
          >
            Open all in new tabs ({filtered.length})
          </button>
        </div>
      </div>

      {toRender.length === 0 && <p>No reports match the current filters.</p>}

      {toRender.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {toRender.map((r) => (
            <li key={r.href} className="rounded-2xl border p-4 hover:shadow">
              <div className="font-medium leading-snug">{r.title ?? r.href.split("/").pop()}</div>
              <div className="text-sm opacity-70">
                {typeof r.year === "number" ? r.year : ""}
                {typeof r.size_bytes === "number" ? ` · ${humanFileSize(r.size_bytes)}` : ""}
                {r.kind && r.kind !== "other" ? ` · ${r.kind[0].toUpperCase()+r.kind.slice(1)}` : ""}
              </div>
              <div className="flex gap-2 pt-2">
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="rounded-xl border px-3 py-1 text-sm hover:shadow">Open</a>
                <a href={r.href} download className="rounded-xl border px-3 py-1 text-sm hover:shadow">Download</a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}