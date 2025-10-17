// src/components/ReportsLiteClient.tsx
"use client";

import React from "react";

type Item = {
  href: string;
  title: string;
  year?: number;
  date: string;
  size_bytes?: number;
};

type Props = {
  items: Item[];
  years: number[];
};

type Kind = "all" | "report" | "presentation" | "annual";

function fileSize(bytes?: number) {
  if (!bytes || bytes <= 0) return "";
  const u = ["KB", "MB", "GB", "TB"];
  let b = bytes, i = -1;
  do { b /= 1024; i++; } while (b >= 1024 && i < u.length - 1);
  return `${b.toFixed(1)} ${u[i]}`;
}

function detectKind(it: Item): Exclude<Kind, "all"> {
  const t = `${it.title} ${it.href}`.toLowerCase();
  if (/annual report|annual-report|annual\s*&\s*sustainability/.test(t)) return "annual";
  if (/presentation|deck|capital markets|investor day/.test(t)) return "presentation";
  if (/(report|financial statements|accounts|quarter|q[1-4]\b|interim|half[-\s]?year|full[-\s]?year)/.test(t)) return "report";
  return "report";
}

export default function ReportsLiteClient({ items, years }: Props) {
  const enriched = React.useMemo(() => {
    return items
      .map((it) => ({ ...it, kind: detectKind(it) }))
      .sort((a, b) => {
        const ay = a.year ?? 0, by = b.year ?? 0;
        if (by !== ay) return by - ay;
        return (b.date || "").localeCompare(a.date || "");
      });
  }, [items]);

  const [year, setYear] = React.useState<number | "all">(years[0] ?? "all");
  const [kind, setKind] = React.useState<Kind>("report");
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    return enriched.filter((r) => {
      if (year !== "all" && r.year !== year) return false;
      if (kind !== "all" && r.kind !== kind) return false;
      if (needle) {
        const hay = `${r.title} ${r.href}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [enriched, year, kind, q]);

  return (
    <section className="space-y-6 relative">
      {/* Controls: force on top + pointer events explicitly enabled */}
      <div
        className="relative z-[100] flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        style={{ pointerEvents: "auto" }}
      >
        <div className="flex flex-wrap items-center gap-2">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYear(y)}
              aria-pressed={year === y}
              className={[
                "inline-flex items-center rounded-full border px-3 py-1 text-sm transition",
                year === y ? "bg-black text-white border-black" : "bg-white text-gray-900 hover:bg-gray-50",
              ].join(" ")}
            >
              {y}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setYear("all")}
            aria-pressed={year === "all"}
            className={[
              "inline-flex items-center rounded-full border px-3 py-1 text-sm transition",
              year === "all" ? "bg-black text-white border-black" : "bg-white text-gray-900 hover:bg-gray-50",
            ].join(" ")}
          >
            All
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value as Kind)}
            className="rounded-2xl border px-3 py-2 text-sm bg-white"
            aria-label="Filter type"
          >
            <option value="report">Reports</option>
            <option value="presentation">Presentations</option>
            <option value="annual">Annual</option>
            <option value="all">All</option>
          </select>

          <input
            type="search"
            placeholder="Search…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-56 rounded-2xl border px-4 py-2 text-sm outline-none focus:ring"
            aria-label="Search reports"
          />

          <span className="text-sm opacity-70 whitespace-nowrap">
            {filtered.length} item{filtered.length === 1 ? "" : "s"}
          </span>

          <button
            type="button"
            disabled={filtered.length === 0}
            onClick={() => {
              const max = Math.min(filtered.length, 12);
              filtered.slice(0, max).forEach((r, i) => {
                setTimeout(() => window.open(r.href, "_blank", "noopener,noreferrer"), i * 100);
              });
            }}
            className="rounded-2xl border px-3 py-2 text-sm disabled:opacity-50"
          >
            Open first {Math.min(filtered.length, 12) || 0} in tabs
          </button>
        </div>
      </div>

      {/* Results: also ensure they are above any stray layers */}
      <div className="relative z-[50]" style={{ pointerEvents: "auto" }}>
        {filtered.length === 0 ? (
          <p>No reports match the current filters.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <li key={r.href} className="rounded-2xl border p-4 hover:shadow">
                <div className="font-medium leading-snug">{r.title}</div>
                <div className="text-sm opacity-70">
                  {typeof r.year === "number" ? r.year : ""}
                  {typeof r.size_bytes === "number" ? ` · ${fileSize(r.size_bytes)}` : ""}
                  {/* @ts-expect-error added by enrichment */}
                  {r.kind ? ` · ${r.kind[0].toUpperCase() + r.kind.slice(1)}` : ""}
                </div>
                <div className="flex gap-2 pt-2">
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border px-3 py-1 text-sm hover:shadow"
                  >
                    Open
                  </a>
                  <a href={r.href} download className="rounded-xl border px-3 py-1 text-sm hover:shadow">
                    Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}