"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Chrome, Loader2, ArrowRight, Brain, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signInWithGoogle, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      window.location.href = "/dashboard";
    }
  }, [user, authLoading]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
           <p className="text-slate-600">Preparing your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
          {/* Logo and Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Powered by DeepSeek AI</span>
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  TalentFlow AI
                </h1>
                <p className="text-slate-600 text-sm">Recrutamento Inteligente</p>
              </div>
            </div>
            
             <h2 className="text-xl text-slate-900 mb-2">Sign In</h2>
            <p className="text-slate-600 text-sm">Usa a tua conta Google para continuar</p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative w-full px-6 py-4 bg-white text-slate-700 font-medium rounded-xl border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-3 mb-6"
          >
            <Chrome className="w-5 h-5" />
            <span>Entrar com Google</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} />
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Ou continue com email</span>
            </div>
          </div>

          {/* Email Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="seu.email@empresa.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="********"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-slate-600">Lembrar-me</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30"
            >
              Entrar com Email
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-center text-sm text-slate-500">
              Ao entrar, concordas com os nossos{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                 terms of service
              </a>
              .
            </p>
            
            <p className="text-center text-sm text-slate-500 mt-4">
               Don't have an account?{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                 Request a demo
              </a>
            </p>
          </div>
        </div>

        {/* Support Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Precisa de ajuda?{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Entre em contato com nosso suporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}