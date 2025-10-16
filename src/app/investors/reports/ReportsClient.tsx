"use client";

import React from "react";
import Chip from "@/components/Chip";
import TypeDropdown from "@/components/TypeDropdown";

type Kind = "presentation" | "report" | "annual" | "other";
type TypeSel = "all" | "presentation" | "report" | "annual";

type ManifestItem = {
  href: string;
  title: string;
  year?: number;
  size_bytes?: number;
  kind?: Kind;
};

function human(bytes?: number) {
  if (!bytes || bytes <= 0) return "";
  const u = ["KB", "MB", "GB", "TB"];
  let b = bytes, i = -1;
  do { b/=1024; i++; } while (b>=1024 && i<u.length-1);
  return `${b.toFixed(1)} ${u[i]}`;
}

function isPresentation(x: ManifestItem) {
  const t = `${x.title} ${x.href}`.toLowerCase();
  return /presentation|deck|cmd|capital markets|investor day/.test(t);
}
function isAnnual(x: ManifestItem) {
  const t = `${x.title} ${x.href}`.toLowerCase();
  return /annual report|annual-report|annual and sustainability|annual\s*&\s*sustainability/.test(t);
}
function detectKind(x: ManifestItem): Kind {
  if (isPresentation(x)) return "presentation";
  if (isAnnual(x)) return "annual";
  const t = `${x.title} ${x.href}`.toLowerCase();
  if (/(report|financial statements|accounts|quarter|q[1-4]\b|interim|half[-\s]?year|h[12]\b|full[-\s]?year)/.test(t))
    return "report";
  return "other";
}

const YEAR_FILTERS = [
  { key: "y2025", label: "2025", contains: (y?: number) => y === 2025 },
  { key: "y2024", label: "2024", contains: (y?: number) => y === 2024 },
  { key: "y2023", label: "2023", contains: (y?: number) => y === 2023 },
  { key: "y2022", label: "2022", contains: (y?: number) => y === 2022 },
  { key: "r2013_2021", label: "2013–2021", contains: (y?: number) => typeof y==="number" && y>=2013 && y<=2021 },
  { key: "r2005_2012", label: "2005–2012", contains: (y?: number) => typeof y==="number" && y>=2005 && y<=2012 },
  { key: "all", label: "All", contains: (_?: number) => true },
] as const;
type BucketKey = typeof YEAR_FILTERS[number]["key"];

export default function ReportsClient() {
  const [items, setItems] = React.useState<ManifestItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [q, setQ] = React.useState("");
  const [bucket, setBucket] = React.useState<BucketKey>("y2025");
  const [typeSel, setTypeSel] = React.useState<TypeSel>("all");

  React.useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true); setError(null);
        // Static file created by the build script:
        const res = await fetch("/data/reports.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const arr: ManifestItem[] = (Array.isArray(data?.items) ? data.items : []).map((x: ManifestItem) => ({
          ...x, kind: detectKind(x)
        }));
        if (!cancel) setItems(arr);
      } catch (e: any) {
        if (!cancel) setError(e?.message || "Failed to load");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  const filtered = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((x) => {
      const yrOk = YEAR_FILTERS.find((y) => y.key === bucket)!.contains(x.year);
      if (!yrOk) return false;
      if (typeSel !== "all" && x.kind !== typeSel) return false;
      if (needle) {
        const hay = `${x.title} ${x.href}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [items, q, bucket, typeSel]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {YEAR_FILTERS.map((y) => (
            <Chip key={y.key} active={bucket===y.key} onClick={() => setBucket(y.key)}>
              {y.label}
            </Chip>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <TypeDropdown value={typeSel} onChange={(v)=>setTypeSel(v)} />
          <input
            type="search"
            placeholder="Search…"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            className="w-56 rounded-2xl border px-4 py-2 text-sm outline-none focus:ring"
          />
          <span className="text-sm opacity-70 whitespace-nowrap">
            {loading ? "Loading…" : error ? "Error" : `${filtered.length} item${filtered.length===1?"":"s"}`}
          </span>
        </div>
      </div>

      {/* States */}
      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <div className="font-medium mb-1">Failed to load</div>
          <div>{error}</div>
          <div className="mt-2 opacity-70">Expected file: <code>/public/data/reports.json</code></div>
        </div>
      )}
      {!error && !loading && filtered.length === 0 && (
        <p className="opacity-70">No reports match the current filters.</p>
      )}

      {/* Grid */}
      {!error && filtered.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <li key={r.href} className="rounded-2xl border p-4 hover:shadow">
              <div className="font-medium leading-snug">{r.title}</div>
              <div className="text-sm opacity-70">
                {typeof r.year === "number" ? r.year : ""}
                {r.size_bytes ? ` · ${human(r.size_bytes)}` : ""}
                {r.kind && r.kind !== "other" ? ` · ${r.kind[0].toUpperCase()+r.kind.slice(1)}` : ""}
              </div>
              <div className="flex gap-2 pt-2">
                <a href={r.href} target="_blank" rel="noopener noreferrer"
                   className="rounded-xl border px-3 py-1 text-sm hover:shadow">Open</a>
                <a href={r.href} download
                   className="rounded-xl border px-3 py-1 text-sm hover:shadow">Download</a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}