"use client";
import React from "react";

export default function Prose({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`prose prose-neutral max-w-none ${className}`}>
      {children}
    </div>
  );
}