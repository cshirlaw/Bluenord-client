// src/components/AssetOverview.tsx
import React from "react";
import type { AssetItem } from "@/lib/assets";

type Props = {
  asset: AssetItem;
  heading?: string;      // Optional custom heading (defaults to "Overview")
  id?: string;           // Optional id for aria-labelledby targets
};

export default function AssetOverview({ asset, heading = "Overview", id }: Props) {
  const hasSummary = typeof asset?.summary === "string" && asset.summary.trim().length > 0;
  const hasFacts = Array.isArray(asset?.facts) && asset.facts.length > 0;

  if (!hasSummary && !hasFacts) return null;

  const titleId = id ? `${id}-title` : undefined;

  return (
    <section
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="text-xl font-semibold mb-3">
        {heading}
      </h2>

      {hasSummary && (
        <p className="text-neutral-700 leading-relaxed mb-4">
          {asset.summary!.trim()}
        </p>
      )}

      {hasFacts && (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {asset.facts!.map((f, idx) => {
            const label = f?.label ?? "";
            const value = f?.value ?? "";
            if (!label && !value) return null;
            return (
              <div key={`${label}-${value}-${idx}`} className="flex flex-col">
                {label && <dt className="text-sm text-neutral-500">{label}</dt>}
                {value && <dd className="text-base font-medium text-neutral-900">{value}</dd>}
              </div>
            );
          })}
        </dl>
      )}
    </section>
  );
}