"use client";

import React from "react";

/** Minimal, robust inline expander for bios. */
export type ExecPerson = {
  name: string;
  role?: string;
  photo?: string;
  bio?: string;
};

export default function ExecSimpleGrid({ people }: { people: ExecPerson[] }) {
  const [openName, setOpenName] = React.useState<string | null>(null);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Team</h2>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((p) => {
          const isOpen = openName === p.name;
          return (
            <li
              key={p.name}
              className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenName(isOpen ? null : p.name)}
                className="w-full text-left focus:outline-none focus:ring-2 focus:ring-[#0A1C7C]/40"
                aria-expanded={isOpen}
                aria-controls={`bio-${slug(p.name)}`}
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
                    <div className="pt-1 text-xs text-neutral-500">
                      {isOpen ? "Click to close" : "Click to read bio"}
                    </div>
                  )}
                </div>
              </button>

              {/* Inline bio */}
              {isOpen && p.bio && (
                <div
                  id={`bio-${slug(p.name)}`}
                  className="border-t px-4 py-4 sm:px-6"
                >
                  <article className="prose prose-neutral max-w-none">
                    {p.bio.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </article>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}