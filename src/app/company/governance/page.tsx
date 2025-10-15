import React from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";

export default function GovernancePage() {
  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/hero/hero.jpg"
        imageAlt="Governance"
        title="Governance"
        intro="Risk management, integrity and accountability."
        mode="contain"
        size="compact"
      />

      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Section eyebrow="Overview" title="Our governance framework">
          <div className="prose max-w-none">
            <p>Add your copy for governance here.</p>
          </div>
        </Section>
      </main>
    </div>
  );
}