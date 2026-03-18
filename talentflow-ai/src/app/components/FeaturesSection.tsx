"use client";

import { useState } from "react";

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: "🤖",
    title: "AI-Powered Interviews",
    description: "Conduct consistent and unbiased technical interviews with our advanced AI interviewer"
  },
  {
    id: 2,
    icon: "📊",
    title: "Comprehensive Evaluation",
    description: "Get detailed reports on candidates' technical skills, problem-solving abilities, and communication"
  },
  {
    id: 3,
    icon: "⚡",
    title: "Time-Saving Efficiency",
    description: "Reduce screening time and schedule interviews 24/7, streamlining your hiring pipeline"
  },
  {
    id: 4,
    icon: "📈",
    title: "Data-Driven Insights",
    description: "Make informed decisions with comprehensive analytics and benchmarking tools"
  },
  {
    id: 5,
    icon: "🎯",
    title: "Customizable Assessments",
    description: "Tailor interview questions and coding challenges to your company's specific needs"
  },
  {
    id: 6,
    icon: "👥",
    title: "Collaborative Hiring",
    description: "Easily share candidate reports and collaborate with your hiring team"
  }
];

export default function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="features" className="mt-32 py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-[#45B7D110] text-[#45B7D1] mb-6">
            ✨ Why HR Teams Choose TalentsFlow.ai
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3E50] mb-6">
            Revolutionize Your Tech Hiring Process
          </h2>
          
          <p className="text-lg md:text-xl text-[#95A5A6] leading-relaxed">
            Our AI-powered platform combines cutting-edge technology with human expertise 
            to deliver the most efficient and effective hiring experience.
          </p>
        </div>

        {/* Features Grid - 3 Columns */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="relative group"
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`
                relative h-full bg-white rounded-xl p-8 border border-[#E2E8F0]
                transition-all duration-300 ease-out
                ${hoveredCard === feature.id 
                  ? 'shadow-xl transform -translate-y-2' 
                  : 'shadow-sm hover:shadow-md'
                }
              `}>
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#006EB8]/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-2xl">{feature.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[#95A5A6] leading-relaxed text-base">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-1 rounded-b-xl
                  bg-gradient-to-r from-[#006EB8] to-[#4ECDC4]
                  transition-opacity duration-300
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
