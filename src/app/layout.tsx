import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NGTech - Expertise Tech & Impact Social",
  description: "Développement Mobile, Fullstack et Cyber-sécurité d'excellence. Nous formons les jeunes talents et créons des applications communautaires pour transformer la société.",
  keywords: ["développement mobile", "développement fullstack", "cyber-sécurité", "impact social", "applications communautaires", "guinée", "tech"],
  authors: [{ name: "NGTech" }],
  openGraph: {
    title: "NGTech - Expertise Tech & Impact Social",
    description: "Développement Mobile, Fullstack et Cyber-sécurité d'excellence avec impact social positif.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
