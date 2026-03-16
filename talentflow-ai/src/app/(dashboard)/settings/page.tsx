"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from "@/components/ui";
import { User, Mail, Bell, Shield, Moon, Sun, Loader2 } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Definições</h1>
        <p className="text-slate-300">Gerir as tuas preferências e conta</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              Perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="displayName" className="text-slate-300 text-sm mb-2 block">Nome</label>
              <Input
                id="displayName"
                name="displayName"
                defaultValue={user?.displayName || ""}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="O teu nome"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-slate-300 text-sm mb-2 block">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={user?.email || ""}
                disabled
                className="bg-slate-700/50 border-slate-600 text-slate-400"
                autoComplete="email"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-300">Receber notificações por email</span>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications ? "bg-indigo-600" : "bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </label>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              Aspeto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-300">Modo Escuro</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  darkMode ? "bg-indigo-600" : "bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    darkMode ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </label>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Autenticação Google</p>
                <p className="text-slate-400 text-sm">Conta conectada: {user?.email}</p>
              </div>
              <Button variant="outline" size="sm" disabled>
                Conectado
              </Button>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              A guardar...
            </>
          ) : (
            "Guardar Alterações"
          )}
        </Button>
      </div>
    </div>
  );
}
