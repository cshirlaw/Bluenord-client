import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function RegulatoryNewsPage() {
  return (
    <>
      {/* Hero with subtle gradient overlay */}
      <PageHero
        imageSrc="/images/hero/hero.jpg"
        imageAlt="Regulatory news"
        title="Regulatory news"
        intro="Latest announcements and market updates."
        overlay="gradient"
        overlayStrength={70}
        size="compact"
        mode="contain"
      />

      <main className="mx-auto max-w-6xl px-4 pb-10 space-y-4">
        <h1 className="sr-only">Regulatory news</h1>
        <p className="opacity-70">
          Placeholder page. Hook this up to your news/RNS source when ready.
        </p>

        <Link href="/investors" className="underline text-sm">
          ← Back to Investors
        </Link>
      </main>
    </>
  );
}