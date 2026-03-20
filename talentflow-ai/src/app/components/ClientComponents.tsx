"use client";

import { Suspense } from "react";
import { ReducedMotion } from "./ReducedMotion";
import { KeyboardNavigation } from "./KeyboardNavigation";
import { PerformanceMonitor } from "./PerformanceMonitor";
import { BrowserCompatibility } from "./BrowserCompatibility";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";
import { GoogleAnalytics } from "./GoogleAnalytics";

export function ClientComponents() {
  return (
    <>
      <ReducedMotion />
      <KeyboardNavigation />
      <PerformanceMonitor />
      <BrowserCompatibility />
      <ServiceWorkerRegistration />
      <Suspense fallback={null}>
        <GoogleAnalytics />
      </Suspense>
    </>
  );
}
