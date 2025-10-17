import React from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";

export const metadata = {
  title: "Reducing Emissions through Investments | BlueNord",
  description:
    "Electrification, CCS potential, and fit-for-purpose decarbonisation investments that reduce emissions across BlueNord’s operations.",
};

export default function InvestmentsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 space-y-12 pb-16">
      {/* Hero */}
      <PageHero
        imageSrc="/images/energy/investments-hero.jpg" // ← put your banner image here
        imageAlt="ESG plans on a table"
        title="Reducing Emissions through Investments"
        intro="Investing in electrification, innovation and future CCS potential to meaningfully lower emissions."
        mode="cover"
        size="compact"
      />

      {/* Intro narrative with right-aligned image */}
      <Section eyebrow="Sustainability" title="Reducing Emissions through Investments">
        <div className="grid gap-8 lg:grid-cols-[1fr,480px] items-start">
          {/* Left: prose text */}
          <div className="prose prose-slate max-w-none">
            <p>
              A key tenet of our strategy is achieving a set of substantive, quantifiable
              and achievable ESG goals.
            </p>
            <p>
              BlueNord has set its strategy with the objective to be a meaningful
              participant in the Energy Transition. The Company has a focus on facilitating
              improved technical, commercial and economic framing of environmental
              initiatives.
            </p>
            <p>
              This includes pursuing the extended life of offshore installations by
              embracing and integrating sustainability. We recognise an evolving and
              flexible approach is needed given the emerging nature of various proposals
              and technologies, and BlueNord aims to be at the forefront of this evolution.
            </p>
          </div>

          {/* Right: stacked image block (matches the “layered squares” look) */}
          <div className="relative mx-auto w-full max-w-[480px]">
            {/* back mats */}
            <div className="absolute -left-6 top-6 h-[84%] w-[84%] rounded-3xl bg-slate-200/60" />
            <div className="absolute -left-12 top-12 h-[70%] w-[70%] rounded-3xl bg-slate-200/40" />
            {/* main image */}
            <div className="relative rounded-3xl overflow-hidden border shadow-sm">
              <Image
                src="/images/energy/platform-sea.jpg" // ← replace with your platform-at-sea image
                alt="Offshore platform at sea"
                width={1200}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Two feature cards */}
      <Section eyebrow="Next steps" title="Focus areas within investments">
        <ul className="grid gap-6 sm:grid-cols-2">
          {/* Card: CO2 Storage */}
          <li className="rounded-2xl border overflow-hidden">
            <Link
              href="/energy-transition/investments/co2-storage"
              className="block focus:outline-none"
            >
              <Image
                src="/images/energy/co2-storage.jpg" // ← add/replace
                alt="CO₂ storage infrastructure"
                width={1200}
                height={800}
                className="h-48 w-full object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="font-semibold">
                  CO<sub>2</sub> Storage
                </h3>
                <p className="opacity-70 text-sm">
                  Exploring long-term potential for CCS to accelerate decarbonisation.
                </p>
                <span className="inline-block text-brand-600 text-sm">Learn more →</span>
              </div>
            </Link>
          </li>

          {/* Card: Research & Technology to support DUC */}
          <li className="rounded-2xl border overflow-hidden">
            <Link
              href="/energy-transition/investments/research-technology"
              className="block focus:outline-none"
            >
              <Image
                src="/images/energy/lab.jpg" // ← add/replace with the lab/research image
                alt="Research and technology lab"
                width={1200}
                height={800}
                className="h-48 w-full object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="font-semibold">
                  Research &amp; Technology to support DUC
                </h3>
                <p className="opacity-70 text-sm">
                  Partnering across the value chain to unlock practical, scalable
                  emissions reductions.
                </p>
                <span className="inline-block text-brand-600 text-sm">Learn more →</span>
              </div>
            </Link>
          </li>
        </ul>
      </Section>
    </main>
  );
}