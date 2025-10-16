import React from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";

export default function OurValuesPage() {
  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/hero/people.jpg"
        imageAlt="Our values"
        title="Our Values"
        intro="Capability, wellbeing and inclusion."
        mode="contain"
        size="compact"
      />

      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Section eyebrow="Overview" title="Our values">
          <div className="prose max-w-none">
            <p>
              Building culture is a collective effort at BlueNord. We strive for an inclusive
              culture with full employee engagement, where everyone feels empowered, respected,
              and has a strong sense of belonging.
            </p>
            <p>
              Our culture initiatives are rooted in our core values and have concentrated on the
              elements that foster psychological safety, trust and a sense of belonging, as well
              as open communication and feedback.
            </p>
            <p>
              Our team represents ten different nationalities and a wide range of ages, background,
              experiences, and ways of thinking. These are some of the reasons why many of our
              employees look forward to going to work every morning.
            </p>
            <p>
              Our values reflect our Company and our people. They serve as our compass, guiding us
              today, and towards the Company we want to be. They provide a framework for how we
              think, act and interact. Our values influence how we operate, lead, and make decisions.
            </p>
          </div>
        </Section>
      </main>
    </div>
  );
}