// src/lib/assets.ts
import { promises as fs } from "node:fs";
import path from "node:path";

export type AssetPhoto = { src: string; alt?: string };
export type AssetFact = { label: string; value: string };

export type AssetItem = {
  id: string;
  name: string;
  summary?: string;
  image?: string;
  alt?: string;
  videoSrc?: string;
  photos?: AssetPhoto[];
  facts?: AssetFact[]; // <- key–value facts for the Overview box (optional)
};

export type AssetsContent = {
  hero?: { title?: string; lede?: string };
  items: AssetItem[];
};

export async function loadAssets(): Promise<AssetsContent> {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/content/assets.json"),
      "utf8"
    );
    const json = JSON.parse(file);
    const items: AssetItem[] = Array.isArray(json.items) ? json.items : [];
    return { hero: json.hero ?? {}, items };
  } catch {
    return { items: [] };
  }
}

export function getPrevNext(items: AssetItem[], id: string) {
  const idx = items.findIndex((i) => i.id?.toLowerCase() === id.toLowerCase());
  if (idx < 0) return { prev: null, next: null };
  const prev = idx > 0 ? items[idx - 1] : null;
  const next = idx < items.length - 1 ? items[idx + 1] : null;
  return { prev, next };
}