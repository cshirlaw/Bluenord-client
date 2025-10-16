// No fs/path imports here — keep this page STATIC.
import ReportsShell from "./reports-shell";

export const dynamic = "force-static";

export const metadata = {
  title: "Reports & Results | BlueNord",
  description: "Annual and interim reports, results presentations and downloads.",
};

export default function NewReportsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-12">
      {/* Static hero (no blue wash) */}
      <section
        className="relative isolate my-6 overflow-hidden rounded-2xl border border-neutral-200"
        style={{
          backgroundImage: `url('/images/hero/hero.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/35">
          <div className="px-6 py-10 md:px-10">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white drop-shadow">
              Reports &amp; Results
            </h1>
            <p className="mt-2 max-w-2xl text-white/90 drop-shadow">
              Annual and interim reports, results presentations and downloads.
            </p>
          </div>
        </div>
      </section>

      {/* Client-side loader that fetches /reports/manifest.json */}
      <ReportsShell />
    </main>
  );
}