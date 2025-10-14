import { promises as fs } from "node:fs";
import path from "node:path";
import HomeHero from "@/components/HomeHero";
import KeyInfoGrid from "@/components/KeyInfoGrid";

type CTA = { label: string; href: string };
type KeyCard = { heading: string; metric: string; sub?: string; kicker?: string; expandHref?: string };

type HomeFile = {
  hero: {
    // new
    backgroundImage?: string;
    markImage?: string;
    heading?: string;
    lede?: string;
    ctas?: CTA[];
    // legacy
    eyebrow?: string;
    title?: string;
    intro?: string;
    image?: string;
    alt?: string;
  };
  keyInfo?: { title: string; cards: KeyCard[] };
  // legacy (ignored by new layout but harmless if present)
  highlights?: any[];
  ctas?: CTA[];
};

async function loadHome(): Promise<HomeFile> {
  try {
    const file = await fs.readFile(path.join(process.cwd(), "src/content/home.json"), "utf8");
    return JSON.parse(file) as HomeFile;
  } catch {
    // minimal fallback
    return {
      hero: {
        heading: "BlueNord\nEurope's energy,\nour expertise.",
        lede: "Focused North Sea operator delivering reliable value.",
        backgroundImage: "/images/hero/hero.jpg",
        alt: "Foamy sea",
        ctas: [{ label: "Assets", href: "/assets" }]
      },
      keyInfo: {
        title: "BlueNord Key Information",
        cards: []
      }
    };
  }
}

export const dynamic = "force-static";

export default async function HomePage() {
  const { hero, keyInfo } = await loadHome();

  return (
    <main className="min-h-screen">
      <HomeHero
        backgroundImage={hero.backgroundImage}
        markImage={hero.markImage}
        heading={hero.heading}
        lede={hero.lede}
        // legacy fallbacks:
        title={hero.title}
        intro={hero.intro}
        image={hero.image}
        alt={hero.alt}
        ctas={hero.ctas}
      />
      {keyInfo?.cards?.length ? (
        <KeyInfoGrid title={keyInfo.title} cards={keyInfo.cards} />
      ) : null}
    </main>
  );
}