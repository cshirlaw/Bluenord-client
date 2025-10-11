import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CompanyPage() {
  const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient";

  const items = [
    { label: HOME_LABEL, href: "/" },
    { label: "The Company", current: true },
  ] as const;

  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/hero-offshore.png"
        imageAlt="The Company"
        title="The Company"
        intro="BlueNord at a glance and our focus areas."
      />

      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Breadcrumbs items={items as any} />

        <Section eyebrow="At a glance" title="Key facts">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <li className="rounded-2xl border p-4">
              <div className="text-xs uppercase opacity-70">Employees</div>
              <div className="text-2xl font-semibold">—</div>
            </li>
            <li className="rounded-2xl border p-4">
              <div className="text-xs uppercase opacity-70">Operating years</div>
              <div className="text-2xl font-semibold">—</div>
            </li>
            <li className="rounded-2xl border p-4">
              <div className="text-xs uppercase opacity-70">Countries</div>
              <div className="text-2xl font-semibold">—</div>
            </li>
            <li className="rounded-2xl border p-4">
              <div className="text-xs uppercase opacity-70">Safety (TRIR)</div>
              <div className="text-2xl font-semibold">—</div>
            </li>
          </ul>
        </Section>

        <Section eyebrow="Focus areas" title="How we operate">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/company/operational-excellence"
              className="block rounded-2xl border p-5 hover:shadow focus:outline-none focus:ring"
            >
              <h3 className="font-semibold">Operational excellence</h3>
              <p className="opacity-70 text-sm">Reliability, uptime and efficiency.</p>
            </Link>
            <Link
              href="/company/people-culture"
              className="block rounded-2xl border p-5 hover:shadow focus:outline-none focus:ring"
            >
              <h3 className="font-semibold">People &amp; culture</h3>
              <p className="opacity-70 text-sm">Capability, wellbeing and inclusion.</p>
            </Link>
            <Link
              href="/company/governance"
              className="block rounded-2xl border p-5 hover:shadow focus:outline-none focus:ring"
            >
              <h3 className="font-semibold">Governance</h3>
              <p className="opacity-70 text-sm">Risk, integrity and accountability.</p>
            </Link>
          </div>
        </Section>
      </main>
    </div>
  );
}