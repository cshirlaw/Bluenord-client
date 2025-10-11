'use client';

export default function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-sky-50/50 p-3 text-xs leading-relaxed text-slate-600" style={{ borderColor: '#E5E7EB' }}>
      {children}
    </div>
  );
}