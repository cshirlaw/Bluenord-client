import React from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import { loadAssets, getPrevNext } from "@/lib/assets";

export default async function GormPage() {
  const { items } = await loadAssets();
  const gorm = items.find(i => i.id?.toLowerCase() === "gorm");

  const name = gorm?.name ?? "Gorm";
  const summary = gorm?.summary ?? "Overview, media, and key information for the Gorm field.";
  const image = gorm?.image ?? "/images/assets/gorm/gorm-hero.jpg";
  const alt = gorm?.alt ?? "Gorm offshore platform complex";
  const videoSrc = (gorm?.videoSrc ?? "").trim();
  const photos = (gorm?.photos?.length ? gorm.photos : [{ src: image, alt }]).map(p => ({
    src: p.src, alt: p.alt ?? name
  }));

  const { prev, next } = getPrevNext(items, "gorm");

  return (
    <div className="space-y-8">
      <PageHero imageSrc={image} imageAlt={alt} title={name} intro={summary} />
      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Section eyebrow="Overview" title="Field summary">
          <p className="text-lg text-neutral-700">{summary}</p>
        </Section>

        {videoSrc && (
          <Section eyebrow="Media" title="Video">
            <VideoEmbed src={videoSrc} title="Gorm video" />
          </Section>
        )}

        <Section eyebrow="Gallery" title="Photos">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p) => (
              <li key={p.src} className="rounded-2xl border overflow-hidden bg-white">
                <Image src={p.src} alt={p.alt ?? name} width={1600} height={1000} className="w-full h-auto object-contain" />
              </li>
            ))}
          </ul>
        </Section>

        <section aria-label="Asset navigation" className="pt-2">
          <div className="grid grid-cols-3 items-center">
            <div className="justify-self-start">
              {prev ? (
                <Link href={`/assets/${prev.id}`} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring">
                  <span>←</span><span>{prev.name}</span>
                </Link>
              ) : <span />}
            </div>
            <div className="justify-self-center">
              <Link href="/assets" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring">
                All assets
              </Link>
            </div>
            <div className="justify-self-end">
              {next ? (
                <Link href={`/assets/${next.id}`} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow focus:outline-none focus:ring">
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