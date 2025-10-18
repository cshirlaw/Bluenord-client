// scripts/gen-reports.cjs
// Recursively scan /public/reports/**.pdf → /public/reports/manifest.json
// Works with nested folders; infers year from folder name or filename or file mtime.

const fs = require("node:fs/promises");
const path = require("node:path");

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function walk(dir) {
  const out = [];
  let entries = [];
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

function prettyTitle(filename) {
  return filename
    .replace(/\.pdf$/i, "")
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferDateFromName(name) {
  // 2025-09-10 / 20250910 / 2025_09_10 etc.
  const m = name.match(/(20\d{2})[-_\.]?(0[1-9]|1[0-2])[-_\.]?(0[1-9]|[12]\d|3[01])/);
  if (!m) return undefined;
  const [, y, mo, d] = m;
  return `${y}-${mo}-${d}`;
}

function inferYearFromPath(relFromPublic, dateFromName) {
  // Expect like "reports/2024/file.pdf" or deeper.
  const parts = relFromPublic.split(path.sep);
  // Find a 4-digit year segment anywhere in the path
  const yPart = parts.find(seg => /^\d{4}$/.test(seg));
  if (yPart) return Number(yPart);
  // Fallback to year from date in filename
  if (dateFromName) return Number(dateFromName.slice(0, 4));
  return undefined;
}

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  const reportsRoot = path.join(publicDir, "reports");

  if (!(await exists(reportsRoot))) {
    await writeManifest({ items: [], years: [] });
    console.log("No public/reports directory found. Wrote empty manifest.");
    return;
  }

  const files = await walk(reportsRoot);
  const items = [];

  for (const abs of files) {
    const relFromPublic = path.relative(publicDir, abs);   // e.g. reports/2025/foo.pdf or reports/2013-2021/...
    const href = "/" + relFromPublic.split(path.sep).join("/");

    const file = path.basename(abs);
    let stat = null;
    try { stat = await fs.stat(abs); } catch {}

    const title = prettyTitle(file);
    const dateFromName = inferDateFromName(file);

    let date = dateFromName;
    if (!date && stat?.mtime) {
      const d = new Date(stat.mtime);
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      date = `${d.getFullYear()}-${mm}-${dd}`;
    }

    const year = inferYearFromPath(relFromPublic, date);

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

  const yearsSet = new Set(items.map(i => i.year).filter(Boolean));
  const years = Array.from(yearsSet).sort((a, b) => b - a);

  await writeManifest({ items, years });
  console.log(`Wrote manifest with ${items.length} items across years: ${years.join(", ")}`);
}

async function writeManifest(obj) {
  const outDir = path.join(process.cwd(), "public", "reports");
  const out = path.join(outDir, "manifest.json");
  try { await fs.mkdir(outDir, { recursive: true }); } catch {}
  await fs.writeFile(out, JSON.stringify(obj, null, 2), "utf8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});