import type { NextConfig } from "next";
import { resolveEnvironment } from "./lib/env/resolve";

/**
 * Beeliv public website (beeliv.co / www.beeliv.co). This repo serves ONLY the marketing pages:
 * Home, About, For Businesses, Training, Contact, Request (Hire Talent / Book a Service Audit), plus the enquiry API.
 * Every app page lives on its own domain; a link here to one of them is sent there with the SAME path.
 */
const TALENT = "https://talent.beeliv.co";
const AWAY: Record<string, string> = {
  // Talent app (Applicant + Staff, one sign-in): accounts, jobs, legal pages.
  login: TALENT, signup: TALENT, "verify-email": TALENT, "forgot-password": TALENT, "reset-password": TALENT,
  invite: TALENT, "access-denied": TALENT, "account-suspended": TALENT, applicant: TALENT, staff: TALENT,
  jobs: TALENT, privacy: TALENT, terms: TALENT,
  admin: "https://admin.beeliv.co",
  client: "https://client.beeliv.co",
};

// Non-production environments (local, preview) also say noindex in a response header, on top of the page metadata.
const nonProduction = resolveEnvironment(process.env).env !== "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return Object.entries(AWAY).flatMap(([seg, home]) => [
      { source: `/${seg}`, destination: `${home}/${seg}`, permanent: false },
      { source: `/${seg}/:path*`, destination: `${home}/${seg}/:path*`, permanent: false },
    ]);
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          ...(nonProduction ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
    ];
  },
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.postimg.cc" },
    ],
  },
};

export default nextConfig;
