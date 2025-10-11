import React from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";

export default function OperationalExcellencePage() {
  const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient";

  const items: Crumb[] = [
    { label: HOME_LABEL, href: "/" },
    { label: "The Company", href: "/company" },
    { label: "Operational Excellence", current: true },
  ];

  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/hero/hero.jpg"
        imageAlt="Operational excellence"
        title="Operational excellence"
        intro="Reliability, uptime and efficiency."
      />
      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Breadcrumbs items={items} />
        <Section eyebrow="Overview" title="Our approach">
          <div className="prose max-w-none">
            <p>Add your copy for operational excellence here.</p>
          </div>
        </Section>
      </main>
    </div>
  );
}