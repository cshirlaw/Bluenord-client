export default function FinancialsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Financial Performance</h1>
      <p className="text-neutral-800">
        Latest quarter: <strong>$260M revenue</strong> · <strong>$133M EBITDA</strong> (Q2 2025).
        Add margin, bridge and links to reports.
      </p>
      <ul className="list-disc pl-6 text-neutral-700">
        <li>Margin and bridge (price/volume/cost)</li>
        <li>Net debt / cash and liquidity</li>
        <li>Link to quarterly report</li>
      </ul>
      <p className="text-xs text-neutral-500">USD unless noted. Basis as reported.</p>
    </main>
  );
}