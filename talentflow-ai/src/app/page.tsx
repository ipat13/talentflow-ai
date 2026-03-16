"use client";

import { useEffect } from "react";
import { Sparkles, Target, Check, Clock, TrendingUp, FileText, Users, ChevronRight } from "lucide-react";

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
    <div className="min-h-screen bg-talents-bg text-talents-text">
      {/* Header - EXATAMENTE igual ao exemplo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-talents-bg/95 backdrop-blur-md border-b border-talents-border-dark/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-talents-black rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-talents-black font-plus-jakarta">
                TalentsFlow
              </span>
            </div>

            {/* Navigation - EXATAMENTE igual ao exemplo */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-talents-text-secondary hover:text-talents-black font-medium text-sm font-satoshi transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-talents-text-secondary hover:text-talents-black font-medium text-sm font-satoshi transition-colors">
                How it Works
              </a>
              <a href="#pricing" className="text-talents-text-secondary hover:text-talents-black font-medium text-sm font-satoshi transition-colors">
                Pricing
              </a>
              <a 
                href="https://www.linkedin.com/in/ruofei-du/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-talents-text-secondary hover:text-talents-black font-medium text-sm font-satoshi transition-colors"
              >
                Get Started
              </a>
            </nav>

            {/* CTA Button - EXATAMENTE igual ao exemplo */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="px-4 py-2 h-9 bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#8b5cf6] text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-sm font-plus-jakarta shadow-thin-dark"
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - EXATAMENTE igual ao exemplo */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Hero Content - EXATAMENTE igual ao exemplo */}
            <div className="mb-16">
              <div className="inline-flex items-center px-3 py-1.5 bg-talents-dark-gray border border-talents-border-dark rounded-full mb-6">
                <span className="text-xs font-medium text-white font-satoshi">Currently in Beta</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-talents-black font-plus-jakarta">
                Streamline Your Tech Hiring Process
              </h1>
              
              <p className="text-lg md:text-xl text-talents-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-satoshi">
                Empower your HR team with AI-driven interviews
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                  className="px-6 py-3 h-12 bg-gradient-to-r from-talents-blue via-talents-indigo to-talents-purple text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-base font-plus-jakarta shadow-thin-dark"
                >
                  Request Demo
                </button>
                <button 
                  onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                  className="px-6 py-3 h-12 bg-white border border-gray-200 text-talents-black font-medium rounded-lg hover:bg-gray-50 transition-colors text-base font-plus-jakarta shadow-multi"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Demo Section - EXATAMENTE igual ao exemplo */}
          <div className="mt-20 md:mt-32 max-w-6xl mx-auto">
            <div className="relative bg-white/80 backdrop-blur-54 rounded-2xl border border-white/20 p-8 shadow-soft">
              <div className="text-center mb-8">
                <p className="text-sm font-medium text-[#52525b] mb-2 font-satoshi">Welcome to TalentsFlow AI</p>
                <h3 className="text-2xl font-bold text-[#09090b] font-plus-jakarta">
                  AI-Powered Technical Interviews
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-[#fafafa] rounded-xl p-6 border border-[#e5e7eb]">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#3b82f6] to-[#6366f1] rounded-lg flex items-center justify-center mr-4">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#09090b] font-plus-jakarta">Smart Assessment</h4>
                        <p className="text-sm text-[#52525b] font-satoshi">AI evaluates technical skills</p>
                      </div>
                    </div>
                    <p className="text-[#52525b] text-sm font-satoshi">
                      Our AI analyzes code quality, problem-solving approach, and technical knowledge in real-time.
                    </p>
                  </div>

                  <div className="bg-[#fafafa] rounded-xl p-6 border border-[#e5e7eb]">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] rounded-lg flex items-center justify-center mr-4">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#09090b] font-plus-jakarta">Performance Analytics</h4>
                        <p className="text-sm text-[#52525b] font-satoshi">Detailed candidate insights</p>
                      </div>
                    </div>
                    <p className="text-[#52525b] text-sm font-satoshi">
                      Get comprehensive reports on candidate performance across multiple technical dimensions.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#fafafa] to-white rounded-xl p-6 border border-[#e5e7eb]">
                  <div className="mb-6">
                    <h4 className="font-bold text-[#09090b] mb-4 font-plus-jakarta">Interview Dashboard</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#52525b] font-satoshi">Coding Challenge</span>
                        <span className="text-sm font-medium text-[#09090b] font-satoshi">85%</span>
                      </div>
                      <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#6366f1] w-4/5"></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#52525b] font-satoshi">Problem Solving</span>
                        <span className="text-sm font-medium text-[#09090b] font-satoshi">92%</span>
                      </div>
                      <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] w-[92%]"></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#52525b] font-satoshi">System Design</span>
                        <span className="text-sm font-medium text-[#09090b] font-satoshi">78%</span>
                      </div>
                      <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#d946ef] to-[#f472b6] w-[78%]"></div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-[#09090b] text-white font-medium rounded-lg hover:bg-[#18181b] transition-colors text-sm font-plus-jakarta">
                    View Full Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - EXATAMENTE igual ao exemplo */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#09090b] mb-6 font-plus-jakarta">
              Key Features
            </h2>
            <p className="text-lg text-[#52525b] font-satoshi">
              Everything you need for efficient tech hiring
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "AI-Powered Interviews",
                description: "Conduct technical interviews with AI assistance for consistent and fair evaluations.",
                color: "from-[#3b82f6] to-[#6366f1]"
              },
              {
                icon: Check,
                title: "Comprehensive Evaluation",
                description: "Get detailed assessments of candidates' technical skills and problem-solving abilities.",
                color: "from-[#10b981] to-[#059669]"
              },
              {
                icon: Clock,
                title: "Time-Saving Efficiency",
                description: "Reduce hiring time from weeks to days with automated screening and scheduling.",
                color: "from-[#f59e0b] to-[#d97706]"
              },
              {
                icon: TrendingUp,
                title: "Data-Driven Insights",
                description: "Make informed decisions with analytics on candidate performance and hiring metrics.",
                color: "from-[#8b5cf6] to-[#7c3aed]"
              },
              {
                icon: FileText,
                title: "Customizable Assessments",
                description: "Tailor interview questions and coding challenges to your specific tech stack.",
                color: "from-[#ec4899] to-[#db2777]"
              },
              {
                icon: Users,
                title: "Collaborative Hiring",
                description: "Share candidate evaluations and collaborate with your team in real-time.",
                color: "from-[#06b6d4] to-[#0891b2]"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#fafafa] rounded-xl p-8 border border-[#e5e7eb] hover:border-[#d1d5db] hover:shadow-soft transition-all">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#09090b] mb-3 font-plus-jakarta">{feature.title}</h3>
                <p className="text-[#52525b] font-satoshi">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - EXATAMENTE igual ao exemplo */}
      <section id="how-it-works" className="py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#09090b] mb-6 font-plus-jakarta">
              How It Works
            </h2>
            <p className="text-lg text-[#52525b] font-satoshi">
              A simple three-step process to streamline your tech hiring
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Set Up Interview",
                description: "Configure your technical interview with custom questions and coding challenges.",
                icon: "📝"
              },
              {
                number: "2",
                title: "Candidate Takes Interview",
                description: "Candidates complete the interview at their convenience with AI proctoring.",
                icon: "💻"
              },
              {
                number: "3",
                title: "Review & Evaluate",
                description: "Get AI-generated evaluations and insights to make informed hiring decisions.",
                icon: "📊"
              }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.icon}</span>
                </div>
                <div className="text-sm font-medium text-[#3b82f6] mb-2 font-satoshi">Step {step.number}</div>
                <h3 className="text-xl font-bold text-[#09090b] mb-3 font-plus-jakarta">{step.title}</h3>
                <p className="text-[#52525b] font-satoshi">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - EXATAMENTE igual ao exemplo */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#09090b] mb-6 font-plus-jakarta">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-[#52525b] font-satoshi">
              Start streamlining your tech hiring process today
            </p>
          </div>

          <div className="max-w-md mx-auto bg-gradient-to-br from-white to-[#fafafa] rounded-2xl border border-[#e5e7eb] p-8 shadow-soft">
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-[#09090b] mb-2 font-plus-jakarta">CA$599<span className="text-lg text-[#52525b]">/month</span></div>
              <p className="text-[#52525b] font-satoshi">Perfect for growing tech teams</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "100 interviews included",
                "Unlimited question bank",
                "AI-powered evaluations",
                "Technical support",
                "14-day free trial"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <Check className="w-5 h-5 text-[#10b981] mr-3" />
                  <span className="text-[#52525b] font-satoshi">{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
              className="w-full py-3 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-medium rounded-lg hover:opacity-90 transition-opacity font-plus-jakarta"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section - EXATAMENTE igual ao exemplo */}
      <section className="py-20 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#09090b] mb-6 font-plus-jakarta">
            Ready to streamline your tech hiring?
          </h2>
          <p className="text-lg text-[#52525b] mb-10 max-w-2xl mx-auto font-satoshi">
            Join forward-thinking companies using TalentsFlow AI to hire better tech talent faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
              className="px-8 py-3 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-base font-plus-jakarta"
            >
              Request Demo
            </button>
            <button 
              onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
              className="px-8 py-3 bg-white border border-[#e5e7eb] text-[#09090b] font-medium rounded-lg hover:bg-gray-50 transition-colors text-base font-plus-jakarta"
            >
              Schedule a Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer - EXATAMENTE igual ao exemplo */}
      <footer className="py-12 bg-[#09090b] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white font-plus-jakarta">TalentsFlow AI</span>
              </div>
              <p className="text-[#a1a1aa] text-sm font-satoshi">Streamlining tech hiring with AI-powered interviews.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 font-plus-jakarta">Product</h4>
              <ul className="space-y-2 text-[#a1a1aa] text-sm font-satoshi">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 font-plus-jakarta">Company</h4>
              <ul className="space-y-2 text-[#a1a1aa] text-sm font-satoshi">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 font-plus-jakarta">Resources</h4>
              <ul className="space-y-2 text-[#a1a1aa] text-sm font-satoshi">
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#27272a] text-center text-[#a1a1aa] text-sm font-satoshi">
            <p>© 2026 TalentsFlow AI. All rights reserved.</p>
            <div className="mt-2">
              <a href="#" className="hover:text-white transition-colors mx-2">Privacy Policy</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-white transition-colors mx-2">Terms of Service</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-white transition-colors mx-2">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}