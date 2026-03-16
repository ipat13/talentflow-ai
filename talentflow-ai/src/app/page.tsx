"use client";

import { useEffect } from "react";
import { 
  Sparkles, 
  Target, 
  Clock, 
  TrendingUp,
  Check,
  FileText,
  Users
} from "lucide-react";

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
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header - IDÊNTICO ao original */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                 <Sparkles className="w-5 h-5 text-white" />
               </div>
              <span className="text-xl font-bold text-blue-700">
                TalentsFlow
              </span>
            </div>

            {/* Navigation - IDÊNTICO ao exemplo */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 font-medium">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 font-medium">How it Works</a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 font-medium">Pricing</a>
              <a href="https://www.linkedin.com/in/ruofei-du/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 font-medium">Get Started</a>
            </nav>

            {/* CTA Button - IDÊNTICO ao exemplo */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - IDENTICAL to example */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Hero Content - IDENTICAL to example */}
            <div className="mb-16">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-slate-900">
                Streamline Your Tech Hiring Process
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                Empower your HR team with AI-driven interviews
              </p>

              <button 
                onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-lg"
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - IDENTICAL to example */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Key Features
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need for efficient tech hiring
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "AI-Powered Interviews",
                description: "Conduct technical interviews with AI assistance for consistent and fair evaluations."
              },
              {
                icon: Check,
                title: "Comprehensive Evaluation",
                description: "Get detailed assessments of candidates' technical skills and problem-solving abilities."
              },
              {
                icon: Clock,
                title: "Time-Saving Efficiency",
                description: "Reduce hiring time from weeks to days with automated screening and scheduling."
              },
              {
                icon: TrendingUp,
                title: "Data-Driven Insights",
                description: "Make informed decisions with analytics on candidate performance and hiring metrics."
              },
              {
                icon: FileText,
                title: "Customizable Assessments",
                description: "Tailor interview questions and coding challenges to your specific tech stack."
              },
              {
                icon: Users,
                title: "Collaborative Hiring",
                description: "Share candidate evaluations and collaborate with your team in real-time."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - IDENTICAL to example */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              A simple three-step process to streamline your tech hiring
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Set Up Interview",
                description: "Configure your technical interview with custom questions and coding challenges."
              },
              {
                number: "2",
                title: "Candidate Takes Interview",
                description: "Candidates complete the interview at their convenience with AI proctoring."
              },
              {
                number: "3",
                title: "Review & Evaluate",
                description: "Get AI-generated evaluations and insights to make informed hiring decisions."
              }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - IDENTICAL to example */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-slate-600">
              Start streamlining your tech hiring process today
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-slate-900 mb-2">CA$599<span className="text-lg text-slate-600">/month</span></div>
              <p className="text-slate-600">Perfect for growing tech teams</p>
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
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section - IDENTICAL to example */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to streamline your tech hiring?
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Join forward-thinking companies using TalentsFlow AI to hire better tech talent faster.
          </p>
          <button 
            onClick={() => window.open('https://www.linkedin.com/in/ruofei-du/', '_blank')}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            Request Demo
          </button>
        </div>
      </section>

      {/* Footer - IDENTICAL to example */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">TalentsFlow AI</span>
              </div>
              <p className="text-slate-400 text-sm">Streamlining tech hiring with AI-powered interviews.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Case Studies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
            <p>© 2026 TalentsFlow AI. All rights reserved.</p>
            <div className="mt-2">
              <a href="#" className="hover:text-white mx-2">Privacy Policy</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-white mx-2">Terms of Service</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-white mx-2">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}