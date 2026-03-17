"use client";

import { useState } from "react";

const features = [
  {
    id: 1,
    icon: "🤖",
    title: "AI-Powered Interviews",
    description: "Conduct consistent and unbiased technical interviews with our advanced AI interviewer that adapts to each candidate's skill level.",
    color: "from-[#006EB8]/10 to-[#45B7D1]/10",
    borderColor: "border-[#006EB8]/30",
    iconColor: "text-[#006EB8]"
  },
  {
    id: 2,
    icon: "📊",
    title: "Comprehensive Evaluation",
    description: "Get detailed reports on candidates' technical skills, problem-solving abilities, and communication with actionable insights.",
    color: "from-[#45B7D1]/10 to-[#4ECDC4]/10",
    borderColor: "border-[#45B7D1]/30",
    iconColor: "text-[#45B7D1]"
  },
  {
    id: 3,
    icon: "⚡",
    title: "Time-Saving Efficiency",
    description: "Reduce screening time and schedule interviews 24/7, streamlining your hiring pipeline from weeks to just days.",
    color: "from-[#4ECDC4]/10 to-[#006EB8]/10",
    borderColor: "border-[#4ECDC4]/30",
    iconColor: "text-[#4ECDC4]"
  },
  {
    id: 4,
    icon: "📈",
    title: "Data-Driven Insights",
    description: "Make informed decisions with comprehensive analytics and benchmarking tools that identify top talent efficiently.",
    color: "from-[#006EB8]/10 to-[#4ECDC4]/10",
    borderColor: "border-[#006EB8]/30",
    iconColor: "text-[#006EB8]"
  },
  {
    id: 5,
    icon: "🎯",
    title: "Customizable Assessments",
    description: "Tailor interview questions and coding challenges to your company's specific needs and technical requirements.",
    color: "from-[#45B7D1]/10 to-[#006EB8]/10",
    borderColor: "border-[#45B7D1]/30",
    iconColor: "text-[#45B7D1]"
  },
  {
    id: 6,
    icon: "👥",
    title: "Collaborative Hiring",
    description: "Easily share candidate reports and collaborate with your hiring team through our integrated platform.",
    color: "from-[#4ECDC4]/10 to-[#45B7D1]/10",
    borderColor: "border-[#4ECDC4]/30",
    iconColor: "text-[#4ECDC4]"
  }
];

export default function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 bg-[#F7FFF7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-[#45B7D110] text-[#45B7D1] mb-6">
            <span className="mr-2">✨</span>
            Why HR Teams Choose TalentsFlow.ai
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3E50] mb-6 font-poppins">
            Revolutionize Your Tech Hiring Process
          </h2>
          
          <p className="text-lg md:text-xl text-[#95A5A6] leading-relaxed">
            Our AI-powered platform combines cutting-edge technology with human expertise 
            to deliver the most efficient and effective hiring experience.
          </p>
        </div>

        {/* Grid de Funcionalidades - 3 Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="relative group"
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Principal */}
              <div className={`
                relative h-full bg-white rounded-2xl p-8 border border-[#E2E8F0]
                transition-all duration-300 ease-out
                ${hoveredCard === feature.id 
                  ? `shadow-xl transform -translate-y-2 border-[${feature.borderColor.split('/')[0]}]/50` 
                  : 'shadow-sm hover:shadow-md'
                }
                hover:border-[${feature.borderColor.split('/')[0]}]/50
              `}>
                {/* Ícone Sutil no Topo */}
                <div className={`
                  w-16 h-16 rounded-xl mb-8 flex items-center justify-center
                  bg-gradient-to-br ${feature.color}
                  transition-transform duration-300
                  ${hoveredCard === feature.id ? 'scale-110' : 'scale-100'}
                `}>
                  <span className={`text-3xl ${feature.iconColor}`}>
                    {feature.icon}
                  </span>
                </div>

                {/* Título Curto */}
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4 font-poppins">
                  {feature.title}
                </h3>

                {/* Descrição Pequena */}
                <p className="text-[#95A5A6] leading-relaxed text-base">
                  {feature.description}
                </p>

                {/* Indicador de Hover (Linha Inferior) */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl
                  bg-gradient-to-r ${feature.color}
                  transition-all duration-300
                  ${hoveredCard === feature.id ? 'opacity-100' : 'opacity-0'}
                `} />

                {/* Elemento Decorativo de Canto */}
                <div className={`
                  absolute top-4 right-4 w-3 h-3 rounded-full
                  bg-gradient-to-br ${feature.color}
                  transition-opacity duration-300
                  ${hoveredCard === feature.id ? 'opacity-100' : 'opacity-0'}
                `} />
              </div>

              {/* Efeito de Sombra Externa no Hover */}
              <div className={`
                absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color}
                opacity-0 blur-xl -z-10
                transition-opacity duration-300
                ${hoveredCard === feature.id ? 'opacity-20' : 'opacity-0'}
              `} />
            </div>
          ))}
        </div>

        {/* Rodapé da Seção */}
        <div className="mt-16 pt-12 border-t border-[#E2E8F0]">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-3xl font-bold text-[#2C3E50]">95%</div>
              <div className="text-[#95A5A6] text-base">Reduction in screening time</div>
            </div>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-[#2C3E50]">4.8/5</div>
              <div className="text-[#95A5A6] text-base">Average candidate satisfaction</div>
            </div>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-[#2C3E50]">10x</div>
              <div className="text-[#95A5A6] text-base">Faster hiring decisions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos de Animações */}
      <style jsx>{`
        @keyframes cardFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .group:hover .card-float {
          animation: cardFloat 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}