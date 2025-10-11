import React from "react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import { loadAssets } from "@/lib/assets";

export const dynamic = "force-static";

export default async function AssetsIndexPage() {
  const data = await loadAssets();
  const heroTitle = data.hero?.title ?? "Assets";
  const heroLede  = data.hero?.lede  ?? "Overview of our core producing fields and key projects.";
  const items = data.items ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-10">
      {/* Page heading */}
      <header className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">{heroTitle}</h1>
        <p className="text-lg text-neutral-700">{heroLede}</p>
      </header>

      {/* Grid of asset cards */}
      <Section eyebrow="Portfolio" title="Producing fields">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((a) => (
            <li
              key={a.id}
              className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
            >
              <Link href={`/assets/${a.id}`} className="block focus:outline-none focus:ring">
                <div className="aspect-[4/3] bg-white flex items-center justify-center">
                  {a.image ? (
                    <Image
                      src={a.image}
                      alt={a.alt ?? a.name}
                      width={1200}
                      height={900}
                      className="h-auto w-full object-contain"
                    />
                  ) : (
                    <div className="text-sm text-neutral-400">No image</div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold text-gray-900">{a.name}</div>
                  {a.summary && (
                    <div className="text-sm text-gray-600">{a.summary}</div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}