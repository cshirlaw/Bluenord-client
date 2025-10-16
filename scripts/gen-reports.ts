/**
 * Build-time manifest generator for /public/reports/**\/*.pdf
 * Produces /public/reports/manifest.json consumed by the IR page.
 *
 * Run: npm run reports:gen
 */
import { promises as fs } from "node:fs";
import path from "node:path";

type ReportItem = {
  href: string;        // e.g. /reports/2025/file.pdf
  title: string;       // prettified from filename
  year?: number;       // inferred from folder or filename
  date?: string;       // ISO YYYY-MM-DD (from filename or file mtime)
  size_bytes?: number; // file size
};

async function exists(p: string) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  let entries: any[] = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...await walk(full));
    } else if (e.isFile() && e.name.toLowerCase().endsWith(".pdf")) {
      out.push(full);
    }
  }
  return out;
}

function prettyTitle(filename: string): string {
  return filename
    .replace(/\.pdf$/i, "")
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferDateFromName(name: string): string | undefined {
  // pick up 2025-09-10 or 20250910 or 2025_09_10 etc.
  const m = name.match(/(20\d{2})[-_\.]?(0[1-9]|1[0-2])[-_\.]?(0[1-9]|[12]\d|3[01])/);
  if (!m) return undefined;
  const [, y, mo, d] = m;
  return `${y}-${mo}-${d}`;
}

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  const reportsRoot = path.join(publicDir, "reports");

  if (!(await exists(reportsRoot))) {
    console.error("No public/reports directory found. Nothing to do.");
    return;
  }

  const files = await walk(reportsRoot);
  const items: ReportItem[] = [];

  for (const abs of files) {
    const relFromPublic = path.relative(publicDir, abs);   // e.g. reports/2025/foo.pdf
    const href = `/${relFromPublic.split(path.sep).join("/")}`;

    const file = path.basename(abs);
    const dirParts = relFromPublic.split(path.sep);
    const yearFromFolder = Number(dirParts[1]); // reports/<year>/...

    let stat: any = null;
    try { stat = await fs.stat(abs); } catch { /* ignore */ }

    const title = prettyTitle(file);
    const dateFromName = inferDateFromName(file);

    let date = dateFromName;
    if (!date && stat?.mtime) {
      const d = new Date(stat.mtime);
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      date = `${d.getFullYear()}-${mm}-${dd}`;
    }

    const year = Number.isFinite(yearFromFolder) ? yearFromFolder : (date ? Number(date.slice(0, 4)) : undefined);

    items.push({
      href,
      title,
      year,
      date,
      size_bytes: stat?.size,
    });
  }

  // newest first by date, then by title
  items.sort((a, b) => {
    const da = a.date ?? "1970-01-01";
    const db = b.date ?? "1970-01-01";
    if (db !== da) return db.localeCompare(da);
    return (a.title || "").localeCompare(b.title || "");
  });

  const outPath = path.join(reportsRoot, "manifest.json");
  const payload = {
    generatedAt: new Date().toISOString(),
    count: items.length,
    items,
  };

  await fs.writeFile(outPath, JSON.stringify(payload, null, 2), "utf8");
  console.log(`Wrote ${outPath} with ${items.length} items.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});