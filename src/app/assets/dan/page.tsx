import React from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import { loadAssets, getPrevNext } from "@/lib/assets";

type Overview = string | string[];

export default async function DanPage() {
  const { items } = await loadAssets();
  const dan = items.find(i => i.id?.toLowerCase() === "dan");

  const name = dan?.name ?? "Dan";
  const summary = dan?.summary ?? "Overview, media, and key information for the Dan field.";
  const overview: Overview | undefined = (dan as any)?.overview;
  const image = dan?.image ?? "/images/assets/dan/dan-hero.jpg";
  const alt = dan?.alt ?? "Dan field";
  const videoSrc = (dan?.videoSrc ?? "").trim();
  const photos = (dan?.photos?.length ? dan.photos : [{ src: image, alt }]).map(p => ({
    src: p.src, alt: p.alt ?? name
  }));

  const { prev, next } = getPrevNext(items, "dan");

  return (
    <div className="space-y-8">
      <PageHero imageSrc={image} imageAlt={alt} title={name} intro={summary} />

      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Section eyebrow="Overview" title="Field summary">
          <div className="prose max-w-none">
            {Array.isArray(overview) && overview.length ? (
              overview.map((para, i) => <p key={i}>{para}</p>)
            ) : typeof overview === "string" && overview.trim() ? (
              <p>{overview}</p>
            ) : (
              <p className="text-lg text-neutral-700">{summary}</p>
            )}
          </div>
        </Section>

        {videoSrc && (
          <Section eyebrow="Media" title="Video">
            <VideoEmbed src={videoSrc} title="Dan video" />
          </Section>
        )}

        <Section eyebrow="Gallery" title="Photos">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p) => (
              <li key={p.src} className="rounded-2xl border overflow-hidden bg-white">
                <Image
                  src={p.src}
                  alt={p.alt ?? name}
                  width={1600}
                  height={1000}
                  className="w-full h-auto object-contain"
                />
              </li>
            ))}
          </ul>
        </Section>

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