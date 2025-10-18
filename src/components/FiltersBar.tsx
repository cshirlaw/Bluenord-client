'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Kind = 'all' | 'report' | 'presentation' | 'annual' | 'other';

export default function FiltersBar(props: {
  years: number[];
  initialYear?: string; // 'all' or 'YYYY'
  initialType?: Kind;
  initialQ?: string;
  totalCount?: number; // optional, for status display
}) {
  const { years, totalCount } = props;

  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // URL = source of truth
  const urlYear = sp.get('year') ?? props.initialYear ?? 'all';
  const urlType = (sp.get('type') as Kind | null) ?? props.initialType ?? 'all';
  const urlQ = sp.get('q') ?? props.initialQ ?? '';

  // local state mirrors URL (so controls are controlled)
  const [yearSel, setYearSel] = React.useState(urlYear);
  const [typeSel, setTypeSel] = React.useState<Kind>(urlType);
  const [qRaw, setQRaw] = React.useState(urlQ);

  React.useEffect(() => {
    setYearSel(urlYear);
    setTypeSel(urlType);
    setQRaw(urlQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlYear, urlType, urlQ]);

  const push = React.useCallback(
    (y: string, t: Kind, q: string) => {
      const p = new URLSearchParams();
      if (y && y !== 'all') p.set('year', y);
      if (t && t !== 'all') p.set('type', t);
      if (q && q.trim()) p.set('q', q.trim());
      const qs = p.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    },
    [pathname, router]
  );

  // instant updates (no debounce)
  const onYearChange = (v: string) => {
    setYearSel(v);
    push(v, typeSel, qRaw);
  };
  const onTypeChange = (v: Kind) => {
    setTypeSel(v);
    push(yearSel, v, qRaw);
  };
  const onQueryChange = (v: string) => {
    setQRaw(v);
    push(yearSel, typeSel, v);
  };

  const onReset = () => {
    setYearSel('all');
    setTypeSel('all');
    setQRaw('');
    router.replace(pathname);
  };

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      {/* Year */}
      <label className="flex items-center gap-2 text-sm text-slate-600">
        <span className="font-medium">Year</span>
        <select
          value={yearSel}
          onChange={(e) => onYearChange(e.target.value)}
          className="rounded-lg border px-2.5 py-1.5 text-sm"
        >
          <option value="all">All</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </label>

      {/* Type */}
      <label className="ml-2 flex items-center gap-2 text-sm text-slate-600">
        <span className="font-medium">Type</span>
        <select
          value={typeSel}
          onChange={(e) =>
            onTypeChange((e.target.value as Kind) ?? 'all')
          }
          className="rounded-lg border px-2.5 py-1.5 text-sm"
        >
          <option value="all">All</option>
          <option value="report">Reports</option>
          <option value="presentation">Presentations</option>
          <option value="annual">Annual</option>
          <option value="other">Other</option>
        </select>
      </label>

      {/* Search */}
      <input
        type="search"
        inputMode="search"
        placeholder="Search by title or filename..."
        className="ml-auto w-[320px] max-w-[55vw] rounded-lg border px-3 py-1.5 text-sm"
        value={qRaw}
        onChange={(e) => onQueryChange(e.target.value)}
        onFocus={(e) => e.currentTarget.select()}
      />

      {/* Reset + status */}
      <button
        type="button"
        onClick={onReset}
        className="rounded-full border px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
      >
        Reset filters
      </button>

      <span className="text-xs text-slate-500">
        {`year=${yearSel} · type=${typeSel} · q="${qRaw}"`}
        {typeof totalCount === 'number' ? ` · of ${totalCount}` : ''}
      </span>
    </div>
  );
}