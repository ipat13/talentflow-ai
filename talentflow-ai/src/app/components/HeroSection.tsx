"use client";

import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Trigger animation after mount
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E8F0]" 
          : "bg-transparent"
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2" aria-label="TalentsFlow.ai Home">
              <div className="w-8 h-8 rounded-full bg-[#006EB8] flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-xl font-bold text-[#2C3E50]">
                TalentsFlow.ai
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              <a href="#features" className="text-sm font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors">
                How it Works
              </a>
              <a href="#pricing" className="text-sm font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors">
                Pricing
              </a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-sm font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors">
                Sign In
              </a>
              <button className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-[#006EB8] text-white hover:bg-[#005A9C] transition-all duration-300 shadow-sm hover:shadow-md">
                Request Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-[#2C3E50] hover:bg-[#E2E8F0] transition-colors"
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
        </div>

        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-4 py-4 space-y-4 bg-white border-t border-[#E2E8F0]">
            <a href="#features" onClick={closeMobileMenu} className="block text-base font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors">
              Features
            </a>
            <a href="#how-it-works" onClick={closeMobileMenu} className="block text-base font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors">
              How it Works
            </a>
            <a href="#pricing" onClick={closeMobileMenu} className="block text-base font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors">
              Pricing
            </a>
            <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
              <a href="#" className="block text-base font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors">
                Sign In
              </a>
              <button className="w-full inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-[#006EB8] text-white hover:bg-[#005A9C] transition-all duration-300">
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="relative min-h-screen pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7FFF7] via-white to-[#F7FFF7] opacity-90" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#006EB8]/5 to-[#4ECDC4]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#45B7D1]/5 to-[#4ECDC4]/5 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Text Content - Left Side */}
            <div className={`text-left transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              {/* Badge */}
              <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-[#45B7D110] text-[#45B7D1] mb-8">
                <span className="mr-2">🚀</span>
                Revolutionizing Tech Hiring with AI
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[#2C3E50]">
                Streamline Your{" "}
                <span className="text-[#006EB8]">Tech Hiring Process</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-[#95A5A6] mb-10 max-w-xl">
                Empower your HR team with AI-driven interviews. Evaluate candidates efficiently, 
                reduce bias, and make data-driven hiring decisions that transform your recruitment.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium bg-[#006EB8] text-white hover:bg-[#005A9C] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1">
                  <span>Request Demo</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                
                <button className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium border-2 border-[#E2E8F0] text-[#2C3E50] hover:border-[#006EB8] hover:text-[#006EB8] transition-all duration-300">
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8 border-t border-[#E2E8F0]">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#2C3E50]">95%</div>
                  <div className="text-sm text-[#95A5A6]">Time Saved</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#2C3E50]">4.8/5</div>
                  <div className="text-sm text-[#95A5A6]">User Rating</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#2C3E50]">500+</div>
                  <div className="text-sm text-[#95A5A6]">Companies</div>
                </div>
              </div>
            </div>

            {/* Image/Visual - Right Side */}
            <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
                  alt="AI Robot - TalentsFlow.ai"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#F7FFF7]/40 via-transparent to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#006EB8]/20 to-[#4ECDC4]/20 backdrop-blur-sm border border-white/30 shadow-lg flex items-center justify-center animate-bounce-subtle">
                <span className="text-3xl">🤖</span>
              </div>

              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#45B7D1]/20 to-[#4ECDC4]/20 backdrop-blur-sm border border-white/30 shadow-lg flex items-center justify-center animate-bounce-subtle" style={{ animationDelay: "1s" }}>
                <span className="text-2xl">📊</span>
              </div>

              {/* Glass Card */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#006EB8]/10 flex items-center justify-center">
                    <span className="text-xl">✨</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#95A5A6]">AI Powered</p>
                    <p className="text-sm font-semibold text-[#2C3E50]">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-[#95A5A6]/30 flex justify-center">
            <div className="w-1 h-3 rounded-full bg-[#95A5A6]/50 mt-2"></div>
          </div>
        </div>
      </section>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
