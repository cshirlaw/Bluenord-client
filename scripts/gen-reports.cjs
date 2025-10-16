// scripts/gen-reports.cjs
// Build a manifest from /public/reports/<year>/*.pdf → /public/reports/manifest.json

const fs = require("node:fs/promises");
const path = require("node:path");

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  const reportsRoot = path.join(publicDir, "reports");

  // If /public/reports doesn't exist, create empty manifest and exit
  try {
    await fs.access(reportsRoot);
  } catch {
    await writeManifest({ items: [], years: [] });
    console.log("No /public/reports directory found. Wrote empty manifest.");
    return;
  }

  // Collect year folders
  const entries = await fs.readdir(reportsRoot, { withFileTypes: true });
  const years = entries
    .filter((e) => e.isDirectory() && /^\d{4}$/.test(e.name))
    .map((e) => Number(e.name))
    .sort((a, b) => b - a);

  const items = [];

  for (const year of years) {
    const yearDir = path.join(reportsRoot, String(year));
    let files = [];
    try {
      files = await fs.readdir(yearDir);
    } catch {
      continue;
    }

    for (const file of files) {
      if (!file.toLowerCase().endsWith(".pdf")) continue;

      const abs = path.join(yearDir, file);
      let stat = null;
      try {
        stat = await fs.stat(abs);
      } catch {}

      // Title from filename
      const pretty = file
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/\.pdf$/i, "");

      // Try to parse date (YYYY[-_]MM[-_]DD) from filename; fallback to mtime; else Jan 1
      let isoDate = `${year}-01-01`;
      const m = file.match(/(20\d{2})[-_\.]?(0[1-9]|1[0-2])[-_\.]?(0[1-9]|[12]\d|3[01])/);
      if (m) {
        const [, y, mo, d] = m;
        isoDate = `${y}-${mo}-${d}`;
      } else if (stat?.mtime) {
        const d = new Date(stat.mtime);
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        isoDate = `${d.getFullYear()}-${mm}-${dd}`;
      }

      const size_bytes = stat?.size;

      items.push({
        href: `/reports/${year}/${file}`,
        title: pretty,
        year,
        date: isoDate,
        size_bytes
      });
    }
  }

  // Sort: newest date first, then title
  items.sort((a, b) => {
    const da = a.date ?? "1970-01-01";
    const db = b.date ?? "1970-01-01";
    if (db !== da) return db.localeCompare(da);
    return (a.title || "").localeCompare(b.title || "");
  });

  await writeManifest({ items, years });
  console.log(`Wrote manifest with ${items.length} items across years: ${years.join(", ")}`);
}

async function writeManifest(obj) {
  const outDir = path.join(process.cwd(), "public", "reports");
  const out = path.join(outDir, "manifest.json");
  try { await fs.mkdir(outDir, { recursive: true }); } catch {}
  await fs.writeFile(out, JSON.stringify(obj, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});