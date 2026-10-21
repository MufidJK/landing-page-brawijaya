import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: "The Brawijaya - Cluster Modern Klasik di Serpong",
  description: "The Brawijaya, cluster 2 lantai bergaya klasik modern di Serpong, Tangerang Selatan. Mulai dari Rp970 Juta.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "The Brawijaya",
    url: "/",
    title: "The Brawijaya - Cluster Modern Klasik di Serpong",
    description: "The Brawijaya, cluster 2 lantai bergaya klasik modern di Serpong, Tangerang Selatan. Mulai dari Rp970 Juta.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Brawijaya - Cluster Modern Klasik di Serpong",
    description: "The Brawijaya, cluster 2 lantai bergaya klasik modern di Serpong, Tangerang Selatan. Mulai dari Rp970 Juta.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
