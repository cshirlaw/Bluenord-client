import React from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";

export const metadata = {
  title: "Research & Technology | BlueNord",
  description:
    "Targeted R&D and technology trials that lower emissions intensity and improve operational efficiency.",
};

export default function ResearchTechnologyPage() {
  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Energy Transition", href: "/energy-transition" },
    {
      label: "Reducing Emissions through Investments",
      href: "/energy-transition/investments",
    },
    { label: "Research & Technology", current: true },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 space-y-12 pb-16">
      {/* Breadcrumbs */}
      <Breadcrumbs items={crumbs} />

      <PageHero
        imageSrc="/images/energy/lab.jpg" /* ensure this exists */
        imageAlt="Lab and technology development"
        title="Research & Technology"
        intro="Piloting and scaling technologies that cut emissions and improve efficiency across our assets."
        mode="cover"
        size="compact"
      />

      <Section eyebrow="Overview" title="Purposeful R&D">
        <div className="grid gap-8 lg:grid-cols-[1fr,480px] items-start">
          <div className="prose prose-slate max-w-none">
            <p>
              Our research and technology work is focused on practical,
              measurable decarbonisation—prioritising solutions that deliver
              material emissions reductions or energy efficiency improvements.
            </p>
            <ul>
              <li>Digital optimisation of process conditions and energy use</li>
              <li>Advanced methane detection and leak reduction methods</li>
              <li>Electrification pathways and power management</li>
              <li>Flaring minimisation and waste heat recovery concepts</li>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[480px]">
            <div className="absolute -left-6 top-6 h-[84%] w-[84%] rounded-3xl bg-slate-200/60" />
            <div className="absolute -left-12 top-12 h-[70%] w-[70%] rounded-3xl bg-slate-200/40" />
            <div className="relative rounded-3xl overflow-hidden border shadow-sm">
              <Image
                src="/images/energy/platform-sea.jpg" /* secondary supporting image */
                alt="Offshore platform with technology upgrades"
                width={1200}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Focus areas" title="What we’re progressing">
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Methane & flaring</h3>
            <p className="opacity-70 text-sm">
              Enhanced detection, rapid response, and flare-down initiatives to
              reduce the highest-impact emissions sources.
            </p>
          </li>
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Digital optimisation</h3>
            <p className="opacity-70 text-sm">
              Data-led tuning of process conditions to minimise fuel gas and
              improve overall plant efficiency.
            </p>
          </li>
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Electrification options</h3>
            <p className="opacity-70 text-sm">
              Feasibility of partial/full electrification and power management
              to cut scope 1 emissions.
            </p>
          </li>
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Measurement & assurance</h3>
            <p className="opacity-70 text-sm">
              Improved instrumentation, monitoring and verification frameworks
              to ensure durable decarbonisation impacts.
            </p>
          </li>
        </ul>
      </Section>
    </main>
  );
}