'use client';

import Link from 'next/link';

export default function DownloadBar({
  pdfHref, xlsxHref,
}: { pdfHref?: string; xlsxHref?: string }) {
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: '#E5E7EB' }}>
      <div className="text-sm font-medium text-slate-900">Downloads</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {pdfHref && (
          <a
            href={pdfHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
            style={{ borderColor: '#E5E7EB', color: '#0A2A4A' }}
          >
            PDF deck
          </a>
        )}
        {xlsxHref && (
          <a
            href={xlsxHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
            style={{ borderColor: '#E5E7EB', color: '#0A2A4A' }}
          >
            Data (.xlsx)
          </a>
        )}
        <Link
          href="/investors/reports"
          className="inline-flex items-center rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
          style={{ borderColor: '#E5E7EB', color: '#0A2A4A' }}
        >
          Reports hub
        </Link>
      </div>
    </div>
  );
}