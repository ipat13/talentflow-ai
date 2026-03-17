"use client";

import HeroSection from "./components/HeroSection";

export default function TestHeroPage() {
  return (
    <div className="min-h-screen bg-[#F7FFF7]">
      <HeroSection />
      
      {/* Conteúdo adicional para testar scroll */}
      <div className="container mx-auto px-4 py-32">
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div 
              key={item} 
              className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006EB8]/10 to-[#4ECDC4]/10 flex items-center justify-center mb-6">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-4">
                Feature {item}
              </h3>
              <p className="text-[#95A5A6]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-32 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-6">
            Scroll down to see the fixed header in action
          </h2>
          <p className="text-[#95A5A6] max-w-2xl mx-auto">
            The header becomes solid with a slight blur effect when you scroll down, 
            maintaining the professional look while providing better contrast.
          </p>
        </div>
      </div>
    </div>
  );
}