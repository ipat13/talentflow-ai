"use client";

import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header - Sticky Dark */}
      <header 
        className="sticky top-0 z-50 w-full border-b"
        style={{ 
          backgroundColor: 'rgba(2, 6, 23, 0.8)', 
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="container max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4">
          <a href="#" className="flex items-center space-x-2" aria-label="TalentsFlow.ai Home">
            <img 
              src="/logo.png" 
              alt="TalentsFlow.ai Logo" 
              width={40} 
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
              TalentsFlow.ai
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <a href="#features" className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors">
              Pricing
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors">
              Sign In
            </a>
            <button 
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300"
              style={{ 
                background: 'linear-gradient(135deg, #00D2FF, #7c3aed)',
                color: 'white'
              }}
            >
              Request Demo
            </button>
          </div>

          <button 
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 transition-colors"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <div 
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-4 space-y-4" style={{ backgroundColor: 'rgba(2, 6, 23, 0.95)', borderTopColor: 'rgba(255, 255, 255, 0.08)' }}>
            <a href="#features" onClick={closeMobileMenu} className="block text-base font-medium text-[#94a3b8] hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" onClick={closeMobileMenu} className="block text-base font-medium text-[#94a3b8] hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#pricing" onClick={closeMobileMenu} className="block text-base font-medium text-[#94a3b8] hover:text-white transition-colors">
              Pricing
            </a>
            <div className="pt-4 border-t space-y-3" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
              <a href="#" className="block text-base font-medium text-[#94a3b8] hover:text-white transition-colors">
                Sign In
              </a>
              <button 
                className="w-full inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, #00D2FF, #7c3aed)',
                  color: 'white'
                }}
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner - Dark Theme */}
      <section 
        className="relative overflow-hidden"
        style={{ backgroundColor: "#020617", minHeight: "calc(100vh - 64px)" }}
      >
        {/* Background gradient effects */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 20% 50%, rgba(0, 210, 255, 0.15) 0%, transparent 50%)"
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 80% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)"
          }}
        />

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }}
        />

        <div className="container max-w-screen-xl mx-auto relative flex flex-col items-center justify-center px-4 py-24 md:py-32 text-center min-h-[600px]">
          {/* Badge */}
          <div 
            className={`
              inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-8
              transition-all duration-700 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
            style={{ 
              backgroundColor: 'rgba(0, 210, 255, 0.1)', 
              color: '#00D2FF',
              border: '1px solid rgba(0, 210, 255, 0.3)'
            }}
          >
            <span className="mr-2">🚀</span>
            Revolutionizing Tech Hiring with AI
          </div>

          {/* Main Headline */}
          <h1 
            className={`
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl
              transition-all duration-700 ease-out delay-100
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="text-white">Streamline Your</span>
            <br />
            <span style={{ 
              background: "linear-gradient(135deg, #00D2FF, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Tech Hiring Process
            </span>
          </h1>

          {/* Description */}
          <p 
            className={`
              text-lg md:text-xl max-w-2xl mb-10
              transition-all duration-700 ease-out delay-200
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
            style={{ 
              color: '#94a3b8',
              lineHeight: '1.6'
            }}
          >
            Empower your HR team with AI-driven interviews. Evaluate candidates efficiently, 
            reduce bias, and make data-driven hiring decisions.
          </p>

          {/* CTA Buttons */}
          <div 
            className={`
              flex flex-col gap-4 sm:flex-row
              transition-all duration-700 ease-out delay-300
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            <a
              href="https://www.linkedin.com/in/ruofei-du-softwaredeveloper/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 rounded-lg px-8 py-3"
              style={{ 
                background: 'linear-gradient(135deg, #00D2FF, #7c3aed)',
                color: 'white'
              }}
            >
              <span>Request Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div 
            className={`
              grid grid-cols-3 gap-8 mt-16 pt-8 w-full max-w-2xl
              transition-all duration-700 ease-out delay-400
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                95%
              </div>
              <div className="text-sm text-[#94a3b8]">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                4.8/5
              </div>
              <div className="text-sm text-[#94a3b8]">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                500+
              </div>
              <div className="text-sm text-[#94a3b8]">Companies</div>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #00D2FF 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #020617, transparent)' }} />
      </section>
    </>
  );
}
