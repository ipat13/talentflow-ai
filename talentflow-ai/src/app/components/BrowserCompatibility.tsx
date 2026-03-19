"use client";

import { useEffect } from "react";

export function BrowserCompatibility() {
  useEffect(() => {
    // Detect browser and add classes for feature detection
    const ua = navigator.userAgent;
    
    // Browser detection
    if (ua.indexOf("Firefox") > -1) {
      document.documentElement.classList.add("browser-firefox");
    } else if (ua.indexOf("Chrome") > -1 && ua.indexOf("Edg") === -1) {
      document.documentElement.classList.add("browser-chrome");
    } else if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") === -1) {
      document.documentElement.classList.add("browser-safari");
    } else if (ua.indexOf("Edg") > -1) {
      document.documentElement.classList.add("browser-edge");
    }

    // OS detection
    if (ua.indexOf("Mac") > -1) {
      document.documentElement.classList.add("os-mac");
    } else if (ua.indexOf("Windows") > -1) {
      document.documentElement.classList.add("os-windows");
    } else if (ua.indexOf("Linux") > -1) {
      document.documentElement.classList.add("os-linux");
    }

    // Feature detection
    if ("IntersectionObserver" in window) {
      document.documentElement.classList.add("feature-intersection-observer");
    }
    
    if ("MutationObserver" in window) {
      document.documentElement.classList.add("feature-mutation-observer");
    }
    
    if ("ontouchstart" in window) {
      document.documentElement.classList.add("feature-touch");
    }
    
    if (navigator.maxTouchPoints > 0) {
      document.documentElement.classList.add("feature-touch-points");
    }
  }, []);

  return null;
}
