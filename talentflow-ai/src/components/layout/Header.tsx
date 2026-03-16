"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Bell, Search, User, Settings, LogOut, ChevronDown, Sparkles } from "lucide-react";
import { Input } from "@/components/ui";
import { GradientAvatar, NotificationBadge } from "@/components/ui/VisualEffects";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Move dropdown para o body quando abre e força z-index máximo
  useEffect(() => {
    if (showDropdown && dropdownRef.current && profileButtonRef.current) {
      const dropdown = dropdownRef.current;
      const button = profileButtonRef.current;
      
      // Calcula posição
      const rect = button.getBoundingClientRect();
      const top = rect.bottom + window.scrollY + 8;
      const right = window.innerWidth - rect.right - window.scrollX;
      
      // Move dropdown para o body se não estiver lá
      if (dropdown.parentElement !== document.body) {
        document.body.appendChild(dropdown);
      }
      
      // Força estilos que garantem visibilidade
      dropdown.style.cssText = `
        position: fixed !important;
        top: ${top}px !important;
        right: ${right}px !important;
        z-index: 2147483647 !important;
        width: 12rem !important;
        background: rgba(30, 41, 59, 0.9) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(71, 85, 105, 0.5) !important;
        border-radius: 0.75rem !important;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
        padding: 0.5rem 0 !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      `;
    }
    
    // Quando fecha, devolve dropdown ao local original
    return () => {
      if (!showDropdown && dropdownRef.current) {
        const dropdown = dropdownRef.current;
        const originalContainer = document.querySelector('.relative');
        
        if (originalContainer && dropdown.parentElement === document.body) {
          originalContainer.appendChild(dropdown);
          dropdown.style.cssText = '';
        }
      }
    };
  }, [showDropdown]);

  // Fecha dropdown quando clica fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && 
          profileButtonRef.current && 
          !dropdownRef.current.contains(event.target as Node) && 
          !profileButtonRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleProfileClick = () => {
    setShowDropdown(false);
    window.location.href = "/profile";
  };

  const handleSettingsClick = () => {
    setShowDropdown(false);
    window.location.href = "/settings";
  };

  const handleSignOut = async () => {
    if (confirm("Tens a certeza que queres terminar sessão?")) {
      try {
        setShowDropdown(false);
        await signOut();
        window.location.href = "/";
      } catch (error) {
        console.error("Sign out error:", error);
      }
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="glass-header h-16 flex items-center justify-between px-4 md:px-6 relative animate-slide-down" role="banner">
      <div className="flex items-center gap-4 flex-1">
        <div className="hidden md:block relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
           <Input
            id="global-search"
            name="global-search"
            type="search"
            placeholder="Pesquisar vagas, candidatos..."
            aria-label="Pesquisar vagas e candidatos"
            className="pl-10 w-full bg-slate-700/30 border-slate-600/50 text-white placeholder-slate-400 rounded-xl hover:border-slate-500/70 focus:border-indigo-500/70 transition-all duration-300"
          />
        </div>
        <div className="md:hidden flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white text-gradient bg-gradient-to-r from-indigo-400 to-purple-400">TalentFlow</h1>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Theme Toggle */}
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
        
        <button 
          className="md:hidden p-2 rounded-xl hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 transition-all duration-300 hover-lift"
          aria-label="Pesquisar"
        >
          <Search className="w-5 h-5 text-slate-300" aria-hidden="true" />
        </button>
        
        <button 
          className="relative p-2 rounded-xl hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 transition-all duration-300 hover-lift ripple"
          aria-label="Notificações"
        >
          <Bell className="w-5 h-5 text-slate-300" aria-hidden="true" />
          <NotificationBadge count={3} />
        </button>

        <div className="relative">
          <button
            ref={profileButtonRef}
            onClick={toggleDropdown}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500 transition-all duration-300 hover-lift"
            aria-label="Menu do utilizador"
            aria-expanded={showDropdown}
            type="button"
            id="profile-menu-button"
          >
             <GradientAvatar
               text={user?.email || "User"}
               size={32}
               className="flex-shrink-0"
             />
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-all duration-300 ${showDropdown ? "rotate-180 text-indigo-400" : ""} hidden sm:block`} />
          </button>

          {/* Dropdown que será movido para o body */}
          {showDropdown && user && (
            <div 
              ref={dropdownRef}
              className="absolute right-0 top-full mt-2 w-48 bg-slate-800/90 backdrop-blur-xl border border-slate-600/50 rounded-xl shadow-2xl py-2 glass-card"
              style={{ display: 'none' }} // Inicialmente escondido, será mostrado pelo JavaScript
              data-profile-menu="true"
            >
              <div className="px-4 py-3 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                   <GradientAvatar
                     text={user?.email || "User"}
                     size={32}
                   />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user.displayName || user.email?.split("@")[0]}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleProfileClick} 
                className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 flex items-center gap-2 group"
              >
                <User className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                Perfil
              </button>
              <button 
                onClick={handleSettingsClick} 
                className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 flex items-center gap-2 group"
              >
                <Settings className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                Definições
              </button>
               <div className="px-4 py-2 border-t border-slate-700/50 mt-2">
                 <div className="text-xs text-slate-500 mb-2">Tema</div>
                 <div className="sm:hidden">
                   <ThemeToggle />
                 </div>
                 <div className="hidden sm:block text-sm text-slate-400">
                   Use o seletor no cabeçalho
                 </div>
               </div>
               
               <button 
                 onClick={handleSignOut} 
                 className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 flex items-center gap-2 group mt-1"
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
