export default function ProductionPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Current Production Details</h1>
      <p className="text-neutral-800">
        Q2 2025 production: <strong>37,800 boe/d</strong>. Add product split,
        uptime and recent quarterly trend here.
      </p>
      <ul className="list-disc pl-6 text-neutral-700">
        <li>Oil / Gas / NGL split</li>
        <li>Last 4–6 quarters trend</li>
        <li>Run-rate vs guidance</li>
      </ul>
      <p className="text-xs text-neutral-500">boe/d: barrels of oil equivalent per day.</p>
    </main>
  );
}