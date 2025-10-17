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
      

      <PageHero
        imageSrc="/images/hero/energy-security.jpg" // put an image here (or swap to your existing sea image)
        imageAlt="Energy security at BlueNord"
        title="Energy security"
        intro="Production of Gas to meet European Energy Demands"
        mode="cover"
        size="compact"
      />

      <Section eyebrow="Overview" title="Production of Gas to meet European Energy Demands">
  <div className="max-w-none space-y-4">
    <p>
      Tyra will secure energy supply for Denmark by 2.8 billion cubic meters
      gas per year to Denmark and Europe while at the same time reducing
      BlueNord’s emissions intensity by 30%.
    </p>

    <p>
      We will support the objectives of Availability, Accessibility, Acceptability and Affordability.
    </p>

    <p>Indigenous gas production is significantly more attractive than importing LNG volumes:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>Cheaper</li>
      <li>Lower emissions</li>
      <li>More secure</li>
    </ul>

    <p>
      Tyra will secure energy supply for Denmark by 2.8 billion cubic meters
      gas per year to Denmark and Europe while at the same time reducing
      BlueNord’s emissions intensity by 30%.
    </p>

    <p>BlueNord will supply Denmark and Europe with the energy it needs, for as long as it needs it.</p>

    <p>We will support the objectives of:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>Availability</li>
      <li>Accessibility</li>
      <li>Acceptability</li>
      <li>Affordability</li>
    </ul>

    <p>Indigenous gas production is significantly more attractive than importing LNG volumes.</p>

    <ul className="list-disc pl-6 space-y-1">
      <li>Cheaper</li>
      <li>Lower emissions</li>
      <li>More secure</li>
    </ul>

    <p>Context:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>Gas, with LNG, is now a global market.</li>
      <li>Emissions do not stop at geographic borders.</li>
      <li>Exposure to broader geopolitical considerations.</li>
    </ul>

    <p>
      BlueNord is committed to maximising gas production in Denmark, which is more secure and has a lower emissions
      footprint than LNG.
    </p>

    <p><strong>BlueNord gas production up ~250% by 2025.</strong></p>
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