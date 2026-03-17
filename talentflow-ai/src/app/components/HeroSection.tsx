"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Menu de Navegação Fixo e Transparente */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200" 
          : "bg-transparent"
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#006EB8] to-[#4ECDC4] flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-[#2C3E50] font-poppins">
                TalentsFlow.ai
              </span>
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="#features" 
                className="text-sm font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="text-sm font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors"
              >
                How it Works
              </a>
              <a 
                href="#pricing" 
                className="text-sm font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors"
              >
                Pricing
              </a>
              <a 
                href="#contact" 
                className="text-sm font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Botão CTA */}
            <div className="flex items-center space-x-4">
              <a 
                href="#login" 
                className="hidden md:inline-block text-sm font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors"
              >
                Sign In
              </a>
              <button className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium bg-[#006EB8] text-white hover:bg-[#005A9C] transition-all duration-300 shadow-sm hover:shadow-md">
                Get Started Free
              </button>
            </div>

            {/* Menu Mobile */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-[#2C3E50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Seção Hero Principal */}
      <section className="relative min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background Gradiente Sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7FFF7] via-white to-[#F7FFF7] opacity-90" />
        
        {/* Elementos Decorativos */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#006EB8]/5 to-[#4ECDC4]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#45B7D1]/5 to-[#4ECDC4]/5 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Conteúdo Textual - Lado Esquerdo */}
            <div className="text-left">
              {/* Badge de Destaque */}
              <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-[#45B7D110] text-[#45B7D1] mb-8 animate-fade-in">
                <span className="mr-2">🚀</span>
                Revolutionizing Tech Hiring with AI
              </div>

              {/* Título Principal com Gradiente */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-poppins animate-slide-in-left">
                Streamline Your{" "}
                <span className="bg-gradient-to-r from-[#006EB8] via-[#45B7D1] to-[#4ECDC4] bg-clip-text text-transparent">
                  Tech Hiring Process
                </span>
              </h1>

              {/* Subtítulo */}
              <p className="text-lg md:text-xl text-[#95A5A6] mb-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Empower your HR team with AI-driven interviews. Evaluate candidates efficiently, 
                reduce bias, and make data-driven hiring decisions that transform your recruitment.
              </p>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <button className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-medium bg-[#006EB8] text-white hover:bg-[#005A9C] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1">
                  <span>Start Free Trial</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                
                <button className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-medium border-2 border-[#E2E8F0] text-[#2C3E50] hover:border-[#006EB8] hover:text-[#006EB8] transition-all duration-300">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Estatísticas/Métricas */}
              <div className="mt-12 pt-8 border-t border-[#E2E8F0] animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-[#2C3E50]">95%</div>
                    <div className="text-sm text-[#95A5A6]">Time Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-[#2C3E50]">4.8/5</div>
                    <div className="text-sm text-[#95A5A6]">User Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-[#2C3E50]">500+</div>
                    <div className="text-sm text-[#95A5A6]">Companies</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ilustração/Imagem - Lado Direito */}
            <div className="relative animate-slide-in-right">
              {/* Container Principal da Ilustração */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-gradient-to-br from-white/90 to-[#F7FFF7]/90 backdrop-blur-sm">
                {/* Mockup de Dashboard */}
                <div className="p-6">
                  {/* Header do Dashboard */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-sm font-medium text-[#2C3E50]">AI Interview Dashboard</div>
                    <div className="w-8 h-8 rounded-full bg-[#006EB8]/10 flex items-center justify-center">
                      <span className="text-[#006EB8] text-sm">👤</span>
                    </div>
                  </div>

                  {/* Conteúdo do Dashboard */}
                  <div className="space-y-4">
                    {/* Gráfico */}
                    <div className="h-32 rounded-xl bg-gradient-to-r from-[#006EB8]/10 to-[#4ECDC4]/10 p-4">
                      <div className="flex items-end h-full space-x-2">
                        {[30, 60, 45, 80, 65, 90, 75].map((height, index) => (
                          <div 
                            key={index}
                            className="flex-1 rounded-t-lg bg-gradient-to-t from-[#006EB8] to-[#45B7D1]"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Cards de Métricas */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-white p-4 border border-[#E2E8F0]">
                        <div className="text-xs text-[#95A5A6] mb-1">Interviews Today</div>
                        <div className="text-xl font-bold text-[#2C3E50]">24</div>
                        <div className="text-xs text-green-500">+12%</div>
                      </div>
                      <div className="rounded-xl bg-white p-4 border border-[#E2E8F0]">
                        <div className="text-xs text-[#95A5A6] mb-1">Avg. Score</div>
                        <div className="text-xl font-bold text-[#2C3E50]">8.7</div>
                        <div className="text-xs text-green-500">+0.3</div>
                      </div>
                    </div>

                    {/* Lista de Candidatos */}
                    <div className="rounded-xl bg-white p-4 border border-[#E2E8F0]">
                      <div className="text-sm font-medium text-[#2C3E50] mb-3">Recent Candidates</div>
                      <div className="space-y-3">
                        {[
                          { name: "Alex Johnson", role: "Frontend Dev", score: 9.2 },
                          { name: "Maria Garcia", role: "Backend Eng", score: 8.8 },
                          { name: "David Chen", role: "Full Stack", score: 9.5 }
                        ].map((candidate, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#006EB8]/20 to-[#4ECDC4]/20 flex items-center justify-center">
                                <span className="text-[#006EB8] text-sm">
                                  {candidate.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-[#2C3E50]">{candidate.name}</div>
                                <div className="text-xs text-[#95A5A6]">{candidate.role}</div>
                              </div>
                            </div>
                            <div className="text-sm font-bold text-[#006EB8]">{candidate.score}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elementos Flutuantes Decorativos */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#45B7D1]/20 to-[#4ECDC4]/20 backdrop-blur-sm border border-white/30 shadow-lg flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#006EB8]/20 to-[#45B7D1]/20 backdrop-blur-sm border border-white/30 shadow-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-[#95A5A6]/30 flex justify-center">
            <div className="w-1 h-3 rounded-full bg-[#95A5A6]/50 mt-2"></div>
          </div>
        </div>
      </section>

      {/* Estilos de Animações Inline */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </>
  );
}