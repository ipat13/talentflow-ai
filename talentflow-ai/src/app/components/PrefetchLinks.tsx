"use client";

import { useEffect } from "react";
import Link from "next/link";

interface PrefetchLinksProps {
  children: React.ReactNode;
}

export function PrefetchLinks({ children }: PrefetchLinksProps) {
  useEffect(() => {
    // Prefetch links when they come into view
    const prefetchOnVisible = () => {
      const links = document.querySelectorAll("a[href^='#']");
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const href = entry.target.getAttribute("href");
              if (href) {
                // Prefetch the target element
                const target = document.querySelector(href);
                if (target) {
                  // Load the page in background if needed
                  const url = window.location.pathname;
                  if (typeof window !== "undefined") {
                    // Browser API available
                    const link = document.createElement("link");
                    link.rel = "prefetch";
                    link.href = url;
                    document.head.appendChild(link);
                  }
                }
              }
            }
          });
        },
        { rootMargin: "100px" }
      );

      links.forEach((link) => observer.observe(link));
      
      return () => observer.disconnect();
    };

    // Run after page load
    if (document.readyState === "complete") {
      prefetchOnVisible();
    } else {
      window.addEventListener("load", prefetchOnVisible);
      return () => window.removeEventListener("load", prefetchOnVisible);
    }
  }, []);

  return <>{children}</>;
}
