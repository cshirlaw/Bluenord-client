// src/app/energy-transition/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";

export default function EnergyTransitionPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 space-y-12 pb-16">
      <PageHero
        imageSrc="/images/hero/energy-transition.jpg"
        imageAlt="Energy transition at BlueNord"
        title="Energy transition"
        intro="Lower emissions, higher efficiency."
        mode="cover"
        size="compact"
      />

      {/* Top narrative: image + bullets (left-aligned image) */}
<Section eyebrow="Energy Transition & Sustainability" title="Approach">
  <div className="grid gap-6 md:grid-cols-2 md:gap-8 place-items-start">
    <div className="overflow-hidden rounded-2xl border w-[520px] max-w-full self-start">
      <Image
        src="/images/pages/energy-transition.jpg"
        alt="Technician working on platform"
        width={1200}
        height={900}
        className="w-full h-56 sm:h-64 md:h-72 object-cover object-left"
        priority
      />
    </div>

    <div className="space-y-4 self-start">
      <p>
        BlueNord has a balanced commitment to energy security and the energy transition.
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Gas is a necessary transition fuel.</strong> As we move towards Net
          Zero, matching supply and demand helps avoid unintended consequences
          (e.g. higher coal use).
        </li>
        <li>
          <strong>Focus on lowering emissions:</strong>
          <ul className="list-disc pl-6 mt-1 space-y-1">
            <li>Tyra II expected with ~30% lower emissions intensity</li>
            <li>Emissions-reduction initiatives across the portfolio</li>
          </ul>
        </li>
        <li>Exploring long-term potential for CCS.</li>
      </ul>

      <p className="mt-4">
        We are committed to operating with the lowest possible emissions intensity
        and materially reducing our carbon footprint.
      </p>
    </div>
  </div>
</Section>

      {/* Mid-page strategy narrative (prose formatting) */}
      <Section eyebrow="Strategy" title="Our commitment">
        <div className="prose prose-slate max-w-none">
          <p>
            BlueNord has set its strategy with the objective to be a meaningful participant
            in the Energy Transition.
          </p>
          <p>
            We continue to focus on reducing emissions intensity through investments, while
            producing the gas required by the current supply–demand landscape and supporting
            the journey to Net Zero with fit-for-purpose investments.
          </p>
          <p>
            Our objective is to balance energy security with the demands of the energy
            transition. From a corporate perspective, we believe doing this best enables us
            to deliver long-term value for our shareholders and maximise BlueNord’s
            contribution to our broader set of stakeholders.
          </p>
        </div>
      </Section>

      {/* Priorities & Key initiatives – three cards with links */}
      <Section eyebrow="Priorities" title="Key initiatives">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <li className="rounded-2xl border overflow-hidden">
            {/* If you created /energy-transition/production, change href below to that. */}
            <Link href="/energy-security" className="block focus:outline-none">
              <Image
                src="/images/pages/investors-hero.jpg"
                alt="Production of gas to meet European energy demands"
                width={1200}
                height={800}
                className="h-44 w-full object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="font-semibold">
                  Production of gas to meet European energy demands
                </h3>
                <p className="opacity-70 text-sm">
                  Reliable supply while lowering emissions intensity.
                </p>
                <span className="inline-block text-brand-600 text-sm">
                  Learn more →
                </span>
              </div>
            </Link>
          </li>

          {/* Card 2 */}
          <li className="rounded-2xl border overflow-hidden">
            <Link href="/energy-transition/operations" className="block focus:outline-none">
              <Image
                src="/images/pages/Carboncuts-hero.jpg"
                alt="Reducing emissions from current operations"
                width={1200}
                height={800}
                className="h-44 w-full object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="font-semibold">Reducing emissions from current operations</h3>
                <p className="opacity-70 text-sm">
                  Methane management, flaring reduction, and process optimisation.
                </p>
                <span className="inline-block text-brand-600 text-sm">
                  Learn more →
                </span>
              </div>
            </Link>
          </li>

          {/* Card 3 */}
          <li className="rounded-2xl border overflow-hidden">
            <Link href="/energy-transition/investments" className="block focus:outline-none">
              <Image
                src="/images/pages/investments.jpg"
                alt="Reducing emissions through investments"
                width={1200}
                height={800}
                className="h-44 w-full object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="font-semibold">Reducing emissions through investments</h3>
                <p className="opacity-70 text-sm">
                  Electrification opportunities and fit-for-purpose decarbonisation projects.
                </p>
                <span className="inline-block text-brand-600 text-sm">
                  Learn more →
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </Section>
    </main>
  );
}