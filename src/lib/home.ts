import { promises as fs } from "node:fs";
import path from "node:path";

export type HomeCTA = { label: string; href: string };
export type KeyCard = {
  heading: string;
  metric: string;
  sub?: string;
  kicker?: string;
  expandHref?: string;
};

export type HomeContent = {
  hero: {
    backgroundImage: string;
    markImage?: string;
    heading: string;   // allow \n for line breaks
    lede?: string;     // allow \n\n for paragraphs
    ctas?: HomeCTA[];
  };
  keyInfo: {
    title: string;
    cards: KeyCard[];
  };
};

export async function loadHome(): Promise<HomeContent> {
  const file = await fs.readFile(
    path.join(process.cwd(), "src/content/home.json"),
    "utf8"
  );
  const json = JSON.parse(file);
  return json as HomeContent;
}