import React from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function EnergySecurityPage() {
  const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient";
  const crumbs = [
    { label: HOME_LABEL, href: "/" },
    { label: "Energy Security", current: true },
  ] as const;

  return (
    <main className="mx-auto max-w-6xl px-4 space-y-12 pb-16">
      {/* Breadcrumbs at the very top */}
      <div className="pt-6">
        <Breadcrumbs items={crumbs as any} />
      </div>

      <PageHero
        imageSrc="/images/hero/energy-security.jpg" // put an image here (or swap to your existing sea image)
        imageAlt="Energy security at BlueNord"
        title="Energy security"
        intro="Reliable, responsible supply for Europe."
        mode="cover"
        size="compact"
      />

      <Section eyebrow="Overview" title="Our role in security of supply">
        <div className="prose max-w-none">
          <p>
            BlueNord supports Europe’s energy security with reliable production,
            disciplined operations, and long-term stewardship of resources.
          </p>
          <p>
            We focus on uptime, predictive maintenance, and resilient supply chains to
            keep molecules flowing in all market conditions.
          </p>
        </div>
      </Section>

      <Section eyebrow="Focus areas" title="What we’re doing">
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Operational reliability</h3>
            <p className="opacity-70 text-sm">
              High facility availability through robust integrity management.
            </p>
          </li>
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Balanced portfolio</h3>
            <p className="opacity-70 text-sm">
              Mature assets with strong infrastructure and predictable production.
            </p>
          </li>
        </ul>
      </Section>
    </main>
  );
}