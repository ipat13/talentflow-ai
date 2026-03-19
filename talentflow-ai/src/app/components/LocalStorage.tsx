"use client";

import { useEffect } from "react";

const STORAGE_KEY = "talentsflow_preferences";

interface UserPreferences {
  theme?: "light" | "dark" | "system";
  visitedBefore?: boolean;
  lastVisit?: string;
  dismissedNotifications?: string[];
}

export function useLocalStorage() {
  useEffect(() => {
    // Check if user visited before
    const getPreferences = (): UserPreferences => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
      } catch {
        return {};
      }
    };

    const savePreferences = (prefs: UserPreferences) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      } catch (e) {
        console.warn("LocalStorage not available:", e);
      }
    };

    const prefs = getPreferences();
    
    // Update last visit
    prefs.lastVisit = new Date().toISOString();
    prefs.visitedBefore = prefs.visitedBefore || false;
    
    savePreferences(prefs);

    // Mark as visited
    if (!prefs.visitedBefore) {
      prefs.visitedBefore = true;
      savePreferences(prefs);
    }
  }, []);
}

export function clearPreferences() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("LocalStorage not available:", e);
  }
}
