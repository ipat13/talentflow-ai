"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Users, Briefcase, Zap, Search, Globe, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl text-center space-y-8">
        <Badge className="bg-pink-500/30 text-pink-200 border-pink-400/50 px-4 py-1 text-lg">
          Powered by DeepSeek AI
        </Badge>
        <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
          Recrutamento Inteligente com DeepSeek
        </h1>
        <p className="text-xl text-purple-200 max-w-2xl mx-auto">
          Automatize a triagem de currículos e encontre os melhores talentos 
          em segundos com o poder da inteligência artificial generativa.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={handleSignIn} 
            disabled={isLoading} 
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 shadow-lg shadow-pink-500/25"
          >
            {isLoading ? "A entrar..." : "Entrar com Google"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full">
        <FeatureCard 
          icon={<Zap className="text-yellow-400" />} 
          title="Análise Instantânea" 
          desc="DeepSeek AI analisa competências e fit cultural em milissegundos." 
        />
        <FeatureCard 
          icon={<Globe className="text-pink-400" />} 
          title="Sourcing LinkedIn" 
          desc="Integração com OpenClaw para extrair talentos diretamente da rede." 
        />
        <FeatureCard 
          icon={<Search className="text-purple-400" />} 
          title="Match Score" 
          desc="Ranking inteligente baseado nos requisitos reais da tua vaga." 
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <Card className="bg-black/30 border border-slate-800 text-left p-6 hover:border-slate-600 transition-colors">
      <div className="mb-4 text-2xl">{icon}</div>
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{desc}</p>
    </Card>
  );
}
