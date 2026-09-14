import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { siteConfig } from "@/config/site";
import { OrganizationSchema } from "@/components/Schema";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Dhana Laxmi Construction | Properties in Rayagada, Odisha",
    template: "%s | Dhana Laxmi Construction",
  },
  description: siteConfig.description,
  keywords: [
    "Dhana Laxmi Construction",
    "property in Rayagada",
    "plots in Rayagada",
    "residential plot Ashok Nagar",
    "house for sale Rayagada",
    "real estate Odisha",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Dhana Laxmi Construction | Properties in Rayagada, Odisha",
    description: siteConfig.description,
    images: [{ url: "/logo.png", width: 1685, height: 933, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhana Laxmi Construction | Properties in Rayagada, Odisha",
    description: siteConfig.description,
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <OrganizationSchema />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
