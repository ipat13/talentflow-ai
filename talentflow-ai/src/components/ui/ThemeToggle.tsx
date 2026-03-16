"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    } else {
      setTheme("system");
      applyTheme(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const applyTheme = (selectedTheme: Theme) => {
    const root = document.documentElement;
    
    if (selectedTheme === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", systemPrefersDark);
      localStorage.removeItem("theme");
    } else {
      root.classList.toggle("dark", selectedTheme === "dark");
      localStorage.setItem("theme", selectedTheme);
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
        <div className="w-8 h-8 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />
      </div>
    );
  }

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: "light", icon: <Sun size={18} />, label: "Claro" },
    { value: "dark", icon: <Moon size={18} />, label: "Escuro" },
    { value: "system", icon: <Monitor size={18} />, label: "Sistema" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => handleThemeChange(t.value)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
            theme === t.value
              ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50"
          }`}
          aria-label={`Mudar para tema ${t.label}`}
          title={`Tema ${t.label}`}
        >
          <span className="flex-shrink-0">{t.icon}</span>
          <span className="text-sm font-medium hidden sm:inline">{t.label}</span>
        </button>
      ))}
    </div>
  );
}