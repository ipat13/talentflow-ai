"use client";

import { useSession } from "@/lib/useSession";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Search, LogOut, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui";
import { useState } from "react";

export function Header() {
  const { user } = useSession();
  const { signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
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

        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm" aria-hidden="true">
              {user?.email?.[0].toUpperCase() || "U"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-white">
                {user?.name || user?.email}
              </p>
              <p className="text-xs text-slate-400">
                {user?.role === "recruiter" ? "Recrutador" : "Visualizador"}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Terminar Sessão
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
