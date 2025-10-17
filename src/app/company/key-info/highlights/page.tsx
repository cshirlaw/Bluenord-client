export default function HighlightsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Highlights</h1>
      <p className="text-neutral-800">
        Refinancing completed with a $1.5 bn facility size. Add tenor, lenders,
        purpose and key terms here. Link any RNS/stock exchange notices.
      </p>
      <ul className="list-disc pl-6 text-neutral-700">
        <li>Margin &amp; maturity</li>
        <li>Borrowing base summary</li>
        <li>Liquidity headroom</li>
      </ul>
      <p className="text-xs text-neutral-500">Currency as reported. Date of announcement.</p>
    </main>
  );
}