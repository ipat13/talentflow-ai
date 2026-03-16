"use client";

import { useEffect } from "react";

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
      {/* SITE ATUALIZADO - VERSÃO EXTENSA COM MAIS ESPAÇAMENTO */}
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b" style={{ backgroundColor: '#F7FFF795', backdropFilter: 'blur(10px)' }}>
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006EB8' }}>
                  <span className="text-white font-bold">T</span>
                </div>
                <span className="text-xl font-bold" style={{ color: '#2C3E50' }}>
                  TalentsFlow.ai
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium hover:underline" style={{ color: '#2C3E50' }}>
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium hover:underline" style={{ color: '#2C3E50' }}>
                How it Works
              </a>
              <a href="#pricing" className="text-sm font-medium hover:underline" style={{ color: '#2C3E50' }}>
                Pricing
              </a>
              <a 
                href="https://www.linkedin.com/in/ruofei-du/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium hover:underline" 
                style={{ color: '#2C3E50' }}
              >
                Get Started
              </a>
            </nav>

            <div className="flex items-center">
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                style={{ backgroundColor: '#006EB8', color: '#F7FFF7' }}
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-40 sm:py-64">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-16">
              <span className="inline-flex items-center rounded-full px-6 py-3 text-lg font-medium" style={{ backgroundColor: '#45B7D110', color: '#45B7D1' }}>
                🚀 Revolutionizing Tech Hiring with AI
              </span>
            </div>
            
            <h1 className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl mb-12" style={{ color: '#2C3E50' }}>
              Streamline Your Tech Hiring Process
            </h1>
            
            <p className="mx-auto mt-12 max-w-4xl text-2xl leading-10 mb-16" style={{ color: '#95A5A6' }}>
              Empower your HR team with AI-driven interviews. Evaluate candidates efficiently, reduce bias, and make data-driven hiring decisions. Transform your recruitment workflow with cutting-edge artificial intelligence technology designed specifically for technical hiring.
            </p>
            
            <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center">
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="inline-flex items-center justify-center rounded-2xl px-14 py-5 text-xl font-medium transition-colors hover:scale-105 transform duration-200 shadow-lg"
                style={{ backgroundColor: '#006EB8', color: '#F7FFF7' }}
              >
                Request Demo
              </button>
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="inline-flex items-center justify-center rounded-2xl px-14 py-5 text-xl font-medium transition-colors border-2 hover:scale-105 transform duration-200"
                style={{ borderColor: '#E2E8F0', color: '#2C3E50' }}
              >
                Learn More
              </button>
            </div>
            
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-4" style={{ color: '#006EB8' }}>95%</div>
                <p className="text-lg" style={{ color: '#95A5A6' }}>Interview Consistency</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-4" style={{ color: '#45B7D1' }}>70%</div>
                <p className="text-lg" style={{ color: '#95A5A6' }}>Time Saved</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-4" style={{ color: '#4ECDC4' }}>$15k+</div>
                <p className="text-lg" style={{ color: '#95A5A6' }}>Cost Reduction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <div className="mx-auto max-w-5xl text-center mb-32">
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl mb-12" style={{ color: '#2C3E50' }}>
            Why HR Teams Choose TalentsFlow.ai
          </h2>
          <p className="mt-8 text-2xl" style={{ color: '#95A5A6' }}>
            Revolutionize your tech hiring process with our AI-powered platform designed specifically for technical recruitment
          </p>
        </div>

        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-3xl border p-12 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
            <div className="mb-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundColor: '#006EB820' }}>
                <span className="text-4xl">🤖</span>
              </div>
            </div>
            <h3 className="text-3xl font-semibold mb-6" style={{ color: '#2C3E50' }}>AI-Powered Interviews</h3>
            <p className="text-xl" style={{ color: '#95A5A6' }}>
              Conduct consistent and unbiased technical interviews with our advanced AI interviewer that adapts to each candidate's skill level.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-3xl border p-12 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
            <div className="mb-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundColor: '#45B7D120' }}>
                <span className="text-4xl">📊</span>
              </div>
            </div>
            <h3 className="text-3xl font-semibold mb-6" style={{ color: '#2C3E50' }}>Comprehensive Evaluation</h3>
            <p className="text-xl" style={{ color: '#95A5A6' }}>
              Get detailed reports on candidates' technical skills, problem-solving abilities, communication, and cultural fit.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-3xl border p-12 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
            <div className="mb-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundColor: '#4ECDC420' }}>
                <span className="text-4xl">⚡</span>
              </div>
            </div>
            <h3 className="text-3xl font-semibold mb-6" style={{ color: '#2C3E50' }}>Time-Saving Efficiency</h3>
            <p className="text-xl" style={{ color: '#95A5A6' }}>
              Reduce screening time by 95% and schedule interviews 24/7, streamlining your entire hiring pipeline from start to finish.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-3xl border p-12 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
            <div className="mb-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundColor: '#006EB820' }}>
                <span className="text-4xl">📈</span>
              </div>
            </div>
            <h3 className="text-3xl font-semibold mb-6" style={{ color: '#2C3E50' }}>Data-Driven Insights</h3>
            <p className="text-xl" style={{ color: '#95A5A6' }}>
              Make informed decisions with comprehensive analytics, benchmarking tools, and predictive hiring metrics.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="rounded-3xl border p-12 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
            <div className="mb-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundColor: '#45B7D120' }}>
                <span className="text-4xl">🎯</span>
              </div>
            </div>
            <h3 className="text-3xl font-semibold mb-6" style={{ color: '#2C3E50' }}>Customizable Assessments</h3>
            <p className="text-xl" style={{ color: '#95A5A6' }}>
              Tailor interview questions, coding challenges, and evaluation criteria to your company's specific tech stack and requirements.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="rounded-3xl border p-12 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
            <div className="mb-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundColor: '#4ECDC420' }}>
                <span className="text-4xl">👥</span>
              </div>
            </div>
            <h3 className="text-3xl font-semibold mb-6" style={{ color: '#2C3E50' }}>Collaborative Hiring</h3>
            <p className="text-xl" style={{ color: '#95A5A6' }}>
              Easily share candidate reports, provide feedback, and collaborate with your entire hiring team in real-time.
            </p>
          </div>
        </div>
        
        <div className="mt-32 text-center">
          <p className="text-2xl" style={{ color: '#95A5A6' }}>
            Join over 500+ companies that have transformed their tech hiring with TalentsFlow.ai
          </p>
        </div>
      </section>

      {/* New Extended Section - Benefits */}
      <section className="border-t" style={{ backgroundColor: '#F7FFF7' }}>
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
          <div className="mx-auto max-w-5xl text-center mb-32">
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl mb-12" style={{ color: '#2C3E50' }}>
              Transform Your Hiring Workflow
            </h2>
            <p className="mt-8 text-2xl" style={{ color: '#95A5A6' }}>
              From initial screening to final offer, our platform streamlines every step of the technical hiring process
            </p>
          </div>
          
          <div className="grid gap-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-10">
                  <span className="text-6xl">📋</span>
                </div>
                <h3 className="text-4xl font-bold mb-8" style={{ color: '#2C3E50' }}>Automated Candidate Screening</h3>
                <p className="text-xl mb-10" style={{ color: '#95A5A6' }}>
                  Our AI analyzes hundreds of resumes in minutes, identifying top candidates based on technical skills, experience, and cultural fit. No more manual resume screening.
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full mr-4 mt-1" style={{ backgroundColor: '#45B7D110' }}>
                      <span className="text-lg" style={{ color: '#45B7D1' }}>✓</span>
                    </div>
                    <span className="text-xl" style={{ color: '#95A5A6' }}>Automatic resume parsing and analysis</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full mr-4 mt-1" style={{ backgroundColor: '#45B7D110' }}>
                      <span className="text-lg" style={{ color: '#45B7D1' }}>✓</span>
                    </div>
                    <span className="text-xl" style={{ color: '#95A5A6' }}>Skill matching against job requirements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full mr-4 mt-1" style={{ backgroundColor: '#45B7D110' }}>
                      <span className="text-lg" style={{ color: '#45B7D1' }}>✓</span>
                    </div>
                    <span className="text-xl" style={{ color: '#95A5A6' }}>Experience level verification</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl border p-12" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
                <div className="text-center">
                  <div className="text-7xl font-bold mb-6" style={{ color: '#006EB8' }}>95%</div>
                  <p className="text-2xl mb-10" style={{ color: '#95A5A6' }}>Reduction in screening time</p>
                  <div className="text-7xl font-bold mb-6" style={{ color: '#45B7D1' }}>500+</div>
                  <p className="text-2xl" style={{ color: '#95A5A6' }}>Resumes analyzed per hour</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="rounded-3xl border p-12" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
                <div className="text-center">
                  <div className="text-7xl font-bold mb-6" style={{ color: '#4ECDC4' }}>24/7</div>
                  <p className="text-2xl mb-10" style={{ color: '#95A5A6' }}>Interview scheduling availability</p>
                  <div className="text-7xl font-bold mb-6" style={{ color: '#006EB8' }}>100%</div>
                  <p className="text-2xl" style={{ color: '#95A5A6' }}>Consistent evaluation standards</p>
                </div>
              </div>
              <div>
                <div className="mb-10">
                  <span className="text-6xl">🎯</span>
                </div>
                <h3 className="text-4xl font-bold mb-8" style={{ color: '#2C3E50' }}>Standardized Technical Interviews</h3>
                <p className="text-xl mb-10" style={{ color: '#95A5A6' }}>
                  Every candidate receives the same fair evaluation with our AI-powered interview platform, eliminating bias and ensuring consistent assessment.
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full mr-4 mt-1" style={{ backgroundColor: '#45B7D110' }}>
                      <span className="text-lg" style={{ color: '#45B7D1' }}>✓</span>
                    </div>
                    <span className="text-xl" style={{ color: '#95A5A6' }}>Customizable interview scripts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full mr-4 mt-1" style={{ backgroundColor: '#45B7D110' }}>
                      <span className="text-lg" style={{ color: '#45B7D1' }}>✓</span>
                    </div>
                    <span className="text-xl" style={{ color: '#95A5A6' }}>Real-time code evaluation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full mr-4 mt-1" style={{ backgroundColor: '#45B7D110' }}>
                      <span className="text-lg" style={{ color: '#45B7D1' }}>✓</span>
                    </div>
                    <span className="text-xl" style={{ color: '#95A5A6' }}>Adaptive questioning based on responses</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time & Cost Savings */}
      <section className="border-t">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
          <div className="grid gap-20 lg:grid-cols-2 lg:gap-32 items-center">
            <div>
              <div className="mb-16">
                <span className="text-6xl">⏱️</span>
              </div>
              <h2 className="text-5xl font-bold tracking-tight sm:text-6xl mb-12" style={{ color: '#2C3E50' }}>
                Cut Your Hiring Cost and Timespan
              </h2>
              <p className="text-2xl mb-12" style={{ color: '#95A5A6' }}>
                With Talentsflow, you can slash the time spent on scheduling, screening, and ranking candidates—saving weeks of effort and thousands of dollars in direct costs while improving hiring quality.
              </p>
              
              <ul className="space-y-8">
                <li className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full mr-5 mt-1" style={{ backgroundColor: '#45B7D110' }}>
                    <span className="text-xl" style={{ color: '#45B7D1' }}>✓</span>
                  </div>
                  <span className="text-2xl" style={{ color: '#95A5A6' }}>Save scheduling overhead and administrative time</span>
                </li>
                <li className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full mr-5 mt-1" style={{ backgroundColor: '#45B7D110' }}>
                    <span className="text-xl" style={{ color: '#45B7D1' }}>✓</span>
                  </div>
                  <span className="text-2xl" style={{ color: '#95A5A6' }}>Eliminate 100% of manual screening and technical interviews</span>
                </li>
                <li className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full mr-5 mt-1" style={{ backgroundColor: '#45B7D110' }}>
                    <span className="text-xl" style={{ color: '#45B7D1' }}>✓</span>
                  </div>
                  <span className="text-2xl" style={{ color: '#95A5A6' }}>Accelerate hiring from 4 weeks to just 2-4 days</span>
                </li>
                <li className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full mr-5 mt-1" style={{ backgroundColor: '#45B7D110' }}>
                    <span className="text-xl" style={{ color: '#45B7D1' }}>✓</span>
                  </div>
                  <span className="text-2xl" style={{ color: '#95A5A6' }}>Achieve dramatic reduction in direct hiring costs</span>
                </li>
                <li className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full mr-5 mt-1" style={{ backgroundColor: '#45B7D110' }}>
                    <span className="text-xl" style={{ color: '#45B7D1' }}>✓</span>
                  </div>
                  <span className="text-2xl" style={{ color: '#95A5A6' }}>Improve candidate experience and employer brand</span>
                </li>
              </ul>
            </div>
            
            <div className="rounded-3xl border p-16 hover:shadow-2xl transition-all duration-300" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
              <div className="text-center">
                <div className="text-8xl font-bold mb-8" style={{ color: '#006EB8' }}>70%</div>
                <p className="text-2xl mb-12" style={{ color: '#95A5A6' }}>Faster hiring process completion</p>
                
                <div className="text-8xl font-bold mb-8" style={{ color: '#45B7D1' }}>$15k+</div>
                <p className="text-2xl mb-12" style={{ color: '#95A5A6' }}>Average cost savings per technical hire</p>
                
                <div className="text-8xl font-bold mb-8" style={{ color: '#4ECDC4' }}>95%</div>
                <p className="text-2xl" style={{ color: '#95A5A6' }}>Reduction in manual screening time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Interview Experience */}
      <section className="border-t">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
          <div className="grid gap-20 lg:grid-cols-2 lg:gap-32 items-center">
            <div className="rounded-3xl border p-16 hover:shadow-2xl transition-all duration-300" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
              <div className="mb-16">
                <span className="text-6xl">🎯</span>
              </div>
              <h2 className="text-5xl font-bold tracking-tight sm:text-6xl mb-12" style={{ color: '#2C3E50' }}>
                Conduct Fair and Consistent Technical Interviews
              </h2>
              <p className="text-2xl mb-12" style={{ color: '#95A5A6' }}>
                Our AI interviewer ensures a standardized evaluation process for all candidates, eliminating human bias and providing consistent results across your entire hiring pipeline.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#2C3E50' }}>Customizable interview scripts</h3>
                  <p className="text-lg" style={{ color: '#95A5A6' }}>Tailor questions to your specific tech stack and requirements.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#2C3E50' }}>Real-time code evaluation</h3>
                  <p className="text-lg" style={{ color: '#95A5A6' }}>AI analyzes code quality and problem-solving approach as candidates code.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#2C3E50' }}>Adaptive questioning</h3>
                  <p className="text-lg" style={{ color: '#95A5A6' }}>Questions adapt based on candidate responses for optimal assessment.</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-lg" style={{ color: '#95A5A6' }}>Interview Consistency</span>
                    <span className="text-xl font-medium" style={{ color: '#2C3E50' }}>95%</span>
                  </div>
                  <div className="h-3 rounded-full" style={{ backgroundColor: '#E2E8F0' }}>
                    <div className="h-full rounded-full" style={{ backgroundColor: '#006EB8', width: '95%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-lg" style={{ color: '#95A5A6' }}>Bias Reduction</span>
                    <span className="text-xl font-medium" style={{ color: '#2C3E50' }}>90%</span>
                  </div>
                  <div className="h-3 rounded-full" style={{ backgroundColor: '#E2E8F0' }}>
                    <div className="h-full rounded-full" style={{ backgroundColor: '#45B7D1', width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-lg" style={{ color: '#95A5A6' }}>Candidate Satisfaction</span>
                    <span className="text-xl font-medium" style={{ color: '#2C3E50' }}>88%</span>
                  </div>
                  <div className="h-3 rounded-full" style={{ backgroundColor: '#E2E8F0' }}>
                    <div className="h-full rounded-full" style={{ backgroundColor: '#4ECDC4', width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Analytics */}
      <section className="border-t">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="mx-auto max-w-4xl text-center mb-24">
            <div className="mb-12">
              <span className="text-5xl">📊</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8" style={{ color: '#2C3E50' }}>
              Make Data-Driven Hiring Decisions
            </h2>
            <p className="text-xl" style={{ color: '#95A5A6' }}>
              Gain valuable insights into candidate performance with our comprehensive analytics dashboard. Compare candidates objectively and identify top talent efficiently.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="rounded-2xl border p-12 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
              <div className="text-5xl font-bold mb-6" style={{ color: '#006EB8' }}>Detailed Metrics</div>
              <p className="text-lg" style={{ color: '#95A5A6' }}>Track coding speed, problem-solving efficiency, and technical knowledge across all candidates.</p>
            </div>
            
            <div className="rounded-2xl border p-12 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
              <div className="text-5xl font-bold mb-6" style={{ color: '#45B7D1' }}>Skill Analysis</div>
              <p className="text-lg" style={{ color: '#95A5A6' }}>Identify areas where candidates need improvement or additional training.</p>
            </div>
            
            <div className="rounded-2xl border p-12 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
              <div className="text-5xl font-bold mb-6" style={{ color: '#4ECDC4' }}>Comparison Tools</div>
              <p className="text-lg" style={{ color: '#95A5A6' }}>Side-by-side comparison of multiple candidates across key metrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8" style={{ color: '#2C3E50' }}>
              See TalentsFlow.ai in Action
            </h2>
            <p className="text-xl mb-12" style={{ color: '#95A5A6' }}>
              Watch how our AI-powered platform helps HR teams conduct efficient technical interviews and make data-driven hiring decisions.
            </p>
            
            <div className="rounded-2xl border p-16 text-center hover:shadow-xl transition-all duration-300" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
              <div className="text-7xl mb-8">🎥</div>
              <p className="text-xl mb-10" style={{ color: '#95A5A6' }}>Video demonstration of our AI interview platform</p>
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="inline-flex items-center justify-center rounded-xl px-12 py-4 text-lg font-medium transition-colors hover:scale-105 transform duration-200"
                style={{ backgroundColor: '#006EB8', color: '#F7FFF7' }}
              >
                Request a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32" style={{ backgroundColor: '#45B7D110' }}>
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-24">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8" style={{ color: '#2C3E50' }}>
              Pricing
            </h2>
            <p className="text-xl" style={{ color: '#95A5A6' }}>
              Start with our 2-week free trial to experience the power of AI-driven hiring
            </p>
          </div>

          <div className="mx-auto max-w-lg">
            <div className="rounded-2xl border p-12 hover:shadow-xl transition-all duration-300" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
              <div className="text-center mb-12">
                <div className="text-5xl font-bold mb-4" style={{ color: '#2C3E50' }}>CA$599<span className="text-xl" style={{ color: '#95A5A6' }}>/month</span></div>
                <p className="text-lg" style={{ color: '#95A5A6' }}>Perfect for growing tech teams</p>
              </div>

              <div className="mb-12">
                <div className="text-center mb-6">
                  <p className="text-base" style={{ color: '#95A5A6' }}>2-week free trial for 1 account and 10 interviews</p>
                </div>
                <ul className="space-y-6">
                  <li className="flex items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full mr-4" style={{ backgroundColor: '#45B7D110' }}>
                      <span className="text-base" style={{ color: '#45B7D1' }}>✓</span>
                    </div>
                    <span className="text-lg" style={{ color: '#95A5A6' }}>100 Interviews Included</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full mr-4" style={{ backgroundColor: '#45B7D110' }}>
                      <span className="text-base" style={{ color: '#45B7D1' }}>✓</span>
                    </div>
                    <span className="text-lg" style={{ color: '#95A5A6' }}>Unlimited usage of the question bank</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full mr-4" style={{ backgroundColor: '#45B7D110' }}>
                      <span className="text-base" style={{ color: '#45B7D1' }}>✓</span>
                    </div>
                    <span className="text-lg" style={{ color: '#95A5A6' }}>On Demand Training Sessions</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full mr-4" style={{ backgroundColor: '#45B7D110' }}>
                      <span className="text-base" style={{ color: '#45B7D1' }}>✓</span>
                    </div>
                    <span className="text-lg" style={{ color: '#95A5A6' }}>Platform Tech support</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="w-full inline-flex items-center justify-center rounded-xl px-12 py-4 text-lg font-medium transition-colors hover:scale-105 transform duration-200"
                style={{ backgroundColor: '#006EB8', color: '#F7FFF7' }}
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t" style={{ backgroundColor: '#4ECDC410' }}>
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8" style={{ color: '#2C3E50' }}>
              Ready to Transform Your Tech Hiring?
            </h2>
            <p className="text-xl mb-12" style={{ color: '#95A5A6' }}>
              Join leading companies who have streamlined their hiring process and found top tech talent with TalentsFlow.ai
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="inline-flex items-center justify-center rounded-xl px-12 py-4 text-lg font-medium transition-colors hover:scale-105 transform duration-200"
                style={{ backgroundColor: '#006EB8', color: '#F7FFF7' }}
              >
                Schedule a Demo
              </button>
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="inline-flex items-center justify-center rounded-xl px-12 py-4 text-lg font-medium transition-colors border hover:scale-105 transform duration-200"
                style={{ borderColor: '#E2E8F0', color: '#2C3E50' }}
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" style={{ backgroundColor: '#F7FFF7' }}>
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006EB8' }}>
                  <span className="text-white font-bold">T</span>
                </div>
                <span className="text-lg font-bold" style={{ color: '#2C3E50' }}>TalentsFlow.ai</span>
              </div>
              <p className="text-sm" style={{ color: '#95A5A6' }}>
                Streamlining tech hiring with AI-powered interviews.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#2C3E50' }}>Product</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#95A5A6' }}>
                <li><a href="#features" className="hover:underline">Features</a></li>
                <li><a href="#pricing" className="hover:underline">Pricing</a></li>
                <li><a href="#" className="hover:underline">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#2C3E50' }}>Company</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#95A5A6' }}>
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#2C3E50' }}>Resources</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#95A5A6' }}>
                <li><a href="#" className="hover:underline">Support</a></li>
                <li><a href="#" className="hover:underline">Documentation</a></li>
                <li><a href="#" className="hover:underline">Case Studies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t text-center text-sm" style={{ borderColor: '#E2E8F0', color: '#95A5A6' }}>
            <p>© 2025 TalentsFlow.ai. All rights reserved.</p>
            <div className="mt-2">
              <a href="#" className="hover:underline mx-2">Privacy Policy</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:underline mx-2">Terms of Service</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:underline mx-2">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}