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
          <div className="flex h-16 items-center justify-between">
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
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors" style={{ color: '#2C3E50' }}>
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors" style={{ color: '#2C3E50' }}>
                How it Works
              </a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors" style={{ color: '#2C3E50' }}>
                Pricing
              </a>
              <a 
                href="https://www.linkedin.com/in/ruofei-du/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-primary transition-colors" 
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
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium" style={{ backgroundColor: '#45B7D110', color: '#45B7D1' }}>
                🚀 Revolutionizing Tech Hiring with AI
              </span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-8" style={{ color: '#2C3E50' }}>
              Streamline YourTech Hiring Process
            </h1>
            
            <p className="mx-auto mt-6 max-w-[700px] md:text-xl mb-10" style={{ color: '#95A5A6' }}>
              Empower your HR team with AI-driven interviews. Evaluate candidates efficiently, reduce bias, and make data-driven hiring decisions.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium transition-colors"
                style={{ backgroundColor: '#006EB8', color: '#F7FFF7' }}
              >
                Request Demo
              </button>
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium transition-colors border"
                style={{ borderColor: '#E2E8F0', color: '#2C3E50' }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6" style={{ color: '#2C3E50' }}>
            Why HR Teams Choose TalentsFlow.ai
          </h2>
          <p className="mt-4 md:text-xl" style={{ color: '#95A5A6' }}>
            Revolutionize your tech hiring process with our AI-powered platform
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-xl border p-8" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
            <div className="mb-6">
              <span className="text-4xl">🤖</span>
            </div>
            <h3 className="mt-4 text-xl font-bold" style={{ color: '#2C3E50' }}>AI-Powered Interviews</h3>
            <p className="mt-2" style={{ color: '#95A5A6' }}>
              Conduct consistent and unbiased technical interviews with our advanced AI interviewer
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-xl border p-8" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
            <div className="mb-6">
              <span className="text-4xl">📊</span>
            </div>
            <h3 className="mt-4 text-xl font-bold" style={{ color: '#2C3E50' }}>Comprehensive Evaluation</h3>
            <p className="mt-2" style={{ color: '#95A5A6' }}>
              Get detailed reports on candidates' technical skills, problem-solving abilities, and communication
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-xl border p-8" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
            <div className="mb-6">
              <span className="text-4xl">⚡</span>
            </div>
            <h3 className="mt-4 text-xl font-bold" style={{ color: '#2C3E50' }}>Time-Saving Efficiency</h3>
            <p className="mt-2" style={{ color: '#95A5A6' }}>
              Reduce screening time and schedule interviews 24/7, streamlining your hiring pipeline
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-xl border p-8" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
            <div className="mb-6">
              <span className="text-4xl">📈</span>
            </div>
            <h3 className="mt-4 text-xl font-bold" style={{ color: '#2C3E50' }}>Data-Driven Insights</h3>
            <p className="mt-2" style={{ color: '#95A5A6' }}>
              Make informed decisions with comprehensive analytics and benchmarking tools
            </p>
          </div>

          {/* Feature 5 */}
          <div className="rounded-xl border p-8" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
            <div className="mb-6">
              <span className="text-4xl">🎯</span>
            </div>
            <h3 className="mt-4 text-xl font-bold" style={{ color: '#2C3E50' }}>Customizable Assessments</h3>
            <p className="mt-2" style={{ color: '#95A5A6' }}>
              Tailor interview questions and coding challenges to your company's specific needs
            </p>
          </div>

          {/* Feature 6 */}
          <div className="rounded-xl border p-8" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
            <div className="mb-6">
              <span className="text-4xl">👥</span>
            </div>
            <h3 className="mt-4 text-xl font-bold" style={{ color: '#2C3E50' }}>Collaborative Hiring</h3>
            <p className="mt-2" style={{ color: '#95A5A6' }}>
              Easily share candidate reports and collaborate with your hiring team
            </p>
          </div>
        </div>
      </section>

      {/* Time & Cost Savings */}
      <section className="border-t">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-8">
                <span className="text-4xl">⏱️</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6" style={{ color: '#2C3E50' }}>
                Cut Your Hiring Cost and Timespan
              </h2>
              <p className="text-lg mb-8" style={{ color: '#95A5A6' }}>
                With Talentsflow, you can slash the time spent on scheduling, screening, and ranking candidates—saving weeks of effort and thousands of dollars in direct costs.
              </p>
              <ul className="space-y-4" style={{ color: '#95A5A6' }}>
                <li>Save scheduling overhead</li>
                <li>Eliminate 100% of manual screening/tech interviews</li>
                <li>Accelerate hiring from 4 weeks to just 2-4 days</li>
                <li>Achieve an dramatic reduction in direct costs</li>
              </ul>
            </div>
            <div>{/* Imagem placeholder */}</div>
           </div>
            

          </div>
        </div>
      </section>

      {/* AI Interview Experience */}
      <section className="border-t">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-8">
                <span className="text-4xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6" style={{ color: '#2C3E50' }}>
                Conduct Fair and Consistent Technical Interviews
              </h2>
              <p className="text-lg mb-8" style={{ color: '#95A5A6' }}>
                Our AI interviewer ensures a standardized evaluation process for all candidates, eliminating human bias and providing consistent results.
              </p>
              <ul className="space-y-4" style={{ color: '#95A5A6' }}>
                <li>Customizable interview scripts</li>
                <li>Real-time code evaluation</li>
                <li>Adaptive questioning based on candidate responses</li>
              </ul>
            </div>
            <div>{/* Imagem placeholder */}</div>
          </div>
        </div>
      </section>

      {/* Performance Analytics */}
      <section className="border-t">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-8">
                <span className="text-4xl">📊</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6" style={{ color: '#2C3E50' }}>
                Make Data-Driven Hiring Decisions
              </h2>
              <p className="text-lg mb-8" style={{ color: '#95A5A6' }}>
                Gain valuable insights into candidate performance with our comprehensive analytics dashboard. Compare candidates objectively and identify top talent efficiently.
              </p>
              <ul className="space-y-4" style={{ color: '#95A5A6' }}>
                <li>Detailed performance metrics</li>
                <li>Skill gap analysis</li>
                <li>Candidate comparison tools</li>
              </ul>
            </div>
            <div>{/* Imagem placeholder */}</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6" style={{ color: '#2C3E50' }}>
              See TalentsFlow.ai in Action
            </h2>
            <p className="text-lg mb-10" style={{ color: '#95A5A6' }}>
              Watch how our AI-powered platform helps HR teams conduct efficient technical interviews and make data-driven hiring decisions.
            </p>
            <p className="text-lg mb-8" style={{ color: '#95A5A6' }}>Video demonstration of our AI interview platform</p>
            <button 
              onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium transition-colors"
              style={{ backgroundColor: '#006EB8', color: '#F7FFF7' }}
            >
              Request a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24" style={{ backgroundColor: '#45B7D110' }}>
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6" style={{ color: '#2C3E50' }}>
              Pricing
            </h2>
            <p className="text-lg" style={{ color: '#95A5A6' }}>
              Start with our 2-week free trial to experience the power of AI-driven hiring
            </p>
          </div>

          <div className="mx-auto max-w-md">
            <div className="rounded-xl border p-8" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}>
              <div className="text-center mb-8">
                <div className="text-4xl font-bold mb-2" style={{ color: '#2C3E50' }}>CA$599 / month</div>
                <p style={{ color: '#95A5A6' }}>Perfect for growing tech teams</p>
              </div>

              <div className="mb-8">
                <div className="text-center mb-4">
                  <p className="text-sm" style={{ color: '#95A5A6' }}>2-week free trial for 1 account and 10 interviews</p>
                </div>
                <ul className="space-y-4" style={{ color: '#95A5A6' }}>
                  <li>• 100 Interviews Included</li>
                  <li>• Unlimited usage of the question bank</li>
                  <li>• On Demand Training Sessions</li>
                  <li>• Platform Tech support</li>
                </ul>
              </div>

              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="w-full inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium transition-colors"
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
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6" style={{ color: '#2C3E50' }}>
              Ready to Transform Your Tech Hiring?
            </h2>
            <p className="text-lg mb-10" style={{ color: '#95A5A6' }}>
              Join leading companies who have streamlined their hiring process and found top tech talent with TalentsFlow.ai
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium transition-colors"
                style={{ backgroundColor: '#006EB8', color: '#F7FFF7' }}
              >
                Schedule a Demo
              </button>
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium transition-colors border"
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
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006EB8' }}>
                  <span className="text-white font-bold">T</span>
                </div>
                <span className="text-xl font-bold" style={{ color: '#2C3E50' }}>
                  TalentsFlow.ai
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#2C3E50' }}>Product</h4>
              <ul className="space-y-2" style={{ color: '#95A5A6' }}>
                <li>Features</li>
                <li>Pricing</li>
                <li>FAQ</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#2C3E50' }}>Company</h4>
              <ul className="space-y-2" style={{ color: '#95A5A6' }}>
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#2C3E50' }}>Resources</h4>
              <ul className="space-y-2" style={{ color: '#95A5A6' }}>
                <li>Support</li>
                <li>Documentation</li>
                <li>Case Studies</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p style={{ color: '#95A5A6' }}>© 2025 TalentsFlow.ai. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0" style={{ color: '#95A5A6' }}>
                <span>Privacy</span>
                <span>Terms</span>
                <span>Cookie Policy</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}