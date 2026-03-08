"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Bell, Search, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-slate-800/50 backdrop-blur-xl border-b border-slate-700" role="banner">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
          <Input
            type="search"
            placeholder="Pesquisar vagas, candidatos..."
            aria-label="Pesquisar vagas e candidatos"
            className="pl-10 w-full bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 rounded-xl"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          className="relative p-2 rounded-lg hover:bg-slate-700 transition-colors"
          aria-label="Notificações"
        >
          <Bell className="w-5 h-5 text-slate-300" aria-hidden="true" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full" aria-hidden="true" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-700 transition-colors"
            aria-label="Menu do utilizador"
            aria-expanded={showDropdown}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
              {user?.email?.[0].toUpperCase() || "U"}
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-700">
                <p className="text-sm font-medium text-white truncate">
                  {user?.displayName || user?.email?.split("@")[0]}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {user?.email}
                </p>
              </div>
              
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    router.push("/profile");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  Perfil
                </button>
                
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    router.push("/settings");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Definições
                </button>
              </div>

              <div className="border-t border-slate-700 pt-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Terminar Sessão
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
