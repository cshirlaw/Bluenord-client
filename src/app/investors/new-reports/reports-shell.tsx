"use client";

import * as React from "react";
import ReportsClient from "@/components/ReportsClient";

type ManifestItem = {
  href: string;     // /reports/<year>/<file>.pdf
  title?: string;
  date?: string;    // ISO
  sizeMB?: number;
  year?: number;
};

export default function ReportsShell() {
  const [items, setItems] = React.useState<ManifestItem[]>([]);
  const [years, setYears] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/reports/manifest.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const arr: ManifestItem[] = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
        const ys = Array.from(
          new Set(
            arr.map((x) => {
              if (typeof x.year === "number") return x.year;
              if (x.date) return new Date(x.date).getFullYear();
              const m = x.href?.match(/\/reports\/(\d{4})\//);
              return m ? Number(m[1]) : undefined;
            }).filter((v): v is number => Number.isFinite(v as number))
          )
        ).sort((a, b) => b - a);

        if (!cancel) {
          setItems(arr);
          setYears(ys);
        }
      } catch (e: any) {
        if (!cancel) setError(e?.message || "Failed to load reports");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">Failed to load: {error}</p>;
  return <ReportsClient items={items as any} years={years} />;
}