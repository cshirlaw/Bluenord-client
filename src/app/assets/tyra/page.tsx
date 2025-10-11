import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import { loadAssets, getPrevNext } from "@/lib/assets";

export default async function TyraPage() {
  const { items } = await loadAssets();
  const tyra = items.find(i => i.id?.toLowerCase() === "tyra");

  const name = tyra?.name ?? "Tyra";
  const summary =
    tyra?.summary ?? "Overview, media, and key milestones for the Tyra redevelopment.";
  const image = tyra?.image ?? "/images/assets/tyra/tyra-original.jpg";
  const alt = tyra?.alt ?? "Tyra field";
  const videoSrc = (tyra?.videoSrc ?? "").trim();

  const { prev, next } = getPrevNext(items, "tyra");

  return (
    <div className="space-y-8">
      <PageHero
  imageSrc={image}
  imageAlt={alt}
  title={name}
  intro={summary}
  mode="contain"   // no crop
  size="compact"
  align="top"
  hAlign="left"
  focus="top"
  // maskBottom removed (or set maskBottom={0})
/>

      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Section eyebrow="Overview" title="Field summary">
          <p className="text-lg text-neutral-700">{summary}</p>
        </Section>

        {videoSrc && (
          <Section eyebrow="Media" title="Tyra development">
            <VideoEmbed src={videoSrc} title="Tyra development" />
          </Section>
        )}

        {/* Dynamic pager from JSON order */}
        <section aria-label="Asset navigation" className="pt-2">
          <div className="grid grid-cols-3 items-center">
            <div className="justify-self-start">
              {prev ? (
                <Link
                  href={`/assets/${prev.id}`}
                  className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring"
                >
                  <span>←</span><span>{prev.name}</span>
                </Link>
              ) : (
                <span />
              )}
            </div>
            <div className="justify-self-center">
              <Link
                href="/assets"
                className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring"
              >
                All assets
              </Link>
            </div>
            <div className="justify-self-end">
              {next ? (
                <Link
                  href={`/assets/${next.id}`}
                  className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring"
                >
                  <span>{next.name}</span><span>→</span>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}