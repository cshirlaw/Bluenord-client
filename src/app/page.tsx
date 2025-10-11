import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import StatsRow from "@/components/StatsRow";
import VideoEmbed from "@/components/VideoEmbed";
import { promises as fs } from "node:fs";
import path from "node:path";

type Highlight = { title: string; text?: string; href: string };
type HomeContent = {
  hero: { eyebrow?: string; title: string; intro?: string; image?: string; alt?: string };
  highlights?: Highlight[];
};

async function loadHome(): Promise<HomeContent> {
  try {
    const file = await fs.readFile(path.join(process.cwd(), "src/content/home.json"), "utf8");
    return JSON.parse(file) as HomeContent;
  } catch {
    return {
      hero: {
        title: "BlueNord",
        intro: "Focused North Sea operator.",
        image: "/images/hero-offshore.png",
        alt: "BlueNord offshore",
      },
      highlights: [
        { title: "Company",   text: "At a glance",                       href: "/company" },
        { title: "Assets",    text: "Tyra, Halfdan, Dan, Gorm",          href: "/assets" },
        { title: "Investors", text: "Reports, Share & Debt",             href: "/investors" },
        { title: "Financials",text: "Key metrics & featured PDF",        href: "/financials" },
      ],
    };
  }
}

export default async function HomePage() {
  const data = await loadHome();
  const hero = data.hero;

  return (
    <div className="space-y-12">
      <PageHero
  imageSrc={hero.image ?? "/images/hero-offshore.png"}
  imageAlt={hero.alt ?? "BlueNord offshore"}
  title={hero.title}
  intro={hero.intro}
>
        {data.highlights?.length ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.highlights.map((h, i) => (
              <Link
                key={i}
                href={h.href}
                className="block rounded-2xl bg-white/95 backdrop-blur border p-4 hover:shadow focus:outline-none focus:ring"
              >
                <h3 className="font-semibold">{h.title}</h3>
                {h.text && <p className="text-sm opacity-70">{h.text}</p>}
              </Link>
            ))}
          </div>
        ) : null}
      </PageHero>

      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Section eyebrow="Highlights" title="Key metrics">
          <StatsRow />
        </Section>

        <Section eyebrow="Media" title="Noreco to BlueNord">
          <VideoEmbed src="https://player.vimeo.com/video/840426356" title="Noreco to BlueNord" />
        </Section>
      </main>
    </div>
  );
}