"use client";

import React from "react";

export type Person = {
  name: string;
  role?: string;
  photo?: string;
  bio?: string;
};

export default function PeopleGrid({
  title = "People",
  people = [],
}: {
  title?: string;
  people: Person[];
}) {
  const [open, setOpen] = React.useState<Person | null>(null);

  // Esc to close
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{title}</h2>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((p, i) => (
            <li
              key={`${p.name}-${i}`}
              className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(p)}
                className="w-full text-left focus:outline-none focus:ring-2 focus:ring-[#0A1C7C]/40"
                aria-label={`Open bio for ${p.name}`}
              >
                {/* Uncropped image */}
                <div className="bg-white">
                  <div className="relative aspect-[4/3]">
                    {p.photo ? (
                      <img
                        src={p.photo}
                        alt={p.name}
                        className="absolute inset-0 h-full w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                        No photo
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-lg font-semibold text-neutral-900">{p.name}</div>
                  {p.role && (
                    <div className="text-sm font-medium text-[#0A1C7C]">{p.role}</div>
                  )}
                  {p.bio && (
                    <div className="pt-1 text-xs text-neutral-500">Click to read bio</div>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Modal (prevents layout shift; Close definitely closes) */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          {/* backdrop */}
          <button
            aria-label="Close"
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(null)}
          />
          <div className="relative z-[71] w-full sm:max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/95 px-4 py-3 sm:px-6">
              <div>
                <div className="text-lg font-semibold">{open.name}</div>
                {open.role && (
                  <div className="text-sm text-[#0A1C7C] font-medium">{open.role}</div>
                )}
              </div>
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="rounded-full border px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
              >
                Close
              </button>
            </div>

            {/* Body */}
            <div className="grid gap-4 sm:grid-cols-[220px,1fr] p-4 sm:p-6">
              <div className="bg-white">
                <div className="relative aspect-[4/3] rounded-lg border">
                  {open.photo && (
                    <img
                      src={open.photo}
                      alt={open.name}
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  )}
                </div>
              </div>

              <article className="prose prose-neutral max-w-none">
                {open.bio
                  ? open.bio.split("\n\n").map((para, idx) => <p key={idx}>{para}</p>)
                  : <p>No biography available.</p>}
              </article>
            </div>
          </div>
        </div>
      )}
    </>
  );
}