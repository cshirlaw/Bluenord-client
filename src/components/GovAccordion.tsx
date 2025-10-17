'use client';

import React from 'react';

export type GovSection = {
  id: string;
  title: string;
  content: React.ReactNode;
  initiallyOpen?: boolean;
};

export default function GovAccordion({
  sections,
  allowMultiple = true,
}: {
  sections: GovSection[];
  allowMultiple?: boolean;
}) {
  // If allowMultiple=false, we control which single panel is open
  const [openId, setOpenId] = React.useState<string | null>(() => {
    const firstOpen = sections.find((s) => s.initiallyOpen);
    return firstOpen?.id ?? null;
  });

  return (
    <ul className="space-y-3">
      {sections.map((s) => {
        if (allowMultiple) {
          // Native <details>—robust and zero state bugs
          return (
            <li key={s.id} className="rounded-2xl border bg-white shadow-sm">
              <details
                className="group rounded-2xl overflow-hidden"
                {...(s.initiallyOpen ? { open: true } : {})}
              >
                <summary
                  className="list-none cursor-pointer select-none px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between gap-3
                             hover:bg-slate-50"
                  aria-controls={`panel-${s.id}`}
                >
                  <span className="font-medium">{s.title}</span>
                  <span
                    className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs
                               transition-transform group-open:rotate-180"
                    aria-hidden
                  >
                    ▾
                  </span>
                </summary>

                <div id={`panel-${s.id}`} className="border-t px-4 py-4 sm:px-6">
                  <div className="prose prose-slate max-w-none">{s.content}</div>
                </div>
              </details>
            </li>
          );
        }

        // Single-open mode (no <details>) — controlled by state
        const isOpen = openId === s.id;
        return (
          <li key={s.id} className="rounded-2xl border bg-white shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : s.id)}
              className="w-full text-left px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between gap-3 hover:bg-slate-50"
              aria-expanded={isOpen}
              aria-controls={`panel-${s.id}`}
            >
              <span className="font-medium">{s.title}</span>
              <span
                className={`ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden
              >
                ▾
              </span>
            </button>

            {isOpen && (
              <div id={`panel-${s.id}`} className="border-t px-4 py-4 sm:px-6">
                <div className="prose prose-slate max-w-none">{s.content}</div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}