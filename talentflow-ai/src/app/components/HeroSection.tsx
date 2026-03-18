"use client";

import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#006EB8] flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-xl font-bold text-[#2C3E50]">
                TalentsFlow.ai
              </span>
            </div>

            {/* Nav */}
            <nav className="hidden md:flex items-center space-x-8">
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

            {/* CTA */}
            <div className="flex items-center space-x-4">
              <a href="#" className="hidden md:inline-block text-sm font-medium text-[#2C3E50] hover:text-[#006EB8] transition-colors">
                Sign In
              </a>
              <button className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-[#006EB8] text-white hover:bg-[#005A9C] transition-all duration-300 shadow-sm hover:shadow-md">
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 pt-32">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7FFF7] via-white to-[#F7FFF7] opacity-90" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#006EB8]/5 to-[#4ECDC4]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#45B7D1]/5 to-[#4ECDC4]/5 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-[#45B7D110] text-[#45B7D1]">
                🚀 Revolutionizing Tech Hiring with AI
              </span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-8">
              Streamline Your <span className="text-[#006EB8]">Tech Hiring Process</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-[700px] text-lg md:text-xl text-[#95A5A6] mb-10">
              Empower your HR team with AI-driven interviews. Evaluate candidates efficiently, reduce bias, and make data-driven hiring decisions.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium bg-[#006EB8] text-white hover:bg-[#005A9C] transition-colors">
                Request Demo
              </button>
              <button className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium border border-[#E2E8F0] text-[#2C3E50] hover:border-[#006EB8] transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
