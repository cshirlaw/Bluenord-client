import path from "node:path";
import { promises as fs } from "node:fs";
import NewReportsClient from "@/components/NewReportsClient";

export const metadata = {
  title: "New Reports | BlueNord",
  description: "Browse and search reports stored in /public/reports/<year>.",
};

export type ReportItem = {
  title: string;
  href: string;     // /reports/<year>/<file>.pdf
  date?: string;    // ISO yyyy-mm-dd (best-effort)
  sizeMB?: number;  // rounded to 2dp
};

// Read PDFs from public/reports/<year>/*.pdf
async function loadReportsFromPublic(): Promise<{ items: ReportItem[]; years: number[] }> {
  const reportsRoot = path.join(process.cwd(), "public", "reports");

  let dirents: { name: string; isDir: boolean }[] = [];
  try {
    const found = await fs.readdir(reportsRoot, { withFileTypes: true });
    dirents = found.map(d => ({ name: d.name, isDir: d.isDirectory() }));
  } catch {
    return { items: [], years: [] };
  }

  const numericYears = dirents
    .filter(d => d.isDir)
    .map(d => Number(d.name))
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => b - a);

  const items: ReportItem[] = [];

  for (const year of numericYears) {
    const yearDir = path.join(reportsRoot, String(year));
    let files: string[] = [];
    try {
      files = await fs.readdir(yearDir);
    } catch {
      continue;
    }

    for (const file of files) {
      if (!file.toLowerCase().endsWith(".pdf")) continue;

      const abs = path.join(yearDir, file);
      let stat: any = null;
      try {
        stat = await fs.stat(abs);
      } catch {}

      // Try to get a reasonable title from the filename
      const title = file
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/\.pdf$/i, "")
        .trim();

      // Try parse YYYY[-_.]MM[-_.]DD from filename; fallback to mtime; else 1 Jan of year
      let dateISO = `${year}-01-01`;
      const m = file.match(/(20\d{2})[-_.]?(0[1-9]|1[0-2])[-_.]?(0[1-9]|[12]\d|3[01])/);
      if (m) {
        const [, y, mo, d] = m;
        dateISO = `${y}-${mo}-${d}`;
      } else if (stat?.mtime) {
        const d = new Date(stat.mtime);
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        dateISO = `${d.getFullYear()}-${mm}-${dd}`;
      }

      const sizeMB = stat?.size ? Math.round((stat.size / (1024 * 1024)) * 100) / 100 : undefined;

      items.push({
        title,
        href: `/reports/${year}/${file}`,
        date: dateISO,
        sizeMB,
      });
    }
  }

  // Sort newest first by date, then by title
  items.sort((a, b) => {
    const da = a.date ?? "1970-01-01";
    const db = b.date ?? "1970-01-01";
    if (db !== da) return db.localeCompare(da);
    return (a.title || "").localeCompare(b.title || "");
  });

  return { items, years: numericYears };
}

export const dynamic = "force-static";

export default async function NewReportsPage() {
  const { items, years } = await loadReportsFromPublic();

  return (
    <main className="mx-auto max-w-6xl px-4 pb-14">
      {/* Simple, non-overlapping hero */}
      <section
        className="my-6 overflow-hidden rounded-2xl border border-neutral-200"
        style={{
          backgroundImage: `url('/images/hero/hero.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/35 px-6 py-10 md:px-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white drop-shadow">
            New Reports
          </h1>
          <p className="mt-2 max-w-2xl text-white/90 drop-shadow">
            Browse and search reports stored in <code className="opacity-90">/public/reports/&lt;year&gt;</code>.
          </p>
        </div>
      </section>

      <NewReportsClient items={items} years={years} />
    </main>
  );
}