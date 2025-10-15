import React from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";

export default function OperationalExcellencePage() {
  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/hero/hero.jpg"
        imageAlt="Operational excellence"
        title="Operational excellence"
        intro="Reliability, uptime and efficiency."
        mode="contain"
        size="compact"
      />
      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Section eyebrow="Overview" title="Our approach">
          <div className="prose max-w-none">
            <p>Add your copy for operational excellence here.</p>
          </div>
        </Section>
      </main>
    </div>
  );
}