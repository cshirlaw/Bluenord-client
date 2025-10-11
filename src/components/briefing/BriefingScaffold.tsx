'use client';

import React from 'react';

export default function BriefingScaffold({
  title,
  subtitle,
  children,
  aside,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** optional right-side rail for links/notes on desktop */
  aside?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10">
      {/* Header */}
      <header className="mb-5 mt-4">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        ) : null}
      </header>

      {/* Body grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">{children}</div>
        {aside ? (
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-4">{aside}</div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}