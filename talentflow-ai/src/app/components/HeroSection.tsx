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
      {/* Header - Sticky */}
      <header className="sticky top-0 z-50 w-full border-b" style={{ backgroundColor: '#F7FFF795', backdropFilter: 'blur(10px)' }}>
        <div className="container max-w-screen-xl mx-auto flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2" aria-label="TalentsFlow.ai Home">
              <img 
                src="/logo.png" 
                alt="TalentsFlow.ai Logo" 
                width={40} 
                height={40}
                className="rounded-full"
                onError={(e) => {
                  // Fallback to text logo if image fails
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-10 h-10 rounded-full bg-[#006EB8] flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
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

      {/* Hero Section */}
      <section className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(45deg, #006EB820, #4ECDC420)' }} />
        
        <div className="container max-w-screen-xl mx-auto relative flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
            
            {/* Badge */}
            <div className="inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium bg-[#45B7D130] text-[#45B7D1]">
              🚀 Revolutionizing Tech Hiring with AI
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Streamline Your<span className="block" style={{ color: '#006EB8' }}>Tech Hiring Process</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-[700px] text-[#95A5A6] md:text-xl">
              Empower your HR team with AI-driven interviews. Evaluate candidates efficiently, reduce bias, and make data-driven hiring decisions.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors bg-[#006EB8] text-[#F7FFF7] shadow hover:bg-[#006EB8]/90 h-10 rounded-md px-8">
                <span>Request Demo</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </section>

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
