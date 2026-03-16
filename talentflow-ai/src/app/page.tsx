"use client";

import { useEffect } from "react";
import { Sparkles, Target, Check, Clock, TrendingUp, FileText, Users, ChevronRight, Zap, Shield, BarChart, MessageSquare, Code, Users as UsersIcon, Award, Globe, Calendar, DollarSign, Video, Headphones, Settings } from "lucide-react";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for anchor links
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
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: '#F7FFF7', color: '#2C3E50', fontFamily: 'Inter, sans-serif' }}>
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 w-full border-b" style={{ backgroundColor: '#F7FFF795', backdropFilter: 'blur(10px)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#09090b] rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-[#09090b]">
                  TalentsFlow.ai
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-[#52525b] hover:text-[#09090b] transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-[#52525b] hover:text-[#09090b] transition-colors">
                How it Works
              </a>
              <a href="#pricing" className="text-sm font-medium text-[#52525b] hover:text-[#09090b] transition-colors">
                Pricing
              </a>
              <a 
                href="https://www.linkedin.com/in/ruofei-du/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#52525b] hover:text-[#09090b] transition-colors"
              >
                Get Started
              </a>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center">
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
                style={{ backgroundColor: '#09090b' }}
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1">
        {/* ===== HERO SECTION ===== */}
        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8">
                <span className="text-4xl">🚀</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">Revolutionizing Tech Hiring</span>
                <span className="block mt-2" style={{ color: '#09090b' }}>with AI</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#52525b]">
                Streamline Your Tech Hiring Process. Empower your HR team with AI-driven interviews. 
                Evaluate candidates efficiently, reduce bias, and make data-driven hiring decisions.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                  className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium text-white transition-colors"
                  style={{ backgroundColor: '#09090b' }}
                >
                  Request Demo
                </button>
                <button 
                  onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                  className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium transition-colors border border-gray-300 bg-white text-[#09090b] hover:bg-gray-50"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section id="features" className="py-24 sm:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why HR Teams Choose TalentsFlow.ai
              </h2>
              <p className="mt-4 text-lg text-[#52525b]">
                Revolutionize your tech hiring process with our AI-powered platform
              </p>
            </div>

            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                  <div className="mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: '#3b82f6' }}>
                      <Target className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#09090b] mb-3">AI-Powered Interviews</h3>
                  <p className="text-[#52525b]">
                    Conduct consistent and unbiased technical interviews with our advanced AI interviewer.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                  <div className="mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: '#10b981' }}>
                      <Check className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#09090b] mb-3">Comprehensive Evaluation</h3>
                  <p className="text-[#52525b]">
                    Get detailed reports on candidates' technical skills, problem-solving abilities, and communication.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                  <div className="mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: '#f59e0b' }}>
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#09090b] mb-3">Time-Saving Efficiency</h3>
                  <p className="text-[#52525b]">
                    Reduce screening time and schedule interviews 24/7, streamlining your hiring pipeline.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                  <div className="mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: '#8b5cf6' }}>
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#09090b] mb-3">Data-Driven Insights</h3>
                  <p className="text-[#52525b]">
                    Make informed decisions with comprehensive analytics and benchmarking tools.
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                  <div className="mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: '#ec4899' }}>
                      <Settings className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#09090b] mb-3">Customizable Assessments</h3>
                  <p className="text-[#52525b]">
                    Tailor interview questions and coding challenges to your company's specific needs.
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                  <div className="mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: '#06b6d4' }}>
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#09090b] mb-3">Collaborative Hiring</h3>
                  <p className="text-[#52525b]">
                    Easily share candidate reports and collaborate with your hiring team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TIME & COST SAVINGS ===== */}
        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-16">
                <div className="mb-6">
                  <span className="text-4xl">⏱️</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Time & Cost Savings
                </h2>
                <p className="mt-4 text-lg text-[#52525b]">
                  Cut Your Hiring Cost and Timespan
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg text-[#52525b] mb-8">
                    With Talentsflow, you can slash the time spent on scheduling, screening, and ranking candidates—saving weeks of effort and thousands of dollars in direct costs.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                      <span className="text-[#52525b]">Save scheduling overhead</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                      <span className="text-[#52525b]">Eliminate 100% of manual screening/tech interviews</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                      <span className="text-[#52525b]">Accelerate hiring from 4 weeks to just 2-4 days</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                      <span className="text-[#52525b]">Achieve a dramatic reduction in direct costs</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#09090b] mb-2">70%</div>
                    <p className="text-lg text-[#52525b] mb-6">Faster hiring process</p>
                    
                    <div className="text-5xl font-bold text-[#09090b] mb-2">$15k+</div>
                    <p className="text-lg text-[#52525b] mb-6">Average cost savings per hire</p>
                    
                    <div className="text-5xl font-bold text-[#09090b] mb-2">95%</div>
                    <p className="text-lg text-[#52525b]">Reduction in screening time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== AI INTERVIEW EXPERIENCE ===== */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-16">
                <div className="mb-6">
                  <span className="text-4xl">🎯</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  AI Interview Experience
                </h2>
                <p className="mt-4 text-lg text-[#52525b]">
                  Conduct Fair and Consistent Technical Interviews
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-[#09090b] mb-6">How It Works</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-[#09090b] mb-2">Customizable Interview Scripts</h4>
                      <p className="text-[#52525b]">Tailor questions to your specific tech stack and requirements.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#09090b] mb-2">Real-time Code Evaluation</h4>
                      <p className="text-[#52525b]">AI analyzes code quality and problem-solving approach as candidates code.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#09090b] mb-2">Adaptive Questioning</h4>
                      <p className="text-[#52525b]">Questions adapt based on candidate responses for optimal assessment.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-lg text-[#52525b] mb-6">
                    Our AI interviewer ensures a standardized evaluation process for all candidates, eliminating human bias and providing consistent results.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#6366f1]" style={{ width: '85%' }}></div>
                      </div>
                      <span className="ml-4 text-sm font-medium text-[#09090b]">85% Consistency</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#d946ef]" style={{ width: '92%' }}></div>
                      </div>
                      <span className="ml-4 text-sm font-medium text-[#09090b]">92% Accuracy</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#d946ef] to-[#f472b6]" style={{ width: '78%' }}></div>
                      </div>
                      <span className="ml-4 text-sm font-medium text-[#09090b]">78% Time Saved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PERFORMANCE ANALYTICS ===== */}
        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-16">
                <div className="mb-6">
                  <span className="text-4xl">📊</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Performance Analytics
                </h2>
                <p className="mt-4 text-lg text-[#52525b]">
                  Make Data-Driven Hiring Decisions
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg text-[#52525b] mb-6">
                    Gain valuable insights into candidate performance with our comprehensive analytics dashboard. Compare candidates objectively and identify top talent efficiently.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <BarChart className="h-6 w-6 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-[#09090b]">Detailed Performance Metrics</h4>
                        <p className="text-[#52525b] text-sm">Track coding speed, problem-solving efficiency, and technical knowledge.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Target className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-[#09090b]">Skill Gap Analysis</h4>
                        <p className="text-[#52525b] text-sm">Identify areas where candidates need improvement or additional training.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-6 w-6 text-purple-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-[#09090b]">Candidate Comparison Tools</h4>
                        <p className="text-[#52525b] text-sm">Side-by-side comparison of multiple candidates across key metrics.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-[#09090b] mb-6">Analytics Dashboard Preview</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-[#52525b]">Technical Skills</span>
                        <span className="text-sm font-medium text-[#09090b]">88%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#6366f1]" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-[#52525b]">Problem Solving</span>
                        <span className="text-sm font-medium text-[#09090b]">92%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#d946ef]" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-[#52525b]">Communication</span>
                        <span className="text-sm font-medium text-[#09090b]">76%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#d946ef] to-[#f472b6]" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== DEMO SECTION ===== */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                See TalentsFlow.ai in Action
              </h2>
              <p className="mt-4 text-lg text-[#52525b]">
                Watch how our AI-powered platform helps HR teams conduct efficient technical interviews and make data-driven hiring decisions.
              </p>
              <div className="mt-10">
                <button 
                  onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                  className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium text-white transition-colors"
                  style={{ backgroundColor: '#09090b' }}
                >
                  <Video className="h-5 w-5 mr-2" />
                  Request a Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PRICING SECTION ===== */}
        <section id="pricing" className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-[#52525b]">
                Start with our 2-week free trial to experience the power of AI-driven hiring
              </p>
            </div>

            <div className="mx-auto max-w-md">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-[#09090b] mb-2">CA$599<span className="text-lg text-[#52525b]">/month</span></div>
                  <p className="text-[#52525b]">Perfect for growing tech teams</p>
                </div>

                <div className="mb-8">
                  <div className="text-center mb-4">
                    <p className="text-sm text-[#52525b]">2-week free trial for 1 account and 10 interviews</p>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-[#52525b]">100 Interviews Included</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-[#52525b]">Unlimited usage of the question bank</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-[#52525b]">On Demand Training Sessions</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-[#52525b]">Platform Tech support</span>
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                  className="w-full inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium text-white transition-colors"
                  style={{ backgroundColor: '#09090b' }}
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Transform Your Tech Hiring?
              </h2>
              <p className="mt-4 text-lg text-[#52525b]">
                Join leading companies who have streamlined their hiring process and found top tech talent with TalentsFlow.ai
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                  className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium text-white transition-colors"
                  style={{ backgroundColor: '#09090b' }}
                >
                  Schedule a Demo
                </button>
                <button 
                  onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                  className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium transition-colors border border-gray-300 bg-white text-[#09090b] hover:bg-gray-50"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#09090b] rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-[#09090b]">TalentsFlow.ai</span>
              </div>
              <p className="text-sm text-[#52525b]">
                Streamlining tech hiring with AI-powered interviews.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#09090b] mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#52525b]">
                <li><a href="#features" className="hover:text-[#09090b] transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-[#09090b] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#09090b] transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#09090b] mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[#52525b]">
                <li><a href="#" className="hover:text-[#09090b] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#09090b] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#09090b] transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#09090b] mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-[#52525b]">
                <li><a href="#" className="hover:text-[#09090b] transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-[#09090b] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[#09090b] transition-colors">Case Studies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 text-center text-sm text-[#52525b]">
            <p>© 2025 TalentsFlow.ai. All rights reserved.</p>
            <div className="mt-2">
              <a href="#" className="hover:text-[#09090b] transition-colors mx-2">Privacy Policy</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-[#09090b] transition-colors mx-2">Terms of Service</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-[#09090b] transition-colors mx-2">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}