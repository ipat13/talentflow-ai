"use client";

import FeaturesSection from "./components/FeaturesSection";
import FeaturesSectionSimple from "./components/FeaturesSectionSimple";

export default function TestFeaturesPage() {
  return (
    <div className="min-h-screen bg-[#F7FFF7]">
      {/* Hero Simples para Contexto */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-6 font-poppins">
            Features Section Showcase
          </h1>
          <p className="text-lg text-[#95A5A6] max-w-2xl mx-auto">
            Two different implementations of the features section, both following the TalentsFlow.ai design system.
          </p>
        </div>
      </div>

      {/* Primeira Versão - Mais Detalhada */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 font-poppins">
            Version 1: Detailed with Hover Effects
          </h2>
        </div>
        <FeaturesSection />
      </div>

      {/* Separador */}
      <div className="py-12 bg-gradient-to-r from-[#006EB8]/5 via-[#45B7D1]/5 to-[#4ECDC4]/5">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full px-6 py-3 bg-white/80 backdrop-blur-sm border border-[#E2E8F0]">
            <span className="text-[#45B7D1] mr-2">🔄</span>
            <span className="text-[#2C3E50] font-medium">Scroll to see the second version</span>
          </div>
        </div>
      </div>

      {/* Segunda Versão - Mais Simples */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 font-poppins">
            Version 2: Clean and Minimal
          </h2>
        </div>
        <FeaturesSectionSimple />
      </div>

      {/* Comparação das Características */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2C3E50] mb-12 text-center font-poppins">
            Design Specifications
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#F7FFF7] rounded-xl p-6 border border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#006EB8]/10 to-[#45B7D1]/10 flex items-center justify-center mb-4">
                <span className="text-xl">📐</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C3E50] mb-2">Grid Layout</h3>
              <p className="text-[#95A5A6] text-sm">
                3-column grid on desktop, 2 on tablet, 1 on mobile
              </p>
            </div>
            
            <div className="bg-[#F7FFF7] rounded-xl p-6 border border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#45B7D1]/10 to-[#4ECDC4]/10 flex items-center justify-center mb-4">
                <span className="text-xl">🎨</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C3E50] mb-2">Color System</h3>
              <p className="text-[#95A5A6] text-sm">
                Uses exact colors from TalentsFlow.ai design system
              </p>
            </div>
            
            <div className="bg-[#F7FFF7] rounded-xl p-6 border border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4ECDC4]/10 to-[#006EB8]/10 flex items-center justify-center mb-4">
                <span className="text-xl">✏️</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C3E50] mb-2">Typography</h3>
              <p className="text-[#95A5A6] text-sm">
                Poppins for titles (16-18px), Inter for body text
              </p>
            </div>
            
            <div className="bg-[#F7FFF7] rounded-xl p-6 border border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#006EB8]/10 to-[#4ECDC4]/10 flex items-center justify-center mb-4">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C3E50] mb-2">Hover Effects</h3>
              <p className="text-[#95A5A6] text-sm">
                Card elevation, border color change, smooth transitions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}