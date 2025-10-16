import path from "node:path";
import { promises as fs } from "node:fs";
import ReportsClient from "@/components/ReportsClient";

export const metadata = {
  title: "Reports & Results | BlueNord",
  description: "Annual and interim reports, results presentations and downloads.",
};

type ServerReport = {
  title: string;
  date: string;      // ISO YYYY-MM-DD
  href: string;      // /reports/<year>/<file>.pdf
  sizeMB?: number;
  featured?: boolean;
  year?: number;     // optional; we’ll derive it anyway
};

// Read and normalise from /public/reports/manifest.json
async function loadFromManifest(): Promise<{ items: ServerReport[]; years: number[] }> {
  const manifestPath = path.join(process.cwd(), "public", "reports", "manifest.json");

  let raw: any = {};
  try {
    const file = await fs.readFile(manifestPath, "utf8");
    raw = JSON.parse(file);
  } catch {
    return { items: [], years: [] };
  }

  const items: ServerReport[] = Array.isArray(raw.items) ? raw.items : [];

  // derive distinct years (numbers only), newest first
  const years = Array.from(
    new Set<number>(
      items
        .map((it) => {
          // Prefer folder year from href: /reports/2025/...
          const m = String(it.href ?? "").match(/\/reports\/(\d{4})\//);
          if (m) return Number(m[1]);
          if (Number.isFinite((it as any).year)) return Number((it as any).year);
          // fallback: parse from date
          const d = new Date(String(it.date ?? ""));
          return Number.isFinite(d.getTime()) ? d.getFullYear() : undefined;
        })
        .filter((y: unknown): y is number => typeof y === "number" && Number.isFinite(y))
    )
  ).sort((a, b) => b - a);

  return { items, years };
}

export const dynamic = "force-static";

export default async function ReportsPage() {
  const { items, years } = await loadFromManifest();

  return (
    <main className="mx-auto max-w-6xl px-4 pb-12">
      {/* Simple hero */}
      <section
        className="relative isolate my-6 overflow-hidden rounded-2xl border border-neutral-200"
        style={{
          backgroundImage: `url('/images/hero/hero.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/35">
          <div className="px-6 py-10 md:px-10">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white drop-shadow">
              Reports &amp; Results
            </h1>
            <p className="mt-2 max-w-2xl text-white/90 drop-shadow">
              Annual and interim reports, results presentations and downloads.
            </p>
          </div>
        </div>
      </section>

      <ReportsClient items={items} years={years} />
    </main>
  );
}