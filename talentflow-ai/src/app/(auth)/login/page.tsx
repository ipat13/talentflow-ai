"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui";
import { Card, CardContent } from "@/components/ui";
import { Chrome, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signInWithGoogle, user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
      <main id="main-content" className="w-full max-w-md">
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">TalentFlow AI</h1>
              <p className="text-indigo-300">Sistema de Recrutamento Inteligente</p>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-xl text-white mb-1">Iniciar Sessão</h2>
              <p className="text-white/60 text-sm">Usa a tua conta Google para continuar</p>
            </div>

            <Button
              onClick={handleGoogleLogin}
              size="lg"
              className="w-full bg-white text-indigo-900 hover:bg-gray-100 font-semibold py-3"
              aria-label="Entrar com conta Google"
            >
              <Chrome className="w-5 h-5 mr-2" aria-hidden="true" />
              Entrar com Google
            </Button>

            <p className="text-center text-white/40 text-xs mt-6">
              Ao entrares, concordas com os nossos termos de serviço.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
