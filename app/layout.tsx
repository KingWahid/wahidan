import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono, JetBrains_Mono, Inter_Tight, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wahidannashrullah.dev'),
  title: "Wahidannashrullah — Front-End Developer",
  description:
    "Portfolio of Wahidannashrullah, a Front-End Developer from Indonesia specializing in React, Next.js, and building fast, accessible web experiences.",
  openGraph: {
    title: "Wahidannashrullah — Front-End Developer",
    description:
      "Portfolio of Wahidannashrullah, a Front-End Developer from Indonesia specializing in React, Next.js, and building fast, accessible web experiences.",
    images: ["/images/og-image.jpg"],
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} ${jetbrainsMono.variable} ${interTight.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
