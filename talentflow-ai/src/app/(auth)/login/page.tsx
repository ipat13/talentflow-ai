"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui";
import { Card, CardContent } from "@/components/ui";
import { Chrome } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };

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
              disabled={isLoading}
              size="lg"
              className="w-full bg-white text-indigo-900 hover:bg-gray-100 font-semibold py-3 disabled:opacity-50"
              aria-label="Entrar com conta Google"
            >
              <Chrome className="w-5 h-5 mr-2" aria-hidden="true" />
              {isLoading ? "A entrar..." : "Entrar com Google"}
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
