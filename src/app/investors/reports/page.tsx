'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import PageHero from '@/components/PageHero';

/* Brand/UI and types unchanged … */

const BRAND = { primary:'#0A2A4A', accent:'#00A3E0', text:'#0f172a', subtext:'#475569', border:'#E5E7EB', chip:'#EEF2F7' };

type ManifestItem = { title:string; year:number; href:string; size_bytes?:number; modified?:string; displayISO?:string; contentYear?:number; };
type Manifest = { count:number; items:ManifestItem[]; };

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDateISO(iso?: string){ if(!iso) return ''; const d=new Date(iso); if(Number.isNaN(d.getTime())) return ''; const dd=String(d.getUTCDate()).padStart(2,'0'); const mm=MONTHS[d.getUTCMonth()]; const yy=d.getUTCFullYear(); return `${dd} ${mm} ${yy}`; }
function fmtSize(bytes?: number){ if(!bytes||bytes<=0) return ''; const mb=bytes/(1024*1024); return `${mb.toFixed(2)} MB`; }

const FEATURED_HREFS = [
  '/reports/2025/BlueNord_ASA_Pareto_Securities_Energy_Conference_10_September_2025.pdf',
  '/reports/2025/bluenord-dnb-2025-energyshipping-conference.pdf',
];

export default function ReportsPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const initialQ = sp.get('q') ?? '';
  const initialYear = sp.get('year') ?? '';

  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [q, setQ] = useState<string>(initialQ);
  const [year, setYear] = useState<string>(initialYear);

  useEffect(() => {
    let alive = true;
    fetch('/reports/manifest.json', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then((j: Manifest | null) => { if (!alive) return; setManifest(j); })
      .catch(() => setManifest({ count: 0, items: [] }));
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (year) params.set('year', year);
    const qs = params.toString();
    router.replace(`/investors/reports${qs ? `?${qs}` : ''}`);
  }, [q, year, router]);

  const yearsAvailable = useMemo(() => {
    const ys = new Set<number>();
    (manifest?.items ?? []).forEach(i => ys.add(i.contentYear ?? i.year));
    return Array.from(ys).sort((a,b)=>b-a);
  }, [manifest]);

  const itemsWithFlags = useMemo(() =>
    (manifest?.items ?? []).map(i => ({
      ...i,
      isFeatured: FEATURED_HREFS.includes(i.href),
      sortDate: i.displayISO ?? i.modified ?? '',
    })), [manifest]);

  const filtered = useMemo(() => {
    const yr = year ? parseInt(year, 10) : undefined;
    const qLower = q.trim().toLowerCase();
    const arr = itemsWithFlags.filter(i => {
      const yrOk = yr ? (i.contentYear ?? i.year) === yr : true;
      const qOk = qLower ? i.title.toLowerCase().includes(qLower) : true;
      return yrOk && qOk;
    });
    const groupA = arr.filter(i => i.isFeatured);
    const groupB = arr.filter(i => !i.isFeatured);
    const byDateDesc = (a:any,b:any)=>(new Date(b.sortDate).getTime()||0)-(new Date(a.sortDate).getTime()||0);
    groupA.sort(byDateDesc); groupB.sort(byDateDesc);
    return [...groupA, ...groupB];
  }, [itemsWithFlags, q, year]);

  const onOpenAll = () => { filtered.forEach(i => window.open(i.href, '_blank', 'noopener,noreferrer')); };

  return (
    <>
      {/* Hero with subtle gradient overlay */}
      <PageHero
        imageSrc="/images/hero/hero.jpg"
        imageAlt="Reports & Results"
        title="Reports & Results"
        intro="Annual and interim reports, results presentations and downloads."
        overlay="gradient"
        overlayStrength={70}
        size="compact"
        mode="contain"
      />

      <div className="mx-auto max-w-6xl px-4 pb-10">
        {/* Controls */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <div>
              <label className="mb-1 block text-xs font-medium" style={{ color: BRAND.subtext }}>Search</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search titles…"
                className="w-full rounded-xl border px-3 py-2 text-sm md:w-64"
                style={{ borderColor: BRAND.border }}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium" style={{ color: BRAND.subtext }}>Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-xl border px-3 py-2 text-sm md:w-40"
                style={{ borderColor: BRAND.border }}
              >
                <option value="">All years</option>
                {yearsAvailable.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={onOpenAll}
            className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
            style={{ borderColor: BRAND.border, color: BRAND.primary }}
            disabled={!filtered.length}
            title="Open all visible PDFs in new tabs"
          >
            Open all in new tabs ({filtered.length})
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.map((i) => {
            const dateStr = fmtDateISO(i.displayISO ?? i.modified);
            const sizeStr = fmtSize(i.size_bytes);
            const isFeatured = FEATURED_HREFS.includes(i.href);
            return (
              <div key={i.href} className="flex items-center justify-between rounded-2xl border p-4" style={{ borderColor: BRAND.border }}>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="truncate text-base font-medium" style={{ color: BRAND.text }}>
                      {i.title}
                    </div>
                    {isFeatured && (
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{ background: BRAND.chip, color: BRAND.primary }}
                        title="Pinned to the top of the list"
                      >
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-xs" style={{ color: BRAND.subtext }}>
                    {dateStr}{sizeStr ? ` · ${sizeStr}` : ''}
                  </div>
                </div>
                <a
                  href={i.href}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-3 inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-sm shadow-sm transition hover:bg-gray-50"
                  style={{ borderColor: BRAND.border, color: BRAND.primary }}
                >
                  Open <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            );
          })}

          {!filtered.length && (
            <div className="rounded-2xl border p-6 text-sm" style={{ borderColor: BRAND.border, color: BRAND.subtext }}>
              No results. Try clearing the search or year filter.
            </div>
          )}
        </div>
      </div>
    </>
  );
}