"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import VideoBackground from "./VideoBackground";
import ImagePlaceholder from "./ImagePlaceholder";

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
          ? "bg-[#0A192F]/90 backdrop-blur-md shadow-sm border-b border-[#233554]" 
          : "bg-transparent"
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D2FF] to-[#64DFFF] flex items-center justify-center">
                <span className="text-[#0A192F] font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-white">
                TalentsFlow.ai
              </span>
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="#features" 
                className="text-sm font-medium text-white hover:text-[#00D2FF] transition-colors"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="text-sm font-medium text-white hover:text-[#00D2FF] transition-colors"
              >
                How it Works
              </a>
              <a 
                href="#pricing" 
                className="text-sm font-medium text-white hover:text-[#00D2FF] transition-colors"
              >
                Pricing
              </a>
              <a 
                href="#contact" 
                className="text-sm font-medium text-white hover:text-[#00D2FF] transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Botão CTA */}
            <div className="flex items-center space-x-4">
              <a 
                href="#login" 
                className="hidden md:inline-block text-sm font-medium text-white hover:text-[#00D2FF] transition-colors"
              >
                Sign In
              </a>
              <button className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium bg-[#00D2FF] text-[#0A192F] hover:bg-[#00B8E6] transition-all duration-300 shadow-sm hover:shadow-md">
                Get Started Free
              </button>
            </div>

            {/* Menu Mobile */}
            <button className="md:hidden p-2 rounded-lg hover:bg-[#112240] transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Seção Hero Principal */}
      <section className="relative min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-[#030712]">
        {/* Vídeo de Fundo */}
        <VideoBackground 
          src="/videos/hero-bg.mp4"
          fallbackGradient="linear-gradient(135deg, #030712 0%, #0A192F 50%, #030712 100%)"
        />
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#22d3ee] rounded-full blur-[120px] opacity-[0.15] -translate-x-1/2 -translate-y-1/4" />
        <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-[#7c3aed] rounded-full blur-[120px] opacity-[0.15] translate-x-1/4" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
             {/* Conteúdo Textual - Lado Esquerdo */}
            <div className="text-left">
              {/* Badge de Destaque */}
              <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-[#00D2FF10] text-[#00D2FF] mb-8 animate-fade-in">
                <span className="mr-2">🚀</span>
                Revolutionizing Tech Hiring with AI
              </div>

              {/* Título Principal com Gradiente */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white animate-slide-in-left">
                Streamline Your{" "}
                <span className="bg-gradient-to-r from-[#00D2FF] via-[#64DFFF] to-[#00D2FF] bg-clip-text text-transparent">
                  Tech Hiring Process
                </span>
              </h1>

              {/* Subtítulo */}
              <p className="text-lg md:text-xl text-[#8892B0] mb-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Empower your HR team with AI-driven interviews. Evaluate candidates efficiently, 
                reduce bias, and make data-driven hiring decisions that transform your recruitment.
              </p>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <button className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-medium bg-[#00D2FF] text-[#0A192F] hover:bg-[#00B8E6] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1">
                  <span>Start Free Trial</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                
                <button className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-medium border-2 border-[#233554] text-white hover:border-[#00D2FF] hover:text-[#00D2FF] transition-all duration-300">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Estatísticas/Métricas */}
              <div className="mt-12 pt-8 border-t border-[#233554] animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">95%</div>
                    <div className="text-sm text-[#8892B0]">Time Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-[#2C3E50]">4.8/5</div>
                    <div className="text-sm text-[#95A5A6]">User Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
                    <div className="text-sm text-[#8892B0]">Companies</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ilustração/Imagem - Lado Direito */}
            <div className="relative animate-slide-in-right">
              {/* Container Principal da Ilustração */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm">
                {/* Placeholder para Imagem/Video */}
                <ImagePlaceholder 
                  src="/images/hero-dashboard.jpg"
                  alt="AI Interview Dashboard Preview"
                  className="aspect-[4/3]"
                  icon="🎯"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 glass rounded-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00D2FF]/20 flex items-center justify-center">
                    <span>📊</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#94a3b8]">Analytics</p>
                    <p className="text-sm font-semibold text-white">Live</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 glass rounded-xl p-4 animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7c3aed]/20 flex items-center justify-center">
                    <span>🤖</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#94a3b8]">AI Powered</p>
                    <p className="text-sm font-semibold text-white">Active</p>
                  </div>
                </div>
              </div>
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
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-[#94a3b8]/30 flex justify-center">
            <div className="w-1 h-3 rounded-full bg-[#94a3b8]/50 mt-2"></div>
          </div>
        </div>
      </section>

      {/* Estilos de Animações Inline */}
      <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

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