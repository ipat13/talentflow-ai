"use client";

import { ReducedMotion } from "./ReducedMotion";
import { KeyboardNavigation } from "./KeyboardNavigation";
import { PerformanceMonitor } from "./PerformanceMonitor";
import { BrowserCompatibility } from "./BrowserCompatibility";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";

export function ClientComponents() {
  return (
    <>
      <ReducedMotion />
      <KeyboardNavigation />
      <PerformanceMonitor />
      <BrowserCompatibility />
      <ServiceWorkerRegistration />
    </>
  );
}
