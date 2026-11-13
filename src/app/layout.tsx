import type { Metadata, Viewport } from "next";
import "./globals.css";
import { portfolioData } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: `${portfolioData.profile.fullName} — Academic, Patent & Collegiate Portfolio (MLRITM '27)`,
  description: portfolioData.profile.shortBio,
  keywords: [
    "Atchyuteswar Gottumukkala",
    "MLRITM Hyderabad",
    "B.Tech CSE Data Science",
    "SAP Certified ABAP Cloud",
    "ABAP RAP",
    "Patents",
    "Academic Portfolio",
    "Data Science Undergraduate",
    "Full-Stack Engineer",
  ],
  authors: [{ name: portfolioData.profile.fullName, url: portfolioData.profile.links.freelanceSite }],
  openGraph: {
    title: `${portfolioData.profile.fullName} — Academic, Patent & Collegiate Dossier`,
    description: portfolioData.profile.shortBio,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.profile.fullName} — Academic & Patent Portfolio`,
    description: portfolioData.profile.shortBio,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased selection:bg-[#9E2A2B]/20 selection:text-[#9E2A2B] dark:selection:bg-[#E06D53]/30 dark:selection:text-[#E06D53]">
        {children}
      </body>
    </html>
  );
}
