"use client";

import { useEffect, useCallback } from "react";

export function KeyboardNavigation() {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // ESC to close any open modals/menus (future use)
    if (e.key === "Escape") {
      // Close mobile menu if open
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu && !mobileMenu.classList.contains("max-h-0")) {
        const closeButton = document.querySelector('[aria-label="Close menu"]') as HTMLButtonElement;
        if (closeButton) closeButton.click();
      }
    }

    // Tab visibility - ensure focus is visible
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-nav");
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    document.body.classList.remove("keyboard-nav");
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleKeyDown, handleMouseDown]);

  return null;
}
