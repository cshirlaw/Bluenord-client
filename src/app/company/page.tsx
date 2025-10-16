import React from "react";
import Section from "@/components/Section";

export default function CompanyPage() {
  const bgImage = "/images/pages/company/hero.jpg";

  return (
    <main className="relative">
      {/* Background image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-20 md:opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="space-y-2">
        {/* Header */}
        <header className="mx-auto max-w-6xl px-4 pt-10 sm:pt-14">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">The Company</h1>
          <p className="mt-3 text-base sm:text-lg opacity-80 max-w-2xl">
            BlueNord is an independent exploration and production (E&amp;P) company
            focused on the Danish Continental Shelf and listed on the Oslo Stock Exchange.
          </p>
        </header>

        <div className="mx-auto max-w-6xl px-4 space-y-2">
          {/* Overview */}
          <Section eyebrow="At a glance" title="Overview">
            <div className="prose prose-neutral max-w-none">
              <p>
                BlueNord holds a <strong>36.8% non-operated interest</strong> in the
                <strong> Danish Underground Consortium (DUC)</strong>, operated by
                <strong> TotalEnergies</strong>.
              </p>
              <p>
                The DUC is a mature and diversified asset base comprising
                <strong> 14 producing fields</strong> with a production history dating back to
                <strong> 1972</strong>.
              </p>
            </div>
          </Section>

          {/* DUC Ownership */}
          <Section eyebrow="Structure" title="DUC Ownership">
            <ul className="grid gap-3 sm:grid-cols-3 rounded-2xl border p-4">
              <li><span className="font-medium">TotalEnergies:</span> 43.2%</li>
              <li><span className="font-medium">BlueNord:</span> 36.8%</li>
              <li><span className="font-medium">Nordsøfonden:</span> 20.0%</li>
            </ul>
          </Section>

          {/* Reserves */}
          <Section eyebrow="Reserves" title="Substantial Reserves Base (end-2024)">
            <div className="prose prose-neutral max-w-none">
              <p>
                BlueNord’s share of the DUC provides access to a significant reserves and
                resources base totalling <strong>221 mmboe</strong>.
              </p>
              <ul>
                <li><strong>2P Reserves:</strong> 161 mmboe</li>
                <li><strong>2P Approved + Justified:</strong> 33 mmboe</li>
                <li><strong>2C Resources (near-term):</strong> 28 mmboe</li>
              </ul>
              <p className="text-sm text-neutral-500">
                (1) Represents a subset of BlueNord’s 2C portfolio of future projects,
                including Adda and Halfdan North developments and the Svend Reinstatement
                infill wells.
              </p>
            </div>
          </Section>

          {/* Infrastructure */}
          <Section eyebrow="Assets" title="Fields and Infrastructure">
            <div className="prose prose-neutral max-w-none">
              <p>
                The DUC assets include the <strong>Tyra</strong>, <strong>Halfdan</strong>,
                <strong> Dan</strong> and <strong>Gorm</strong> fields in the Danish North Sea,
                linked by an integrated pipeline network to onshore terminals.
              </p>
              <ul>
                <li>Oil pipeline to <strong>Fredericia</strong></li>
                <li>Gas pipeline to <strong>Nybro</strong></li>
                <li>Gas pipeline to <strong>Den Helder</strong></li>
                <li>Cross-border gas connections to Netherlands, Belgium and Germany</li>
              </ul>
            </div>
          </Section>

          {/* Key metrics (subtle card grid) */}
          <Section eyebrow="Key metrics" title="Operating snapshot">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <li className="rounded-2xl border p-4 bg-white/70">
                <div className="text-xs uppercase opacity-70">DUC interest</div>
                <div className="text-2xl font-semibold">36.8%</div>
              </li>
              <li className="rounded-2xl border p-4 bg-white/70">
                <div className="text-xs uppercase opacity-70">Producing fields</div>
                <div className="text-2xl font-semibold">14</div>
              </li>
              <li className="rounded-2xl border p-4 bg-white/70">
                <div className="text-xs uppercase opacity-70">2P reserves</div>
                <div className="text-2xl font-semibold">161 mmboe</div>
              </li>
              <li className="rounded-2xl border p-4 bg-white/70">
                <div className="text-xs uppercase opacity-70">2C (near-term)</div>
                <div className="text-2xl font-semibold">28 mmboe</div>
              </li>
              <li className="rounded-2xl border p-4 bg-white/70">
                <div className="text-xs uppercase opacity-70">Total reserves &amp; resources</div>
                <div className="text-2xl font-semibold">221 mmboe</div>
              </li>
              <li className="rounded-2xl border p-4 bg-white/70">
                <div className="text-xs uppercase opacity-70">Q2 2025 production</div>
                <div className="text-2xl font-semibold">37.5 kboe/d</div>
              </li>
            </ul>
          </Section>
        </div>
      </div>
    </main>
  );
}