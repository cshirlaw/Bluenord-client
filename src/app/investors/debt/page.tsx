import React from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function DebtPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Investors", href: "/investors" },
    { label: "Debt" }
  ];

  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/hero/hero.jpg"
        imageAlt="Debt"
        title="Debt"
        intro="BlueNord uses different sources of funding and currently has the following outstanding debt instruments. of bonds and financing."
      />
      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Breadcrumbs items={trail} />
        <Section eyebrow="Instruments" title="Capital structure">
          <div className="prose max-w-none">
            <p>Add bond terms, ranking, hedging and covenants.</p>
          </div>
        </Section>
        <Section eyebrow="Profile" title="Maturity schedule">
          <div className="prose max-w-none">
            <p>Add a simple maturity table or chart here.</p>
          </div>
        </Section>
        <Breadcrumbs items={trail} />
      </main>
    </div>
  );
}