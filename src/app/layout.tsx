import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "RudderKit — Vendor Compliance Document Collection for Contractors",
  description:
    "Stop chasing vendors for W-9s, insurance certificates, and licenses. Send one link, they upload, you track compliance from one dashboard. Built for South Florida contractors and property managers.",
  keywords: [
    "vendor compliance",
    "document collection",
    "contractor paperwork",
    "W-9 collection",
    "insurance certificate tracking",
    "subcontractor compliance",
    "vendor document management",
    "COI tracking",
    "contractor compliance software",
    "South Florida contractors",
  ],
  openGraph: {
    title: "RudderKit — Stop Chasing Vendors for Paperwork",
    description:
      "Collect W-9s, insurance certs, and licenses from every vendor and sub. One link, no vendor login, full compliance visibility.",
    type: "website",
    locale: "en_US",
    siteName: "RudderKit",
  },
  twitter: {
    card: "summary_large_image",
    title: "RudderKit — Stop Chasing Vendors for Paperwork",
    description:
      "Collect W-9s, insurance certs, and licenses from every vendor and sub. One link, no vendor login, full compliance visibility.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
