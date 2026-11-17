import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toast";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { isProductionEnv } from "@/lib/env/sample-data";
import "./globals.css";

// App-wide (dashboards + everything except the new marketing site): Inter
// for headings, Karla for body — project-lead, 2026-09-16: "make sure the
// dashboards only use inter and the new body font only and no other fonts."
// Archivo/Bodoni Moda (beeliv.co's real display/logo fonts) are scoped to
// just the marketing-site draft's own layout instead (app/demo/
// marketing-site/layout.tsx), not applied here — they were briefly global
// but that pulled the dashboards off Inter too, which this reverts.
// Karla itself stays global: --font-sans had no concrete value defined
// anywhere before this (a real gap — see prior commit), so body text had
// been silently falling back to the browser default; Karla is the fix,
// independent of which heading font is active.
const interHeading = localFont({ src: [{ path: "./fonts/noto-sans-latin.woff2", weight: "100 900", style: "normal" }], variable: "--font-heading", display: "swap", adjustFontFallback: "Arial" });
// Desktop (768px and up) keeps the original pair: Newsreader headings + Karla body (see globals.css).
const desktopSerif = localFont({ src: [{ path: "./fonts/newsreader-latin.woff2", weight: "200 800", style: "normal" }], variable: "--font-serif-d", display: "swap", adjustFontFallback: "Times New Roman" });
const desktopSans = localFont({ src: [{ path: "./fonts/karla-latin.woff2", weight: "200 800", style: "normal" }], variable: "--font-sans-d", display: "swap", adjustFontFallback: "Arial" });
const karlaBody = localFont({ src: [{ path: "./fonts/inter-latin.woff2", weight: "100 900", style: "normal" }], variable: "--font-sans", display: "swap", adjustFontFallback: "Arial" });

// Non-production environments (local, staging) are never indexed; production keeps the default behaviour.
export function generateMetadata(): Metadata {
  return {
    title: {
      default: "Beeliv Hospitality",
      template: "%s | Beeliv Hospitality",
    },
    description: "Hospitality consulting, training and recruitment across Africa.",
    ...(isProductionEnv() ? {} : { robots: { index: false, follow: false } }),
  };
}

// The app never declared it's light-only, so Android Chrome's "Force Dark"
// auto-inverts the whole page — including skeleton/shimmer loaders, which
// go from light-gray-on-white to near-black-on-black and look broken/stuck
// rather than loading (project-lead: "still tripping with the old shimmer
// loader" — a phone screenshot showing exactly this). This tells the
// browser not to auto-invert; app/globals.css's `:root` also sets the
// matching CSS `color-scheme: light` for browsers that read it directly.
export const viewport: Viewport = {
  colorScheme: "only light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interHeading.variable} ${karlaBody.variable} ${desktopSerif.variable} ${desktopSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
