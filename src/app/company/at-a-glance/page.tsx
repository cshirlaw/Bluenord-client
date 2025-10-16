import React from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";

export default function AtAGlancePage() {
  return (
    <div className="space-y-12">
      {/* Keep whatever hero image you prefer */}
      <PageHero
        imageSrc="/images/pages/at-a-glance/hero.jpg"
        imageAlt="BlueNord at a glance"
        title="At-a-Glance"
        intro=""
        mode="contain"
        size="compact"
      />

      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Section eyebrow="Overview" title="BlueNord at-a-glance">
          <div className="prose max-w-none">
            <p><strong>Independent E&amp;P company focused on the Danish Continental Shelf and listed on the Oslo Stock Exchange</strong></p>
            <p>
              We hold a <strong>36.8% non-operated interest in the DUC</strong><sup>1</sup>, which is operated by TotalEnergies.
            </p>
            <p>
              The DUC has a <strong>mature and diversified asset base</strong>, with <strong>14 fields</strong> and a production history since <strong>1972</strong>.
            </p>
            <p className="text-xs text-neutral-500">
              <sup>1</sup> Danish Underground Consortium.
            </p>
          </div>
        </Section>
      </main>
    </div>
  );
}