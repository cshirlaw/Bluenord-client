import Image from "next/image";
import Link from "next/link";

type CTA = { label: string; href: string };

export default function HomeHero(props: {
  backgroundImage?: string;
  markImage?: string;
  heading?: string;
  lede?: string;

  // legacy fallbacks:
  title?: string;
  intro?: string;
  image?: string;
  alt?: string;

  ctas?: CTA[];
}) {
  // Prefer new fields; fall back to legacy ones so old JSON still works.
  const bg = props.backgroundImage ?? props.image ?? "/images/hero/hero.jpg";
  const heading = props.heading ?? props.title ?? "BlueNord";
  const lede = props.lede ?? props.intro ?? "";
  const lines = heading.split("\n");

  return (
    <section className="relative isolate">
      {/* Background image + shade */}
      <div className="absolute inset-0 -z-10">
        <Image src={bg} alt={props.alt ?? ""} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Right mark */}
      {props.markImage && (
        <div className="pointer-events-none absolute right-4 md:right-8 bottom-6 md:bottom-10 w-40 md:w-64 opacity-80">
          <Image src={props.markImage} alt="" width={512} height={512} className="w-full h-auto" />
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h1 className="text-white font-semibold tracking-tight leading-tight text-4xl md:text-7xl">
          {lines.map((l, i) => (
            <span key={i} className="block">{l}</span>
          ))}
        </h1>

        {lede && (
          <div className="mt-6 max-w-2xl text-white/90 text-base md:text-lg space-y-4">
            {lede.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
          </div>
        )}

        {props.ctas?.length ? (
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {props.ctas.map((c, i) => (
              <Link
                key={i}
                href={c.href}
                className="inline-flex items-center gap-3 rounded-full bg-white/85 backdrop-blur px-5 py-3 text-[#0A1C7C] font-medium shadow hover:bg-white"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-300/70">➤</span>
                {c.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}