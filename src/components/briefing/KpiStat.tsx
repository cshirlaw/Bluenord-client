'use client';

import React from 'react';

export default function KpiStat({
  label, value, unit, footnote, onClick,
}: {
  label: string;
  value: string | number;
  unit?: string;
  footnote?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border bg-white p-4 text-left transition hover:bg-slate-50 active:bg-slate-100"
      style={{ borderColor: '#E5E7EB' }}
    >
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <div className="text-2xl font-semibold text-slate-900 tabular-nums">{value}</div>
        {unit ? <div className="text-sm text-slate-500">{unit}</div> : null}
      </div>
      {footnote ? <div className="mt-1 text-xs text-slate-500">{footnote}</div> : null}
    </button>
  );
}