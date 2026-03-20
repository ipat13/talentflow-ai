"use client";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

function trackGA(action: string, params?: { [key: string]: string | number | boolean }) {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", action, params);
  }
}

export function useAnalytics() {
  const trackPageView = (url: string) => {
    if (typeof window !== "undefined") {
      console.log("Page view:", url);
    }
  };

  const trackButtonClick = (buttonName: string, location?: string) => {
    trackGA("button_click", {
      button_name: buttonName,
      location: location || "unknown",
      timestamp: new Date().toISOString(),
    });
    console.log("Button clicked:", buttonName, location);
  };

  const trackFormSubmit = (formName: string, success: boolean) => {
    trackGA("form_submit", {
      form_name: formName,
      success: success,
      timestamp: new Date().toISOString(),
    });
    console.log("Form submitted:", formName, success);
  };

  const trackSectionView = (sectionName: string) => {
    trackGA("section_view", {
      section_name: sectionName,
      timestamp: new Date().toISOString(),
    });
    console.log("Section viewed:", sectionName);
  };

  const trackFeatureClick = (featureName: string) => {
    trackGA("feature_click", {
      feature_name: featureName,
      timestamp: new Date().toISOString(),
    });
    console.log("Feature clicked:", featureName);
  };

  return {
    trackPageView,
    trackButtonClick,
    trackFormSubmit,
    trackSectionView,
    trackFeatureClick,
  };
}
