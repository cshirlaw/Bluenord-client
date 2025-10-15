import Section from "@/components/Section";
import FeatureCard from "@/components/FeatureCard";
import home from "@/content/home.json";

export default function Page() {
  // Treat JSON as flexible (old/new shapes)
  const hero: any = (home as any).hero ?? {};
  const highlights: any[] = (home as any).highlights ?? [];
  const ctas: any[] = hero.ctas ?? (home as any).ctas ?? [];

  // Back-compat fallbacks
  const eyebrow: string | undefined = hero.eyebrow; // only renders if present
  const title: string = hero.title ?? hero.heading ?? "BlueNord";
  const intro: string | undefined = hero.intro ?? hero.lede;

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="rounded-3xl border border-brand/20 bg-gradient-to-br from-slate-50 to-white p-10">
        {eyebrow ? (
          <div className="text-xs uppercase tracking-wider text-brand">{eyebrow}</div>
        ) : null}

        <h1 className="mt-2 text-3xl md:text-4xl font-semibold">{title}</h1>

        {intro ? (
          <p className="mt-3 max-w-3xl text-slate-700">{intro}</p>
        ) : null}

        {/* CTAs (either top-level or hero.ctas) */}
        {Array.isArray(ctas) && ctas.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {ctas.map((c) => (
              <a
                key={c.label}
                href={c.href || "#"}
                className="inline-flex items-center rounded-lg bg-brand px-4 py-2 text-white shadow-sm transition hover:bg-brand-600"
              >
                {c.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>

      {/* Highlights (optional) */}
      {Array.isArray(highlights) && highlights.length > 0 ? (
        <Section title="Explore">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((f) => (
              <FeatureCard key={f.title ?? String(Math.random())} f={f} />
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}