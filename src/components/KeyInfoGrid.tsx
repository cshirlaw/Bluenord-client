import Link from "next/link";

type KeyCard = {
  heading: string;
  metric: string;
  sub?: string;
  kicker?: string;
  expandHref?: string;
};

function StatCard({ c }: { c: KeyCard }) {
  return (
    <li className="rounded-2xl overflow-hidden shadow-sm border border-blue-900/10 bg-white">
      <div className="bg-[#0A1C7C] text-white px-4 py-3 text-center text-base font-semibold">
        {c.heading}
      </div>

      <div className="px-4 py-4 text-center">
        {c.kicker && <div className="text-gray-600 text-sm mb-1">{c.kicker}</div>}
        <div className="text-2xl md:text-4xl font-bold leading-tight tracking-tight text-[#0A1C7C]">
          {c.metric}
        </div>
        {c.sub && <div className="mt-1 text-teal-600 text-sm">{c.sub}</div>}
      </div>

      <div className="px-4 pb-4">
        {c.expandHref && (
          <Link
            href={c.expandHref}
            className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900"
          >
            <span className="inline-block border border-gray-300 rounded px-1 py-[2px] text-[9px] leading-none">⤢</span>
            Expand
          </Link>
        )}
      </div>
    </li>
  );
}

export default function KeyInfoGrid({ title, cards }: { title: string; cards: KeyCard[] }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          <span className="text-[#0A1C7C]">BlueNord</span> <span>Key Information</span>
        </h2>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => <StatCard key={i} c={c} />)}
        </ul>
      </div>
    </section>
  );
}