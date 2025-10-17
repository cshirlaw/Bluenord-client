'use client';

import * as React from 'react';

export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
};

export default function Accordion({
  items,
  allowMultiple = true,
}: {
  items: AccordionItem[];
  allowMultiple?: boolean;
}) {
  const [openIds, setOpenIds] = React.useState<string[]>(
    items.filter(i => i.defaultOpen).map(i => i.id)
  );

  function toggle(id: string) {
    setOpenIds((curr) => {
      const isOpen = curr.includes(id);
      if (isOpen) return curr.filter(x => x !== id);
      return allowMultiple ? [...curr, id] : [id];
    });
  }

  return (
    <div className="space-y-3">
      {items.map((it) => {
        const open = openIds.includes(it.id);
        return (
          <section key={it.id} className="rounded-2xl border border-emerald-200">
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${it.id}-panel`}
                onClick={() => toggle(it.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-slate-800 font-medium">{it.title}</span>
                <span
                  aria-hidden
                  className={`
                    inline-flex h-6 w-6 items-center justify-center rounded-full
                    border border-slate-300 text-slate-500 transition
                    ${open ? 'bg-slate-100 rotate-45' : 'bg-white'}
                  `}
                  title={open ? 'Collapse' : 'Expand'}
                >
                  {/* plus (rotates to ×) */}
                  <svg width="14" height="14" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
            </h3>

            <div
              id={`${it.id}-panel`}
              role="region"
              hidden={!open}
              className="px-5 pb-5"
            >
              <div className="prose prose-slate max-w-none">
                {it.content}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}