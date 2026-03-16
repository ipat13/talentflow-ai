"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { User, Mail, Calendar } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Perfil</h1>
        <p className="text-slate-300">Informações da tua conta</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl">
                {user?.email?.[0].toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {user?.displayName || user?.email?.split("@")[0]}
                </h2>
                <p className="text-slate-400">Conta Google</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contacto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">{user?.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Informações da Conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">UID</span>
                <span className="text-slate-300 font-mono text-sm">{user?.uid}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
