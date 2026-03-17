"use client";

import { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function Home() {
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
    <div className="min-h-screen bg-[#F7FFF7] text-[#2C3E50] font-inter">
      <HeroSection />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-[#45B7D110] text-[#45B7D1]">
                🚀 Revolutionizing Tech Hiring with AI
              </span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-8 font-poppins">
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

      <FeaturesSection />

      {/* Time & Cost Savings */}
      <section className="py-24 border-t border-[#E2E8F0]">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-8">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-[#45B7D110] text-[#45B7D1]">
                  ⏱️ Time & Cost Savings
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 font-poppins">Cut Your Hiring Cost and Timespan</h2>
              <p className="text-lg text-[#95A5A6] mb-8">
                With Talentsflow, you can slash the time spent on scheduling, screening, and ranking candidates—saving weeks of effort and thousands of dollars in direct costs.
              </p>
              <ul className="space-y-4 text-[#95A5A6]">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  Save scheduling overhead
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  Eliminate 100% of manual screening/tech interviews
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  Accelerate hiring from 4 weeks to just 2-4 days
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  Achieve an dramatic reduction in direct costs
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl border-2 border-white/20 shadow-2xl bg-gradient-to-br from-[#006EB8]/10 to-[#4ECDC4]/10 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-[#95A5A6]">Time & Cost Savings Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Interview Experience */}
      <section className="py-24 border-t border-[#E2E8F0]">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-video rounded-xl border-2 border-white/20 shadow-2xl bg-gradient-to-br from-[#006EB8]/10 to-[#4ECDC4]/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <p className="text-[#95A5A6]">AI Interview Interface</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="mb-8">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-[#45B7D110] text-[#45B7D1]">
                  🎯 AI Interview Experience
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 font-poppins">Conduct Fair and Consistent Technical Interviews</h2>
              <p className="text-lg text-[#95A5A6] mb-8">
                Our AI interviewer ensures a standardized evaluation process for all candidates, eliminating human bias and providing consistent results.
              </p>
              <ul className="space-y-4 text-[#95A5A6]">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  Customizable interview scripts
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  Real-time code evaluation
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  Adaptive questioning based on candidate responses
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Analytics */}
      <section className="py-24 border-t border-[#E2E8F0]">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-8">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-[#45B7D110] text-[#45B7D1]">
                  📊 Performance Analytics
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 font-poppins">Make Data-Driven Hiring Decisions</h2>
              <p className="text-lg text-[#95A5A6] mb-8">
                Gain valuable insights into candidate performance with our comprehensive analytics dashboard. Compare candidates objectively and identify top talent efficiently.
              </p>
              <ul className="space-y-4 text-[#95A5A6]">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  Detailed performance metrics
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  Skill gap analysis
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  Candidate comparison tools
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl border-2 border-white/20 shadow-2xl bg-gradient-to-br from-[#006EB8]/10 to-[#4ECDC4]/10 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">📈</div>
                  <p className="text-[#95A5A6]">Performance Analytics Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 border-t border-[#E2E8F0]">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 font-poppins">See TalentsFlow.ai in Action</h2>
            <p className="text-lg text-[#95A5A6] mb-10">
              Watch how our AI-powered platform helps HR teams conduct efficient technical interviews and make data-driven hiring decisions.
            </p>
            <div className="aspect-video rounded-xl border-2 border-white/20 shadow-2xl bg-gradient-to-br from-[#006EB8]/10 to-[#4ECDC4]/10 backdrop-blur-sm flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="text-4xl mb-4">▶️</div>
                <p className="text-[#95A5A6]">Video demonstration of our AI interview platform</p>
              </div>
            </div>
            <button className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium bg-[#006EB8] text-white hover:bg-[#005A9C] transition-colors">
              Request a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-[#45B7D110]">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 font-poppins">Pricing</h2>
            <p className="text-lg text-[#95A5A6]">
              Start with our 2-week free trial to experience the power of AI-driven hiring
            </p>
          </div>

          <div className="mx-auto max-w-md">
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
              <div className="text-center mb-8">
                <div className="text-4xl font-bold mb-2 text-[#2C3E50] font-poppins">CA$599 / month</div>
                <p className="text-[#95A5A6]">Perfect for growing tech teams</p>
              </div>

              <div className="mb-8">
                <div className="text-center mb-4">
                  <p className="text-sm text-[#95A5A6]">2-week free trial for 1 account and 10 interviews</p>
                </div>
                <ul className="space-y-4 text-[#95A5A6]">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    100 Interviews Included
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    Unlimited usage of the question bank
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    On Demand Training Sessions
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    Platform Tech support
                  </li>
                </ul>
              </div>

              <button className="w-full inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium bg-[#006EB8] text-white hover:bg-[#005A9C] transition-colors">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#4ECDC410] border-t border-[#E2E8F0]">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 font-poppins">Ready to Transform Your Tech Hiring?</h2>
            <p className="text-lg text-[#95A5A6] mb-10">
              Join leading companies who have streamlined their hiring process and found top tech talent with TalentsFlow.ai
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium bg-[#006EB8] text-white hover:bg-[#005A9C] transition-colors">
                Schedule a Demo
              </button>
              <button className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium border border-[#E2E8F0] text-[#2C3E50] hover:border-[#006EB8] transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 border-t border-[#E2E8F0]">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 font-poppins">Get in Touch</h2>
            <p className="text-lg text-[#95A5A6]">
              Ready to transform your tech hiring process? Contact us to schedule a demo or learn more about our AI-powered platform.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}