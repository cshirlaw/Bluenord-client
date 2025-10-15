import { promises as fs } from "node:fs";
import path from "node:path";
import HomeHero from "@/components/HomeHero";
import KeyInfoGrid from "@/components/KeyInfoGrid";
import VideoEmbed from "@/components/VideoEmbed";

type CTA = { label: string; href: string };
type KeyCard = { heading: string; metric: string; sub?: string; kicker?: string; expandHref?: string };

type HomeFile = {
  hero: {
    backgroundImage?: string;
    markImage?: string;
    heading?: string;
    lede?: string;
    ctas?: CTA[];
    // legacy fallbacks (ignored if new fields exist)
    eyebrow?: string;
    title?: string;
    intro?: string;
    image?: string;
    alt?: string;
  };
  keyInfo?: { title: string; cards: KeyCard[] };
};

async function loadHome(): Promise<HomeFile> {
  const file = await fs.readFile(path.join(process.cwd(), "src/content/home.json"), "utf8");
  return JSON.parse(file) as HomeFile;
}

export const dynamic = "force-static";

export default async function HomePage() {
  const { hero, keyInfo } = await loadHome();

  return (
    <main className="min-h-screen overflow-x-hidden">
      <HomeHero
        backgroundImage={hero.backgroundImage ?? hero.image}
        markImage={hero.markImage}
        heading={hero.heading ?? hero.title}
        lede={hero.lede ?? hero.intro}
        image={hero.image}
        alt={hero.alt}
        ctas={hero.ctas}
      />

      {keyInfo?.cards?.length ? (
        <KeyInfoGrid title={keyInfo.title} cards={keyInfo.cards} />
      ) : null}

      {/* Rebrand video */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-semibold mb-4">Noreco → BlueNord</h2>
        <VideoEmbed
          src="https://player.vimeo.com/video/840426356"
          title="Noreco to BlueNord"
        />
      </section>
    </main>
  );
}