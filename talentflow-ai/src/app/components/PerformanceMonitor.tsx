"use client";

import { useEffect } from "react";

export function PerformanceMonitor() {
  useEffect(() => {
    // Report Web Vitals
    const reportWebVitals = async (metric: any) => {
      // Only log in development
      if (process.env.NODE_ENV === "development") {
        console.log("Web Vitals:", metric);
      }
    };

    // Measure CLS (Cumulative Layout Shift)
    const observeCLS = () => {
      let clsValue = 0;
      let clsEntries: any[] = [];
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as PerformanceEntry & { hadRecentInput?: boolean };
          if (!clsEntry.hadRecentInput) {
            clsEntries.push(entry);
            clsValue += (entry as any).value;
          }
        }
      });

      try {
        observer.observe({ type: "layout-shift", buffered: true });
      } catch (e) {
        // Not supported
      }

      // Report CLS on page hide
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          reportWebVitals({
            name: "CLS",
            value: clsValue,
            entries: clsEntries,
            id: "cls",
          });
        }
      });
    };

    // Measure LCP (Largest Contentful Paint)
    const measureLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        reportWebVitals({
          name: "LCP",
          value: lastEntry.startTime,
          entries: [lastEntry],
          id: "lcp",
        });
      });

      try {
        observer.observe({ type: "largest-contentful-paint", buffered: true });
      } catch (e) {
        // Not supported
      }
    };

    // Measure FID (First Input Delay)
    const measureFID = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          reportWebVitals({
            name: "FID",
            value: (entry as any).processingStart - entry.startTime,
            entries: [entry],
            id: "fid",
          });
        }
      });

      try {
        observer.observe({ type: "first-input", buffered: true });
      } catch (e) {
        // Not supported
      }
    };

    // Run all measurements
    observeCLS();
    measureLCP();
    measureFID();

    // Also use web-vitals library pattern for INP (Interaction to Next Paint)
    const measureINP = () => {
      let inp = 0;
      let inpEntries: PerformanceEventTiming[] = [];

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const eventEntry = entry as PerformanceEntry & { interactionId?: number };
          if (eventEntry.interactionId) {
            inpEntries.push(entry as PerformanceEventTiming);
          }
        }
      });

      try {
        observer.observe({ type: "event", buffered: true });
      } catch (e) {
        // Not supported
      }

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          inpEntries.forEach((entry) => {
            const duration = entry.processingStart + entry.duration - entry.startTime;
            if (duration > inp) {
              inp = duration;
            }
          });
          
          if (inp > 0) {
            reportWebVitals({
              name: "INP",
              value: inp,
              id: "inp",
            });
          }
        }
      });
    };

    measureINP();
  }, []);

  return null;
}
