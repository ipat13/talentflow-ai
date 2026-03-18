"use client";

import { useState } from "react";

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: "🤖",
    title: "AI-Powered Interviews",
    description: "Conduct consistent and unbiased technical interviews with our advanced AI interviewer that adapts to each candidate's skill level.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    color: "from-[#00D2FF]/10 to-[#64DFFF]/10"
  },
  {
    id: 2,
    icon: "📊",
    title: "Comprehensive Evaluation",
    description: "Get detailed reports on candidates' technical skills, problem-solving abilities, and communication with actionable insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    color: "from-[#7C3AED]/10 to-[#A78BFA]/10"
  },
  {
    id: 3,
    icon: "⚡",
    title: "Time-Saving Efficiency",
    description: "Reduce screening time and schedule interviews 24/7, streamlining your hiring pipeline from weeks to just days.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    color: "from-[#10B981]/10 to-[#34D399]/10"
  },
  {
    id: 4,
    icon: "📈",
    title: "Data-Driven Insights",
    description: "Make informed decisions with comprehensive analytics and benchmarking tools that identify top talent efficiently.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
    color: "from-[#F59E0B]/10 to-[#FBBF24]/10"
  },
  {
    id: 5,
    icon: "🎯",
    title: "Customizable Assessments",
    description: "Tailor interview questions and coding challenges to your company's specific needs and technical requirements.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80",
    color: "from-[#EC4899]/10 to-[#F472B6]/10"
  },
  {
    id: 6,
    icon: "👥",
    title: "Collaborative Hiring",
    description: "Easily share candidate reports and collaborate with your hiring team through our integrated platform.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
    color: "from-[#00D2FF]/10 to-[#64DFFF]/10"
  }
];

export default function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 bg-[#0A192F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-[#00D2FF10] text-[#00D2FF] mb-6">
            <span className="mr-2">✨</span>
            Why HR Teams Choose TalentsFlow.ai
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Revolutionize Your Tech Hiring Process
          </h2>
          
          <p className="text-lg md:text-xl text-[#8892B0] leading-relaxed">
            Our AI-powered platform combines cutting-edge technology with human expertise 
            to deliver the most efficient and effective hiring experience.
          </p>
        </div>

        {/* Grid de Funcionalidades - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="relative group"
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Principal */}
              <div className={`
                relative h-full bg-[#112240] rounded-2xl overflow-hidden border border-[#233554]
                transition-all duration-300 ease-out
                ${hoveredCard === feature.id ? 'transform scale-[1.02] shadow-xl shadow-[#00D2FF]/10' : ''}
              `}>
                {/* Imagem de Fundo */}
                <div className="absolute inset-0 opacity-20">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay Gradiente */}
                <div className={`
                  absolute inset-0 bg-gradient-to-t ${feature.color}
                  transition-opacity duration-300
                  ${hoveredCard === feature.id ? 'opacity-100' : 'opacity-0'}
                `} />
                
                {/* Conteúdo */}
                <div className="relative p-8 z-10">
                  {/* Ícone */}
                  <div className={`
                    w-16 h-16 rounded-xl mb-6 flex items-center justify-center
                    bg-gradient-to-br ${feature.color}
                    transition-transform duration-300
                    ${hoveredCard === feature.id ? 'scale-110' : 'scale-100'}
                  `}>
                    <span className="text-3xl">
                      {feature.icon}
                    </span>
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>

                  {/* Descrição */}
                  <p className="text-[#8892B0] leading-relaxed text-base">
                    {feature.description}
                  </p>
                </div>

                {/* Indicador de Hover (Linha Inferior) */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-1
                  bg-gradient-to-r ${feature.color}
                  transition-all duration-300
                  ${hoveredCard === feature.id ? 'opacity-100' : 'opacity-0'}
                `} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
