"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function pageview(url: string) {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

export function event(action: string, params?: { [key: string]: string | number | boolean }) {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", action, params);
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      console.log("Google Analytics not configured. Set NEXT_PUBLIC_GA_ID in .env.local");
      return;
    }

    const url = pathname + searchParams.toString();

    // Load GA script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer!.push(args);
    }
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    if (GA_MEASUREMENT_ID && window.gtag) {
      const url = pathname + searchParams.toString();
      pageview(url);
    }
  }, [pathname, searchParams]);

  return null;
}

export default GoogleAnalytics;
