import PageHero from "@/components/PageHero";
import Section from "@/components/Section";

export default function OperationsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 space-y-12 pb-16">
      <PageHero
        imageSrc="/images/energy/operations.jpg" // swap to a real image you have
        imageAlt="Reducing emissions from current operations"
        title="Reducing emissions from current operations"
        intro="Methane management, flaring reduction, and process optimisation."
        mode="cover"
        size="compact"
      />

      <Section eyebrow="Overview" title="What we’re doing today">
        <div className="prose prose-slate max-w-none">
          <p>
            We focus on practical, near-term reductions that materially lower our
            operational footprint while keeping reliable supply.
          </p>
          <ul>
            <li><strong>Methane management:</strong> Leak detection & repair, equipment upgrades, and measurement.</li>
            <li><strong>Flaring & venting:</strong> Minimising routine flaring and tightening fugitive emissions.</li>
            <li><strong>Process optimisation:</strong> Efficiency improvements in power and utilities.</li>
          </ul>
        </div>
      </Section>

      <Section eyebrow="Targets" title="Expected outcomes">
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Lower methane intensity</h3>
            <p className="opacity-70 text-sm">
              Continuous monitoring and LDAR programmes to reduce unintended emissions.
            </p>
          </li>
          <li className="rounded-2xl border p-5">
            <h3 className="font-semibold">Optimised operations</h3>
            <p className="opacity-70 text-sm">
              Power and process enhancements to cut Scope 1 where feasible.
            </p>
          </li>
        </ul>
      </Section>
    </main>
  );
}