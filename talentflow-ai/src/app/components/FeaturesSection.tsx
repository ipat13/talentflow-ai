"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  size?: "large" | "medium" | "small";
}

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
    <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
    <path d="M6 18a4 4 0 0 1-1.967-.516"/>
    <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    <path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/>
    <line x1="6" x2="6" y1="20" y2="16"/>
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
    <path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const features: Feature[] = [
  {
    id: 1,
    title: "AI-Powered Interviews",
    description: "Conduct consistent and unbiased technical interviews with our advanced AI interviewer that adapts to each candidate's responses in real-time.",
    icon: <BrainIcon />,
    size: "large"
  },
  {
    id: 2,
    title: "Comprehensive Evaluation",
    description: "Get detailed reports on candidates' technical skills, problem-solving abilities, and communication.",
    icon: <SparklesIcon />,
    size: "medium"
  },
  {
    id: 3,
    title: "Time-Saving Efficiency",
    description: "Reduce screening time and schedule interviews 24/7.",
    icon: <ClockIcon />,
    size: "small"
  },
  {
    id: 4,
    title: "Data-Driven Insights",
    description: "Make informed decisions with comprehensive analytics.",
    icon: <ChartIcon />,
    size: "small"
  },
  {
    id: 5,
    title: "Customizable Assessments",
    description: "Tailor interview questions to your company's specific needs.",
    icon: <BuildingIcon />,
    size: "medium"
  },
  {
    id: 6,
    title: "Collaborative Hiring",
    description: "Easily share candidate reports and collaborate with your hiring team.",
    icon: <UsersIcon />,
    size: "small"
  }
];

function BentoCard({ feature, isVisible, index }: { feature: Feature; isVisible: boolean; index: number }) {
  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-1",
    small: "md:col-span-1 md:row-span-1"
  };

  const cardSize = feature.size || "medium";

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-[rgba(10,10,10,0.5)] backdrop-blur-[12px]
        border border-[rgba(255,255,255,0.08)]
        p-6 md:p-8
        transition-all duration-500 ease-out
        hover:border-transparent
        group
        ${sizeClasses[cardSize]}
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
           style={{ 
             background: "linear-gradient(135deg, #00D2FF, #7c3aed)",
             padding: "1px",
             mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
             maskComposite: "exclude"
           }}>
        <div className="absolute inset-0 rounded-2xl bg-[rgba(10,10,10,0.5)]" />
      </div>

      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700"
           style={{ 
             background: "radial-gradient(circle, #00D2FF 0%, transparent 70%)",
             filter: "blur(40px)"
           }}
      />

      {/* Icon with glow */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-xl opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-100"
             style={{ backgroundColor: "#00D2FF", filter: "blur(20px)" }}
        />
        <div className="relative w-14 h-14 rounded-xl bg-[rgba(0,210,255,0.1)] border border-[rgba(0,210,255,0.2)] flex items-center justify-center text-[#00D2FF]">
          {feature.icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {feature.title}
        </h3>
        <p className="text-[#94a3b8] leading-relaxed" style={{ lineHeight: "1.6" }}>
          {feature.description}
        </p>
      </div>

      {/* Decorative floating elements for large cards */}
      {cardSize === "large" && (
        <div className="absolute bottom-4 right-4 w-32 h-32 opacity-20">
          <div className="absolute bottom-0 right-0 w-20 h-20 rounded-lg bg-gradient-to-br from-[#00D2FF]/30 to-[#7c3aed]/30 blur-sm animate-pulse" />
          <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#7c3aed]/30 to-transparent blur-sm animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
      )}
    </div>
  );
}

function FloatingInterface() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[rgba(0,0,0,0.3)] p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      
      {/* Interface elements */}
      <div className="space-y-3">
        <div className="h-2 w-full rounded bg-gradient-to-r from-[#00D2FF]/50 to-transparent" />
        <div className="h-2 w-3/4 rounded bg-gradient-to-r from-[#7c3aed]/50 to-transparent" />
        <div className="h-2 w-1/2 rounded bg-gradient-to-r from-[#00D2FF]/30 to-transparent" />
      </div>

      {/* Floating dots */}
      <div className="absolute top-8 right-4 w-2 h-2 rounded-full bg-[#00D2FF] animate-ping" />
      <div className="absolute bottom-12 right-8 w-2 h-2 rounded-full bg-[#7c3aed] animate-ping" style={{ animationDelay: "0.3s" }} />
    </div>
  );
}

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "#020617" }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a192f]/50 to-transparent" />
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" 
           style={{ background: "radial-gradient(circle, #00D2FF 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
           style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />

      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Why HR Teams Choose <span style={{ color: "#00D2FF" }}>TalentsFlow.ai</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto" style={{ lineHeight: "1.6" }}>
            Revolutionize your tech hiring process with our AI-powered platform that combines cutting-edge technology with human expertise.
          </p>
        </div>

        {/* Bento Grid */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ gap: "1.5rem" }}
        >
          {features.map((feature, index) => (
            <BentoCard 
              key={feature.id} 
              feature={feature} 
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent" />
    </section>
  );
}
