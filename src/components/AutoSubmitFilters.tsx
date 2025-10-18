"use client";

import React from "react";

/**
 * Wrap your filter controls in this component.
 * It auto-submits the GET form to `action` whenever a <select> or <input>
 * value changes. Typing in the search box is debounced (default 250ms).
 */
export default function AutoSubmitFilters({
  action,
  children,
  className = "",
  debounceMs = 250,
}: {
  action: string;                // e.g. "/investors/reports"
  children: React.ReactNode;     // your selects / inputs
  className?: string;
  debounceMs?: number;           // debounce for <input type="search">
}) {
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const requestSubmit = React.useCallback(() => {
    // cancel any existing timer (for debounced inputs)
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    // requestSubmit triggers native form submit without needing a button
    formRef.current?.requestSubmit();
  }, []);

  const debouncedSubmit = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      formRef.current?.requestSubmit();
      timerRef.current = null;
    }, debounceMs);
  }, [debounceMs]);

  const onChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const el = e.target as HTMLElement | null;
    if (!el) return;

    // For selects (year/type) submit immediately.
    if (el.tagName === "SELECT") {
      requestSubmit();
      return;
    }

    // For inputs: if it's a search box, debounce; otherwise submit now.
    if (el.tagName === "INPUT") {
      const input = el as HTMLInputElement;
      if (input.type === "search" || input.type === "text") {
        debouncedSubmit();
      } else {
        requestSubmit();
      }
    }
  };

  // Pressing Enter in the search input will also submit normally.
  return (
    <form
      ref={formRef}
      action={action}
      method="get"
      onChange={onChange}
      className={className}
      role="search"
    >
      {children}
      {/* Keep a hidden submit for accessibility & programmatic submits */}
      <button type="submit" className="hidden" aria-hidden="true" />
    </form>
  );
}