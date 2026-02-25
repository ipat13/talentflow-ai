"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Users, Briefcase, Zap, Search, Globe } from "lucide-react";

export default function Home() {
  const { user, signInWithGoogle } = useAuth();

  // --- ESTADO: NÃO LOGADO (Landing Page) ---
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl text-center space-y-8">
          <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 px-4 py-1">
            Powered by DeepSeek AI
          </Badge>
          <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Recrutamento Inteligente com DeepSeek
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Automatize a triagem de currículos e encontre os melhores talentos 
            em segundos com o poder da inteligência artificial generativa.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={signInWithGoogle} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
              Entrar com Google
            </Button>
            <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-900">
              Ver Demonstração
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full">
          <FeatureCard icon={<Zap />} title="Análise Instantânea" desc="DeepSeek AI analisa competências e fit cultural em milissegundos." />
          <FeatureCard icon={<Globe />} title="Sourcing LinkedIn" desc="Integração com OpenClaw para extrair talentos diretamente da rede." />
          <FeatureCard icon={<Search />} title="Match Score" desc="Ranking inteligente baseado nos requisitos reais da tua vaga." />
        </div>
      </div>
    );
  }

  // --- ESTADO: LOGADO (Dashboard) ---
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard TalentFlow</h1>
          <p className="text-slate-500">Bem-vindo, {user.displayName}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Importar LinkedIn</Button>
          <Button className="bg-indigo-600">Nova Vaga</Button>
        </div>
      </header>

      {/* Grid de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Vagas Ativas" value="12" icon={<Briefcase className="text-indigo-600" />} />
        <StatsCard title="Candidatos em Análise" value="148" icon={<Users className="text-emerald-600" />} />
        <StatsCard title="Strong Matches" value="24" icon={<Zap className="text-amber-500" />} />
      </div>

      {/* Feed de Candidatos */}
      <h2 className="text-xl font-semibold mb-4 text-slate-800">Candidatos Recentes</h2>
      <div className="space-y-4">
        <CandidateRow name="Ana Silva" role="Senior Frontend Engineer" score={92} />
        <CandidateRow name="João Pereira" role="Data Scientist" score={85} />
        <CandidateRow name="Marta Santos" role="Product Designer" score={74} />
      </div>
    </div>
  );
}

// --- COMPONENTES AUXILIARES ---

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <Card className="bg-slate-900/50 border-slate-800 text-left p-6">
      <div className="text-indigo-400 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
    </Card>
  );
}

function StatsCard({ title, value, icon }: { title: string, value: string, icon: any }) {
  return (
    <Card>
      <CardContent className="flex items-center p-6 gap-4">
        <div className="p-3 bg-slate-100 rounded-lg">{icon}</div>
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function CandidateRow({ name, role, score }: { name: string, role: string, score: number }) {
  return (
    <Card className="hover:border-indigo-200 transition-colors">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="font-bold text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">{role}</p>
        </div>
        <Badge className={score >= 80 ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-600"}>
          {score}% Match
        </Badge>
      </CardContent>
    </Card>
  );
}
