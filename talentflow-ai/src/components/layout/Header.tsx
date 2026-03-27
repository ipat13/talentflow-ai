"use client";

import { useSession } from "@/lib/useSession";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Search, LogOut, ChevronDown, Settings, User } from "lucide-react";
import { Input } from "@/components/ui";
import { useState } from "react";
import Link from "next/link";

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
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 shadow-sm" role="banner">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
          <Input
            type="search"
            placeholder="Search jobs, candidates..."
            aria-label="Search jobs and candidates"
            className="pl-10 w-full bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600" aria-hidden="true" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full" aria-hidden="true" />
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-medium text-sm" aria-hidden="true">
              {user?.email?.[0].toUpperCase() || "U"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900">
                {user?.name || user?.email}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role === "recruiter" ? "Recruiter" : "Viewer"}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.name || user?.email}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Link
                href="/settings"
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Profile Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
