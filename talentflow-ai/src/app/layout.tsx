"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import "./print.css";
import { ServiceWorkerRegistration } from "./components/ServiceWorkerRegistration";
import { ReducedMotion } from "./components/ReducedMotion";
import { KeyboardNavigation } from "./components/KeyboardNavigation";
import { PerformanceMonitor } from "./components/PerformanceMonitor";
import { BrowserCompatibility } from "./components/BrowserCompatibility";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "TalentsFlow.ai | AI-Powered Technical Interviews",
  description: "Revolutionize your tech hiring with AI-driven interviews. Evaluate candidates efficiently, reduce bias, and make data-driven hiring decisions.",
  keywords: ["AI hiring", "technical interviews", "recruitment software", "HR technology", "AI interviewer"],
  authors: [{ name: "TalentsFlow.ai" }],
  openGraph: {
    title: "TalentsFlow.ai | AI-Powered Technical Interviews",
    description: "Revolutionize your tech hiring with AI-driven interviews. Evaluate candidates efficiently, reduce bias.",
    url: "https://talentflow-ai-theta.vercel.app",
    siteName: "TalentsFlow.ai",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TalentsFlow.ai | AI-Powered Technical Interviews",
    description: "Revolutionize your tech hiring with AI-driven interviews.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";
  
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://talentflow-ai-theta.vercel.app" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#006EB8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TalentsFlow.ai" />
        
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ReducedMotion />
        <KeyboardNavigation />
        <PerformanceMonitor />
        <BrowserCompatibility />
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}