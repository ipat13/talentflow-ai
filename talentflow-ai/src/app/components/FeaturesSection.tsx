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
    <section className="container max-w-screen-xl mx-auto py-24" id="features">
      <div className="grid gap-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={{ fontFamily: 'Inter, sans-serif' }}>
            Why HR Teams Choose TalentsFlow.ai
          </h2>
          <p className="mt-4 md:text-xl" style={{ color: '#95A5A6' }}>
            Our AI-powered platform combines cutting-edge technology with human expertise to deliver the most efficient and effective hiring experience.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="rounded-xl border bg-card text-card-foreground shadow"
              style={{ backgroundColor: '#F7FFF7', borderColor: '#006EB830' }}
            >
              <div className="p-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12" style={{ color: '#006EB8' }}>
                  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
                  <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
                  <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
                  <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                  <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                </svg>
                <h3 className="mt-4 text-xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {feature.title}
                </h3>
                <p className="mt-2" style={{ color: '#95A5A6' }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
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
    <section id="features" className="mt-24 md:mt-48 lg:mt-64 py-20 md:py-32">
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
            className="rounded-xl border bg-[#F7FFF7] shadow-sm"
            style={{ borderColor: '#006EB830' }}
          >
            <div className="p-6">
              {/* Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 mb-4" style={{ color: '#006EB8' }}>
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
                <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
              </svg>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[#95A5A6] leading-relaxed text-base">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
