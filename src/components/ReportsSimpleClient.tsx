'use client';

import React from "react";

export type ReportItem = {
  title: string;
  href: string;
  year?: number;
  kind?: "report" | "presentation" | "annual" | "other";
  sizeMB?: number;
};

type Props = {
  items: ReportItem[];
  years: number[];
};

function formatMB(n?: number) {
  if (!n || !Number.isFinite(n)) return undefined;
  if (n >= 1024) return `${(n / 1024).toFixed(1)} GB`;
  return `${n.toFixed(1)} MB`;
}

function fileBase(href: string) {
  try {
    const parts = href.split("/");
    return (parts[parts.length - 1] || "").toLowerCase();
  } catch {
    return "";
  }
}

export default function ReportsSimpleClient({ items, years }: Props) {
  const [yearSel, setYearSel] = React.useState<string>("all");
  const [typeSel, setTypeSel] = React.useState<
    "all" | "report" | "presentation" | "annual" | "other"
  >("all");
  const [q, setQ] = React.useState<string>("");

  const filtered = items.filter((it) => {
    const y = yearSel === "all" ? null : Number(yearSel);
    const t = typeSel === "all" ? null : typeSel;
    const needle = q.trim().toLowerCase();

    if (y && it.year !== y) return false;
    if (t && (it.kind ?? "report") !== t) return false;

    if (needle) {
      const title = (it.title || "").toLowerCase();
      const fname = fileBase(it.href);
      if (!title.includes(needle) && !fname.includes(needle)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4" style={{ pointerEvents: "auto" }}>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Year */}
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <span className="font-medium">Year</span>
          <select
            className="rounded-lg border px-2.5 py-1.5 text-sm"
            value={yearSel}
            onChange={(e) => setYearSel(e.target.value)}
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
            className="rounded-lg border px-2.5 py-1.5 text-sm"
            value={typeSel}
            onChange={(e) =>
              setTypeSel(
                (e.target.value as "all" | "report" | "presentation" | "annual" | "other") ??
                  "all"
              )
            }
          >
            <option value="all">All</option>
            <option value="report">Reports</option>
            <option value="presentation">Presentations</option>
            <option value="annual">Annual</option>
            <option value="other">Other</option>
          </select>
        </label>

        {/* Search */}
        <div className="ml-auto flex items-center gap-2">
          <input
            type="search"
            placeholder="Search by title or filename…"
            className="w-[320px] max-w-[55vw] rounded-lg border px-3 py-1.5 text-sm"
            value={q}
            onChange={(e) => setQ(e.target.value)} // instant filtering
            onFocus={(e) => e.currentTarget.select()}
          />
          <span className="text-xs text-slate-500">
            {filtered.length}/{items.length} items
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((it) => {
          const size = formatMB(it.sizeMB);
          const kindLabel =
            it.kind === "presentation"
              ? "Presentation"
              : it.kind === "annual"
              ? "Annual"
              : it.kind === "other"
              ? "Document"
              : "Report";

          return (
            <article
              key={`${it.href}-${it.title}`}
              className="rounded-2xl border p-4 shadow-sm"
            >
              <h3 className="text-slate-900 font-medium leading-snug">{it.title}</h3>
              <p className="mt-1 text-xs text-slate-500">
                {it.year ?? "—"}
                {size ? <> · {size}</> : null} · {kindLabel}
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
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-slate-500">No matches. Try clearing filters.</p>
      )}
    </div>
  );
}