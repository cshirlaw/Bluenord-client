import React from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Research & Technology to support DUC | BlueNord",
  description:
    "Partnering across the value chain to unlock practical, scalable emissions reductions in the DUC.",
};

export default function ResearchTechnologyPage() {
  const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient";
  const crumbs = [
    { label: HOME_LABEL, href: "/" },
    { label: "Energy Transition", href: "/energy-transition" },
    { label: "Reducing Emissions through Investments", href: "/energy-transition/investments" },
    { label: "Research & Technology to support DUC", current: true },
  ] as const;

  return (
    <main className="mx-auto max-w-6xl px-4 space-y-12 pb-16">
      {/* Breadcrumbs */}
      <Breadcrumbs items={crumbs} />

      <PageHero
        imageSrc="/images/energy/lab-hero.jpg"
        imageAlt="Research and technology lab"
        title="Research & Technology to support DUC"
        intro="Pilots and partnerships that move the needle—safely, reliably and at scale."
        mode="cover"
        size="compact"
      />

      <Section eyebrow="Approach" title="From pilots to scale">
        <div className="grid gap-8 lg:grid-cols-[1fr,480px] items-start">
          <div className="prose prose-slate max-w-none">
            <p>
              We evaluate and pilot technologies that demonstrably reduce
              emissions intensity across operations—prioritising reliability,
              safety and measurable outcomes.
            </p>
            <ul>
              <li>Methane measurement and abatement programmes</li>
              <li>Electrification and efficiency upgrades</li>
              <li>Advanced monitoring, analytics and optimisation</li>
            </ul>
            <p>
              Collaboration with academia, suppliers and operators helps accelerate
              learning, cut deployment risk and focus spend on the most effective
              solutions.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[480px]">
            <div className="absolute -left-6 top-6 h-[84%] w-[84%] rounded-3xl bg-slate-200/60" />
            <div className="absolute -left-12 top-12 h-[70%] w-[70%] rounded-3xl bg-slate-200/40" />
            <div className="relative rounded-3xl overflow-hidden border shadow-sm">
              <Image
                src="/images/energy/lab.jpg"
                alt="Lab equipment"
                width={1200}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Impact areas" title="Where we focus effort">
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Methane & flaring</h3>
            <p className="opacity-70 text-sm">
              Detection, repair and elimination of routine flaring.
            </p>
          </li>
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Process optimisation</h3>
            <p className="opacity-70 text-sm">
              Control & analytics to cut energy use while maintaining uptime.
            </p>
          </li>
        </ul>
      </Section>
    </main>
  );
}