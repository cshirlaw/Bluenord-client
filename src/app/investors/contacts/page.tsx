import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function IRContactsPage() {
  return (
    <>
      {/* Hero with subtle gradient overlay */}
      <PageHero
        imageSrc="/images/hero/hero.jpg"
        imageAlt="Investor Relations contacts"
        title="Investor Relations contacts"
        intro="Get in touch with our Investor Relations team."
        overlay="gradient"
        overlayStrength={70}
        size="compact"
        mode="contain"
      />

      <main className="mx-auto max-w-6xl px-4 pb-10 space-y-4">
        <h1 className="sr-only">Investor Relations contacts</h1>

        <ul className="list-disc pl-5 text-sm opacity-80">
          <li>
            Example: Jane Smith — Head of Investor Relations —{" "}
            <a href="mailto:ir@bluenord.com" className="underline">ir@bluenord.com</a>
          </li>
          <li>
            Example: John Doe — Investor Relations Manager —{" "}
            <a href="mailto:john.doe@bluenord.com" className="underline">john.doe@bluenord.com</a>
          </li>
        </ul>

        <Link href="/investors" className="underline text-sm">
          ← Back to Investors
        </Link>
      </main>
    </>
  );
}