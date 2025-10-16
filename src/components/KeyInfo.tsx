import Link from "next/link";
// If your tsconfig has "resolveJsonModule": true, this works out of the box.
import data from "@/content/home-keyinfo.json";

type Card = {
  slug: string;
  title: string;
  headline: string;
  sub?: string;
  href: string;
};

export default function KeyInfo() {
  const cards = (data.cards ?? []) as Card[];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        <span className="text-[#0A1C7C]">BlueNord</span> Key Information
      </h2>

      <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <li
            key={c.slug}
            className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
          >
            {/* Top band */}
            <div className="bg-[#0A1C7C] text-white px-5 py-3 text-sm font-semibold">
              {c.title}
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {c.headline}
              </div>
              {c.sub && (
                <div className="mt-2 text-sm text-emerald-700">{c.sub}</div>
              )}

              <div className="mt-5">
                <Link
                  href={c.href}
                  className="inline-flex items-center gap-2 text-sm rounded-full border px-3 py-1.5 text-neutral-800 hover:bg-neutral-50"
                >
                  Expand
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}