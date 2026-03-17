"use client";

const features = [
  {
    id: 1,
    icon: "🤖",
    title: "AI-Powered Interviews",
    description: "Conduct consistent and unbiased technical interviews with our advanced AI interviewer.",
    gradient: "from-[#006EB8] to-[#45B7D1]"
  },
  {
    id: 2,
    icon: "📊",
    title: "Comprehensive Evaluation",
    description: "Get detailed reports on candidates' technical skills and problem-solving abilities.",
    gradient: "from-[#45B7D1] to-[#4ECDC4]"
  },
  {
    id: 3,
    icon: "⚡",
    title: "Time-Saving Efficiency",
    description: "Reduce screening time and schedule interviews 24/7, streamlining your hiring pipeline.",
    gradient: "from-[#4ECDC4] to-[#006EB8]"
  },
  {
    id: 4,
    icon: "📈",
    title: "Data-Driven Insights",
    description: "Make informed decisions with comprehensive analytics and benchmarking tools.",
    gradient: "from-[#006EB8] to-[#4ECDC4]"
  },
  {
    id: 5,
    icon: "🎯",
    title: "Customizable Assessments",
    description: "Tailor interview questions to your company's specific needs and requirements.",
    gradient: "from-[#45B7D1] to-[#006EB8]"
  },
  {
    id: 6,
    icon: "👥",
    title: "Collaborative Hiring",
    description: "Easily share candidate reports and collaborate with your hiring team.",
    gradient: "from-[#4ECDC4] to-[#45B7D1]"
  }
];

export default function FeaturesSectionSimple() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3E50] mb-6 font-poppins">
            How TalentsFlow.ai Works
          </h2>
          <p className="text-lg text-[#95A5A6] leading-relaxed">
            Discover the powerful features that make our platform the most efficient 
            solution for modern tech hiring.
          </p>
        </div>

        {/* Grid de 3 Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative"
            >
              {/* Card */}
              <div className="
                relative h-full bg-white rounded-xl p-8 
                border border-[#E2E8F0]
                shadow-sm hover:shadow-xl
                transition-all duration-300 ease-out
                hover:-translate-y-2
                group-hover:border-transparent
                overflow-hidden
              ">
                {/* Background Gradiente no Hover */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${feature.gradient}
                  opacity-0 group-hover:opacity-5
                  transition-opacity duration-300
                  -z-10
                `} />

                {/* Ícone */}
                <div className="
                  w-14 h-14 rounded-lg mb-6 flex items-center justify-center
                  bg-gradient-to-br from-[#F7FFF7] to-white
                  border border-[#E2E8F0]
                  group-hover:border-transparent
                  transition-all duration-300
                ">
                  <span className="text-2xl">
                    {feature.icon}
                  </span>
                </div>

                {/* Título */}
                <h3 className="
                  text-xl font-bold text-[#2C3E50] mb-4 
                  font-poppins
                  group-hover:text-transparent
                  group-hover:bg-gradient-to-r ${feature.gradient}
                  group-hover:bg-clip-text
                  transition-all duration-300
                ">
                  {feature.title}
                </h3>

                {/* Descrição */}
                <p className="
                  text-[#95A5A6] text-base leading-relaxed
                  group-hover:text-[#2C3E50]/80
                  transition-colors duration-300
                ">
                  {feature.description}
                </p>

                {/* Indicador de Borda no Hover */}
                <div className={`
                  absolute inset-0 rounded-xl border-2
                  border-transparent group-hover:border-gradient
                  -z-5
                  transition-all duration-300
                `} />
              </div>

              {/* Efeito de Sombra Externa */}
              <div className={`
                absolute inset-0 rounded-xl
                bg-gradient-to-br ${feature.gradient}
                opacity-0 group-hover:opacity-10
                blur-xl -z-20
                transition-opacity duration-300
              `} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="
            inline-flex items-center justify-center
            rounded-full px-8 py-4
            text-base font-medium
            bg-[#006EB8] text-white
            hover:bg-[#005A9C]
            transition-all duration-300
            shadow-md hover:shadow-lg
            hover:-translate-y-1
          ">
            <span>Explore All Features</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Estilos CSS para Gradiente de Borda */}
      <style jsx>{`
        .border-gradient {
          border-image: linear-gradient(135deg, #006EB8, #4ECDC4) 1;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .group:hover .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}