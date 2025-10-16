import ReportsStoreClient from "./store-client";

export const dynamic = "force-dynamic"; // ensure fresh API reads in dev
export const metadata = {
  title: "Reports Store | BlueNord",
};

export default function ReportsStorePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Reports Store</h1>
        <p className="mt-2 opacity-70">
          Browse and search all PDFs from the <code>public/reports</code> folders.
        </p>
      </header>
      <ReportsStoreClient />
    </main>
  );
}