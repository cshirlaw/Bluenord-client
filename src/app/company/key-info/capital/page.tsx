export default function CapitalPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Capital Structure</h1>
      <p className="text-neutral-800">
        Share price: <strong>431 NOK</strong> · Market cap: <strong>11.2 B NOK</strong>.
        Add share count, free float, top holders and liquidity here.
      </p>
      <ul className="list-disc pl-6 text-neutral-700">
        <li>Share count &amp; free float</li>
        <li>Top 5 shareholders</li>
        <li>Net debt &amp; facility headroom</li>
      </ul>
      <p className="text-xs text-neutral-500">Figures illustrative; update per latest close.</p>
    </main>
  );
}