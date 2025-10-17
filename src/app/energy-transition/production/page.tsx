import PageHero from "@/components/PageHero";
import Section from "@/components/Section";

export default function ProductionOfGasPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 space-y-12 pb-16">
      <PageHero
        imageSrc="/images/hero/energy-security.jpg"
        imageAlt="Production of gas to meet European energy demands"
        title="Production of gas to meet European energy demands"
        intro="Reliable supply with lower emissions intensity."
        mode="cover"
        size="compact"
      />

      <Section eyebrow="Overview" title="Why gas in the transition">
        <div className="prose prose-slate max-w-none">
          <p>
            Gas is a necessary transition fuel. Matching supply and demand helps
            avoid unintended consequences such as higher coal use.
          </p>
          <ul>
            <li>Security of supply for Europe and Denmark</li>
            <li>Lower life-cycle emissions compared to alternatives in many uses</li>
            <li>Bridge to Net Zero while electrification and CCS scale</li>
          </ul>
        </div>
      </Section>
    </main>
  );
}