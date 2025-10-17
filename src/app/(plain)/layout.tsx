// src/app/(plain)/layout.tsx
import React from "react";
import "../globals.css";
import "../theme.css";

export default function PlainLayout({ children }: { children: React.ReactNode }) {
  // Minimal shell: no header, no breadcrumbs, no overlays
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}