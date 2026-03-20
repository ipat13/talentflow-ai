"use client";

import { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import { useLocalStorage } from "./components/LocalStorage";

export default function Home() {
  useLocalStorage();
  
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#00D2FF] focus:text-[#020617] focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>
      
      <div id="main-content" className="min-h-screen" style={{ backgroundColor: '#020617' }}>
        <HeroSection />
        <FeaturesSection />

        {/* Time & Cost Savings */}
        <section id="time-savings" className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#020617' }}>
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <div className="mb-6 md:mb-8">
                  <span 
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium"
                    style={{ 
                      background: "linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(124, 58, 237, 0.1))",
                      color: "#00D2FF"
                    }}
                  >
                    ⏱️ Time & Cost Savings
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Cut Your Hiring Cost and Timespan
                </h2>
                <p className="text-base md:text-lg mb-6 md:mb-8" style={{ color: '#94a3b8' }}>
                  With Talentsflow, you can slash the time spent on scheduling, screening, and ranking candidates—saving weeks of effort and thousands of dollars in direct costs.
                </p>
                <ul className="space-y-3 md:space-y-4" style={{ color: '#94a3b8' }}>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                    Save scheduling overhead
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                    Eliminate 100% of manual screening/tech interviews
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                    Accelerate hiring from 4 weeks to just 2-4 days
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                    Achieve a dramatic reduction in direct costs
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div 
                  className="aspect-video rounded-2xl overflow-hidden border"
                  style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                    alt="Time & Cost Savings Dashboard"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Interview Experience */}
        <section id="ai-experience" className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#020617' }}>
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div 
                  className="aspect-video rounded-2xl overflow-hidden border"
                  style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80"
                    alt="AI Interview Interface"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="mb-6 md:mb-8">
                  <span 
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium"
                    style={{ 
                      background: "linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(124, 58, 237, 0.1))",
                      color: "#00D2FF"
                    }}
                  >
                    🎯 AI Interview Experience
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Conduct Fair and Consistent Technical Interviews
                </h2>
                <p className="text-base md:text-lg mb-6 md:mb-8" style={{ color: '#94a3b8' }}>
                  Our AI interviewer ensures a standardized evaluation process for all candidates, eliminating human bias and providing consistent results.
                </p>
                <ul className="space-y-3 md:space-y-4" style={{ color: '#94a3b8' }}>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                    Customizable interview scripts
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                    Real-time code evaluation
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                    Adaptive questioning based on candidate responses
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Analytics */}
        <section id="analytics" className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#020617' }}>
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <div className="mb-6 md:mb-8">
                  <span 
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium"
                    style={{ 
                      background: "linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(124, 58, 237, 0.1))",
                      color: "#00D2FF"
                    }}
                  >
                    📊 Performance Analytics
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Make Data-Driven Hiring Decisions
                </h2>
                <p className="text-base md:text-lg mb-6 md:mb-8" style={{ color: '#94a3b8' }}>
                  Gain valuable insights into candidate performance with our comprehensive analytics dashboard. Compare candidates objectively and identify top talent efficiently.
                </p>
                <ul className="space-y-3 md:space-y-4" style={{ color: '#94a3b8' }}>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                    Detailed performance metrics
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                    Skill gap analysis
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                    Candidate comparison tools
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div 
                  className="aspect-video rounded-2xl overflow-hidden border"
                  style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
                    alt="Performance Analytics Dashboard"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#020617' }}>
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                See TalentsFlow.ai in Action
              </h2>
              <p className="text-base md:text-lg mb-8 md:mb-10" style={{ color: '#94a3b8' }}>
                Watch how our AI-powered platform helps HR teams conduct efficient technical interviews and make data-driven hiring decisions.
              </p>
              <div 
                className="aspect-video rounded-2xl mb-6 md:mb-8 overflow-hidden border relative"
                style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
              >
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80"
                >
                  <source src="https://assets.mixkit.co/videos/45220/45220-720.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                  <div className="text-center text-white">
                    <div className="text-5xl md:text-6xl mb-2 md:mb-4">▶️</div>
                    <p className="text-base md:text-lg font-medium">Watch Demo</p>
                  </div>
                </div>
              </div>
              <a
                href="https://www.linkedin.com/in/ruofei-du-softwaredeveloper/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg px-8 py-3 md:py-4 text-sm md:text-base font-medium text-white transition-all duration-300 hover:-translate-y-1"
                style={{ background: "linear-gradient(135deg, #00D2FF, #7c3aed)" }}
              >
                Request a Demo
              </a>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#020617' }}>
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Pricing
              </h2>
              <p className="text-base md:text-lg" style={{ color: '#94a3b8' }}>
                Start with our 2-week free trial to experience the power of AI-driven hiring
              </p>
            </div>

            <div className="mx-auto max-w-md">
              <div 
                className="rounded-2xl p-6 md:p-8 border"
                style={{ 
                  backgroundColor: "rgba(10, 10, 10, 0.5)",
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(255, 255, 255, 0.08)"
                }}
              >
                <div className="text-center mb-6 md:mb-8">
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>CA$599 / month</div>
                  <p className="text-sm md:text-base" style={{ color: '#94a3b8' }}>Perfect for growing tech teams</p>
                </div>

                <div className="mb-6 md:mb-8">
                  <div className="text-center mb-4">
                    <p className="text-sm" style={{ color: '#94a3b8' }}>2-week free trial for 1 account and 10 interviews</p>
                  </div>
                  <ul className="space-y-3 md:space-y-4" style={{ color: '#94a3b8' }}>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                      100 Interviews Included
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                      Unlimited usage of the question bank
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                      On Demand Training Sessions
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1" style={{ color: "#00D2FF" }}>•</span>
                      Platform Tech support
                    </li>
                  </ul>
                </div>

                <a
                  href="https://www.linkedin.com/in/ruofei-du-softwaredeveloper/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center rounded-lg px-8 py-3 md:py-4 text-sm md:text-base font-medium text-white transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "linear-gradient(135deg, #00D2FF, #7c3aed)" }}
                >
                  Start Free Trial
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#020617' }}>
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Ready to Transform Your Tech Hiring?
              </h2>
              <p className="text-base md:text-lg mb-8 md:mb-10" style={{ color: '#94a3b8' }}>
                Join leading companies who have streamlined their hiring process and found top tech talent with TalentsFlow.ai
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <a
                  href="https://www.linkedin.com/in/ruofei-du-softwaredeveloper/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg px-8 py-3 md:py-4 text-sm md:text-base font-medium text-white transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "linear-gradient(135deg, #00D2FF, #7c3aed)" }}
                >
                  Schedule a Demo
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg px-8 py-3 md:py-4 text-sm md:text-base font-medium border-2 transition-all duration-300 hover:-translate-y-1"
                  style={{ 
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: "white"
                  }}
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#020617' }}>
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <ContactForm />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
