"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Palette,
  Layers,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobs", label: "Vagas", icon: Briefcase },
  { href: "/candidates", label: "Candidatos", icon: Users },
  { href: "/visual-demo", label: "Demo Visual", icon: Palette },
  { href: "/ui-showcase", label: "UI Showcase", icon: Layers },
  { href: "/settings", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg text-white"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`
          fixed md:relative top-0 left-0 h-screen
          bg-gradient-to-b from-slate-900 to-slate-800
          border-r border-slate-700/50
          transition-all duration-300 ease-in-out
          z-40
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              {!collapsed && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-white text-lg">TalentFlow</h1>
                    <p className="text-slate-400 text-xs">AI Recruiting</p>
                  </div>
                </div>
              )}
              {collapsed && (
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              )}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:flex p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-300
                      ${isActive
                        ? "bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-white border border-indigo-500/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                      }
                    `}
                  >
                    <div className={`
                      w-9 h-9 rounded-lg flex items-center justify-center
                      ${isActive
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                        : "bg-slate-800/50 group-hover:bg-slate-700/50"
                      }
                    `}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {!collapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-slate-700/50">
            <button
              onClick={signOut}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-800/50 group-hover:bg-slate-700/50 transition-all">
                <LogOut className="w-4 h-4" />
              </div>
              {!collapsed && <span className="font-medium">Sair</span>}
            </button>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}