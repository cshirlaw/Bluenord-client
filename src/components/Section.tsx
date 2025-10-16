// src/components/Section.tsx
import * as React from "react";

type Props = {
  eyebrow?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ eyebrow, title, className, children }: Props) {
  return (
    <section className={["space-y-3", className ?? ""].join(" ")}>
      {(eyebrow || title) && (
        <header className="mb-2">
          {eyebrow && (
            <div className="text-xs uppercase tracking-wide text-neutral-500">
              {eyebrow}
            </div>
          )}
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
        </header>
      )}
      {children}
    </section>
  );
}