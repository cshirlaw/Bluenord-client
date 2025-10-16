export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Resources &amp; Reserves</h1>
      <p className="text-neutral-800">
        Total resources: <strong>213,000,000 boe</strong> (2P reserves &amp; 2C
        resources). Add a breakdown table and evaluator details here.
      </p>
      <ul className="list-disc pl-6 text-neutral-700">
        <li>2P vs 2C breakdown</li>
        <li>Effective date &amp; evaluator</li>
        <li>Methodology (SPE-PRMS)</li>
      </ul>
      <p className="text-xs text-neutral-500">Units and definitions per SPE-PRMS.</p>
    </main>
  );
}