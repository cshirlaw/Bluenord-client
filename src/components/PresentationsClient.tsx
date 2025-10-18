"use client";

import React from "react";

type Item = {
  href: string;
  title: string;
  date?: string;   // ISO
  year?: number;
  sizeMB?: number; // optional
};

function humanMB(n?: number) {
  if (!n || n <= 0) return undefined;
  return `${n.toFixed(1)} MB`;
}

function isPresentation(t: string) {
  const s = t.toLowerCase();
  return (
    s.includes("presentation") ||
    s.includes("investor day") ||
    s.includes("capital markets") ||
    s.includes("conference") ||
    /(?:^|\/)presentations?\//.test(s)
  );
}

export default function PresentationsClient({
  items,
  years,
}: {
  items: Item[];
  years: number[];
}) {
  // Simple local UI state (no external components)
  const [q, setQ] = React.useState("");
  const [year, setYear] = React.useState<string>("all");

  const presentations = React.useMemo(() => {
    // Only keep items that look like presentations
    const base = items.filter((it) => isPresentation(`${it.title} ${it.href}`));

    // Search
    const needle = q.trim().toLowerCase();
    const searched = needle
      ? base.filter((it) =>
          (`${it.title} ${it.href}`).toLowerCase().includes(needle)
        )
      : base;

    // Year filter
    const filtered =
      year === "all"
        ? searched
        : searched.filter((it) => String(it.year ?? "") === year);

    // Sort: newest year first, then title
    return [...filtered].sort((a, b) => {
      const ay = a.year ?? 0;
      const by = b.year ?? 0;
      if (by !== ay) return by - ay;
      return (a.title ?? a.href).localeCompare(b.title ?? b.href);
    });
  }, [items, q, year]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-2xl border px-3 py-2 text-sm bg-white"
          >
            <option value="all">All</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search presentations…"
            className="w-64 rounded-2xl border px-3 py-2 text-sm outline-none focus:ring"
            aria-label="Search presentations"
          />
          <span className="text-sm opacity-70 whitespace-nowrap">
            {presentations.length} item{presentations.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* List */}
      {presentations.length === 0 ? (
        <p>No presentations match the current filters.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {presentations.map((r) => (
            <li key={r.href} className="rounded-2xl border p-4 hover:shadow">
              <div className="font-medium leading-snug">
                {r.title || r.href.split("/").pop()}
              </div>
              <div className="text-sm opacity-70">
                {typeof r.year === "number" ? r.year : ""}
                {typeof r.sizeMB === "number" ? ` · ${humanMB(r.sizeMB)}` : ""}
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
                <a
                  href={r.href}
                  download
                  className="rounded-xl border px-3 py-1 text-sm hover:shadow"
                >
                  Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}