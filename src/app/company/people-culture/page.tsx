import React from "react";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";

export default function PeopleCulturePage() {
  return (
    <div className="space-y-12">
      <PageHero
        imageSrc="/images/hero/people.jpg"
        imageAlt="People & culture"
        title="People & culture"
        intro="Capability, wellbeing and inclusion."
        mode="contain"
        size="compact"
      />

      <main className="mx-auto max-w-6xl px-4 space-y-12">
        <Section eyebrow="Overview" title="Our approach">
          <div className="prose max-w-none">
            <p>
              Building culture is a collective effort at BlueNord. We strive for an
              inclusive culture with full employee engagement, where everyone feels
              empowered, respected, and has a strong sense of belonging.           

              Our culture initiatives are rooted in our core values and have 
              concentrated on the elements that foster psychological safety, trust 
              and a sense of belonging, as well as open communication and feedback.
            </p>
          </div>
        </Section>
      </main>
    </div>
  );
}