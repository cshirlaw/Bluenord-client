import HeroBanner from "@/components/HeroBanner";
import company from "@/content/company.json";

export default function CompanyHero() {
  const { hero } = company as { hero: { title: string; intro?: string } };

  // Single source of truth for the company hero image.
  // Place the file at: public/images/pages/company/hero.jpg
  const bgImage = "/images/pages/company/hero.jpg";

  return (
    <section className="relative">
      {/* Faint full-page background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Foreground hero content (keeps your small logo / clean look) */}
      <HeroBanner
        imageSrc={bgImage}            // your small hero/logo can use the same file
        imageAlt="BlueNord company"
        title={hero.title}
        intro={hero.intro}
        primaryCta={{ href: "/assets", label: "View assets" }}
        secondaryCta={{ href: "/contact", label: "Contact us" }}
      />
    </section>
  );
}