"use client";

import { useSession } from "@/lib/useSession";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui";

export function Header() {
  const { user } = useSession();

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <Input
            type="search"
            placeholder="Pesquisar vagas, candidatos..."
            className="pl-10 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors">
          <Bell className="w-5 h-5 text-[var(--color-text-muted)]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-danger)] rounded-full" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-text-inverse)] font-medium text-sm">
            {user?.email?.[0].toUpperCase() || "U"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-[var(--color-text)]">
              {user?.name || user?.email}
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {user?.role === "recruiter" ? "Recrutador" : "Visualizador"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
