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
    <li className="rounded-3xl overflow-hidden shadow-lg border border-blue-900/15 bg-white">
      <div className="bg-[#0A1C7C] text-white px-6 py-4 text-center text-lg font-semibold">
        {c.heading}
      </div>
      <div className="px-6 py-6 text-center">
        {c.kicker && <div className="text-gray-600 mb-1">{c.kicker}</div>}
        <div className="text-3xl md:text-5xl font-bold tracking-tight text-[#0A1C7C]">{c.metric}</div>
        {c.sub && <div className="mt-2 text-teal-500">{c.sub}</div>}
      </div>
      <div className="px-6 pb-5">
        {c.expandHref && (
          <Link href={c.expandHref} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <span className="inline-block border border-gray-300 rounded px-1.5 py-0.5 text-[10px]">⤢</span>
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
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          <span className="text-[#0A1C7C]">BlueNord</span> <span>Key Information</span>
        </h2>
        <ul className="mt-6 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => <StatCard key={i} c={c} />)}
        </ul>
      </div>
    </section>
  );
}