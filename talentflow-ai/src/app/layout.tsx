import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClientComponents } from "./components/ClientComponents";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TalentsFlow.ai | AI-Powered Technical Interviews",
  description: "Revolutionize your tech hiring with AI-driven interviews. Evaluate candidates efficiently, reduce bias, and make data-driven hiring decisions.",
  keywords: ["AI hiring", "technical interviews", "recruitment software", "HR technology", "AI interviewer"],
  authors: [{ name: "TalentsFlow.ai" }],
  openGraph: {
    title: "TalentsFlow.ai | AI-Powered Technical Interviews",
    description: "Revolutionize your tech hiring with AI-driven interviews. Evaluate candidates efficiently, reduce bias.",
    url: "https://talentflow-ai-phi.vercel.app",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="canonical" href="https://talentflow-ai-phi.vercel.app" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#020617" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TalentsFlow.ai" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <ClientComponents />
        {children}
      </body>
    </html>
  );
}
