"use client";

import React, { useEffect, useRef } from "react";

/**
 * Progressive enhancement for <details>:
 * - Only one open at a time (accordion)
 * - Close on outside click
 * - Close on Escape
 * - Close buttons with data-close="details"
 */
export default function DetailsAccordion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const detailsList = Array.from(root.querySelectorAll<HTMLDetailsElement>("details"));

    // Keep only one open
    const onToggle = (e: Event) => {
      const current = e.currentTarget as HTMLDetailsElement;
      if (current.open) {
        detailsList.forEach((d) => {
          if (d !== current) d.open = false;
        });
      }
    };
    detailsList.forEach((d) => d.addEventListener("toggle", onToggle));

    // Close on Esc
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        detailsList.forEach((d) => (d.open = false));
      }
    };
    document.addEventListener("keydown", onKey);

    // Close on outside click
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (!root.contains(target)) {
        detailsList.forEach((d) => (d.open = false));
      }
    };
    document.addEventListener("click", onDocClick);

    // Explicit close buttons inside the accordion
    const onRootClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const closeBtn = target.closest<HTMLElement>('[data-close="details"]');
      if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        const d = closeBtn.closest("details") as HTMLDetailsElement | null;
        if (d) d.open = false;
      }
    };
    root.addEventListener("click", onRootClick);

    return () => {
      detailsList.forEach((d) => d.removeEventListener("toggle", onToggle));
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
      root.removeEventListener("click", onRootClick);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}