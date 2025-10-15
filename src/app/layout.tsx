import React from "react";
import "./globals.css";
import "./theme.css";
import { Inter } from "next/font/google";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import BreadcrumbsGate from "@/components/BreadcrumbsGate";
import type { Metadata } from "next";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "BlueNord Client";
const SITE_DESC =
  "Focused North Sea operator. Investor information, reports and assets.";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bluenord-client.vercel.app";
const OG_IMAGE = "/images/hero-offshore.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `${SITE_NAME} — %s`,
  },
  description: SITE_DESC,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESC,
    images: [OG_IMAGE],
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Prevent horizontal scroll with full-bleed sections */}
      <body className={`${inter.className} min-h-screen bg-white text-gray-900 overflow-x-hidden`}>
        <TopNav />

        {/* Breadcrumbs can stay in a container */}
        <div className="container mx-auto max-w-5xl px-4 pt-3">
          <BreadcrumbsGate />
        </div>

        {/* Make main full-width; pages add their own containers as needed */}
        <main id="main" className="mx-auto px-0 py-0">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}