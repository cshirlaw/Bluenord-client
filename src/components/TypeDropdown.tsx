"use client";

import React from "react";

export type TypeSel = "all" | "presentation" | "report" | "annual";

export default function TypeDropdown({
  value,
  onChange,
  className = "",
}: {
  value: TypeSel;
  onChange: (v: TypeSel) => void;
  className?: string;
}) {
  return (
    <select
      className={`rounded-2xl border px-3 py-2 text-sm bg-white ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value as TypeSel)}
      aria-label="Filter type"
    >
      <option value="presentation">Presentations</option>
      <option value="report">Reports</option>
      <option value="annual">Annual</option>
      <option value="all">All</option>
    </select>
  );
}