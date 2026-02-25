"use client";

import { useSession } from "@/lib/useSession";
import { Button } from "@/components/ui";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui";
import { Chrome, Loader2 } from "lucide-react";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const { user, loading, signInWithGoogle } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  useEffect(() => {
    if (user && !loading) {
      router.push(redirect);
    }
  }, [user, loading, router, redirect]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">TalentFlow AI</CardTitle>
          <p className="text-[var(--color-text-muted)] mt-2">
            Sistema de Recrutamento Inteligente
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-medium text-[var(--color-text)]">
              Iniciar Sessão
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Usa a tua conta Google para continuar
            </p>
          </div>

          <Button
            onClick={handleGoogleLogin}
            variant="primary"
            size="lg"
            className="w-full gap-3"
          >
            <Chrome className="w-5 h-5" />
            Entrar com Google
          </Button>

          <p className="text-xs text-center text-[var(--color-text-muted)]">
            Ao entrares, concordas com os nossos termos de serviço.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
