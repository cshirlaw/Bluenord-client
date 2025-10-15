import React from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function EnergyTransitionPage() {
  const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient";
  const crumbs = [
    { label: HOME_LABEL, href: "/" },
    { label: "Energy Transition", current: true },
  ] as const;

  return (
    <main className="mx-auto max-w-6xl px-4 space-y-12 pb-16">
      {/* Breadcrumbs at the very top */}
      <div className="pt-6">
        <Breadcrumbs items={crumbs as any} />
      </div>

      <PageHero
        imageSrc="/images/hero/energy-transition.jpg" // add an image (or reuse a hero)
        imageAlt="Energy transition at BlueNord"
        title="Energy transition"
        intro="Lower emissions, higher efficiency."
        mode="cover"
        size="compact"
      />

      <Section eyebrow="Overview" title="Our approach">
        <div className="prose max-w-none">
          <p>
            We reduce operational emissions, increase energy efficiency, and align
            investments with Europe’s pathway to Net Zero.
          </p>
          <p>
            Our priorities include methane management, electrification opportunities,
            and data-driven optimization of energy use.
          </p>
        </div>
      </Section>

      <Section eyebrow="Priorities" title="Key initiatives">
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Flaring & methane</h3>
            <p className="opacity-70 text-sm">
              Minimising routine flaring and tightening fugitive emissions.
            </p>
          </li>
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Electrification & efficiency</h3>
            <p className="opacity-70 text-sm">
              Power and process optimisation to cut scope 1 emissions.
            </p>
          </li>
        </ul>
      </Section>
    </main>
  );
}