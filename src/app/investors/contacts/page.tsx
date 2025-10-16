import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function IRContactsPage() {
  return (
    <>
      {/* Hero with subtle gradient overlay */}
      <PageHero
        imageSrc="/images/pages/company/investors-hero.jpg"
        imageAlt="Investor Relations contacts"
        title="Investor Relations contacts"
        intro="Get in touch with our Investor Relations team."
        overlay="gradient"
        overlayStrength={70}
        size="compact"
        mode="contain"
      />

      <main className="mx-auto max-w-6xl px-4 pb-10 space-y-6">
        <h1 className="sr-only">Investor Relations contacts</h1>

        <ul className="list-disc pl-5 text-[15px] leading-7">
          <li>
            <span className="font-medium">Cathrine Torgersen</span> — EVP Investor Relations &amp; ESG —{" "}
            <a
              href="mailto:ct@bluenord.com"
              className="underline underline-offset-2 text-[#0A1C7C] hover:opacity-80"
            >
              ct@bluenord.com
            </a>
          </li>
        </ul>

        <Link href="/investors" className="inline-flex items-center gap-2 text-[15px] underline underline-offset-2 hover:opacity-80">
          ← Back to Investors
        </Link>
      </main>
    </>
  );
}