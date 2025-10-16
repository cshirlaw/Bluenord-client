"use client";

import * as React from "react";
import type { ReportItem } from "@/app/investors/new-reports/page";

function inferYear(href: string, date?: string): number | undefined {
  const m = href.match(/\/reports\/(\d{4})\//);
  if (m) return Number(m[1]);
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) return Number(date.slice(0, 4));
  return undefined;
}

type Props = {
  items: ReportItem[];
  years: number[];
};

export default function NewReportsClient({ items, years }: Props) {
  const sortedYears = React.useMemo(() => [...years].sort((a, b) => b - a), [years]);

  const [selectedYear, setSelectedYear] = React.useState<number | "all">(
    sortedYears[0] ?? "all"
  );
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    if (selectedYear !== "all" && !sortedYears.includes(selectedYear)) {
      setSelectedYear(sortedYears[0] ?? "all");
    }
  }, [sortedYears, selectedYear]);

  const filtered = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((it) => {
      const y = inferYear(it.href, it.date);
      if (selectedYear !== "all" && y !== selectedYear) return false;
      if (needle) {
        const hay = `${it.title} ${it.href}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [items, selectedYear, q]);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {sortedYears.map((y) => {
            const active = selectedYear !== "all" && selectedYear === y;
            return (
              <button
                key={y}
                type="button"
                onClick={() => setSelectedYear(y)}
                className={[
                  "rounded-full border px-3 py-1.5 text-sm transition",
                  active
                    ? "bg-black text-white border-black"
                    : "bg-white hover:bg-neutral-50 border-neutral-300",
                ].join(" ")}
                aria-pressed={active}
              >
                {y}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setSelectedYear("all")}
            className={[
              "rounded-full border px-3 py-1.5 text-sm transition",
              selectedYear === "all"
                ? "bg-black text-white border-black"
                : "bg-white hover:bg-neutral-50 border-neutral-300",
            ].join(" ")}
            aria-pressed={selectedYear === "all"}
          >
            All
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="w-64 max-w-[70vw] rounded-2xl border border-neutral-300 px-4 py-2 text-sm outline-none focus:ring focus:ring-neutral-200"
            aria-label="Search reports"
          />
          <span className="text-sm opacity-70">{filtered.length} item{filtered.length === 1 ? "" : "s"}</span>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-sm opacity-70">No reports match the current filters.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it) => {
            const y = inferYear(it.href, it.date);
            return (
              <li
                key={it.href}
                className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm hover:shadow"
              >
                <div className="font-medium leading-snug">
                  {it.title || it.href.split("/").pop()}
                </div>
                <div className="mt-0.5 text-sm opacity-70">
                  {typeof y === "number" ? y : ""}{it.date ? ` · ${it.date}` : ""}{typeof it.sizeMB === "number" ? ` · ${it.sizeMB.toFixed(2)} MB` : ""}
                </div>
                <div className="mt-3 flex gap-2">
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border px-3 py-1.5 text-sm hover:shadow"
                  >
                    Open
                  </a>
                  <a
                    href={it.href}
                    download
                    className="rounded-lg border px-3 py-1.5 text-sm hover:shadow"
                  >
                    Download
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}