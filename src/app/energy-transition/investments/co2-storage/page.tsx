import React from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";

export const metadata = {
  title: "CO₂ Storage | BlueNord",
  description:
    "Exploring the long-term potential for CCS and CO₂ storage to accelerate decarbonisation.",
};

export default function CO2StoragePage() {
  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Energy Transition", href: "/energy-transition" },
    {
      label: "Reducing Emissions through Investments",
      href: "/energy-transition/investments",
    },
    { label: "CO₂ Storage", current: true },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 space-y-12 pb-16">
      {/* Breadcrumbs */}
      <Breadcrumbs items={crumbs} />

      <PageHero
        imageSrc="/images/energy/co2-storage-hero.jpg"
        imageAlt="CO₂ storage concept"
        title="CO₂ Storage"
        intro="Exploring CCS opportunities to meaningfully reduce emissions over the long term."
        mode="cover"
        size="compact"
      />

      <Section eyebrow="Overview" title="Why CO₂ storage">
        <div className="grid gap-8 lg:grid-cols-[1fr,480px] items-start">
          <div className="prose prose-slate max-w-none">
            <p>
              BlueNord is evaluating CCS pathways that can complement operational
              emissions reductions and support regional decarbonisation goals.
            </p>
            <p>
              We focus on technically viable, commercially sensible and scalable
              solutions—prioritising subsurface integrity, monitoring and long-term
              stewardship.
            </p>
            <ul>
              <li>Screening storage concepts with robust assurance frameworks</li>
              <li>Assessing transport, injection and monitoring requirements</li>
              <li>Collaborating across partners, regulators and technology providers</li>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[480px]">
            <div className="absolute -left-6 top-6 h-[84%] w-[84%] rounded-3xl bg-slate-200/60" />
            <div className="absolute -left-12 top-12 h-[70%] w-[70%] rounded-3xl bg-slate-200/40" />
            <div className="relative rounded-3xl overflow-hidden border shadow-sm">
              <Image
                src="/images/energy/co2-storage.jpg"
                alt="CO₂ storage infrastructure"
                width={1200}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Focus" title="What we’re assessing">
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Subsurface suitability</h3>
            <p className="opacity-70 text-sm">
              Capacity, injectivity, containment and monitoring requirements.
            </p>
          </li>
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Infrastructure & logistics</h3>
            <p className="opacity-70 text-sm">
              Transport, compression and tie-in options to existing hubs.
            </p>
          </li>
        </ul>
      </Section>
    </main>
  );
}