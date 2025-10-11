import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import { loadAssets, getPrevNext } from "@/lib/assets";

export default async function HalfdanPage() {
  const { items } = await loadAssets();
  const halfdan = items.find(i => i.id?.toLowerCase() === "halfdan");

  const name = halfdan?.name ?? "Halfdan";
  const summary = halfdan?.summary ?? "Overview, media, and key information for the Halfdan field.";
  const image = halfdan?.image ?? "/images/assets/halfdan/halfdan-hero.jpg";
  const alt = halfdan?.alt ?? "Halfdan field";
  const videoSrc = (halfdan?.videoSrc ?? "").trim();

  const { prev, next } = getPrevNext(items, "halfdan");

  return (
    <div className="space-y-8">
      <PageHero
        imageSrc={image}
        imageAlt={alt}
        title={name}
        intro={summary}
        mode="contain"
        size="compact"
        align="top"
        hAlign="left"
        focus="top"
      />

      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Section eyebrow="Overview" title="Field summary">
          <p className="text-lg text-neutral-700">{summary}</p>
        </Section>

        {videoSrc && (
          <Section eyebrow="Media" title="Video">
            <VideoEmbed src={videoSrc} title="Halfdan video" />
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
              ) : <span />}
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
              ) : <span />}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}