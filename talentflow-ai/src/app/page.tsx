"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { 
  Sparkles, 
  Zap, 
  Search, 
  Globe, 
  Target, 
  Clock, 
  TrendingUp,
  Check,
  FileText,
  Users,
  Filter,
  Shield,
  Video,
  Eye,
  BarChart3,
  ChevronRight,
  Send,
  Loader2,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar
} from "lucide-react";

export default function Home() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();
  const [demoState, setDemoState] = useState<'input' | 'generating' | 'preview'>('input');
  const [gaugeValues, setGaugeValues] = useState([0, 0, 0, 0, 0]);

   // Function to get gauge colors without complex gradients
  const getGaugeColor = (index: number) => {
    const colors = [
       '#f59e0b', // amber
      '#10b981', // esmeralda
      '#0ea5e9', // azul
      '#8b5cf6', // roxo
      '#7c3aed'  // roxo escuro
    ];
    return colors[index] || '#7c3aed';
  };

  useEffect(() => {
    if (!loading && user) {
      window.location.href = "/dashboard";
    }
  }, [user, loading]);

  useEffect(() => {
    // Demo animation sequence
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDemoState('generating');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDemoState('preview');
      
      await new Promise(resolve => setTimeout(resolve, 5000));
      setDemoState('input');
    };

    sequence();
    const interval = setInterval(sequence, 8500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate gauges
    const animateGauges = () => {
      const targetValues = [92, 95, 88, 90, 85];
      const interval = setInterval(() => {
        setGaugeValues(prev => prev.map((val, idx) => {
          if (val < targetValues[idx]) {
            return Math.min(val + 2, targetValues[idx]);
          }
          return val;
        }));
      }, 50);

      setTimeout(() => clearInterval(interval), 1500);
    };

    // Trigger gauge animation when component mounts
    setTimeout(animateGauges, 500);
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  // Remover loading para debug
  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
  //           <Sparkles className="w-8 h-8 text-white" />
  //         </div>
  //         <p className="text-slate-600">Preparando sua experiência...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header - IDÊNTICO ao original */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                TalentFlow
              </span>
            </div>

            {/* Navigation - IDÊNTICO ao original */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-600 hover:text-purple-600 font-medium">For Jobseekers</a>
              <a href="#" className="text-slate-600 hover:text-purple-600 font-medium">For Recruiters</a>
            </nav>

            {/* CTA Button - IDÊNTICO ao original */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleSignIn}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - IDENTICAL to original */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Hero Content - IDENTICAL to original */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
                <span className="text-sm font-medium text-purple-700">Currently in Beta</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-slate-900">The talent ecosystem</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 bg-clip-text text-transparent">
                  that works for everyone.
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
                We're building an AI-powered platform that connects jobseekers, recruiters, and organizations in one unified ecosystem. Currently in early access. Join us as we shape the future of talent together.
              </p>
            </div>

            {/* Interactive Demo - IDENTICAL to original */}
            <div className="mt-32 relative">
              <div className="absolute inset-0 -inset-x-8 -inset-y-12 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-teal-500/20 rounded-3xl blur-3xl opacity-50"></div>
              
              <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <p className="text-sm font-medium text-slate-500 mb-2">Welcome to TalentFlow AI</p>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {demoState === 'input' && 'Describe your role'}
                      {demoState === 'generating' && 'AI is crafting your job posting...'}
                      {demoState === 'preview' && 'Your job posting is ready.'}
                    </h3>
                  </div>

                  <div className="relative">
                    {demoState === 'input' && (
                      <div className="space-y-6">
                        <div className="relative">
                          <textarea 
                            className="w-full h-32 p-4 border-2 border-slate-300 rounded-xl bg-white/50 backdrop-blur-sm text-slate-700 resize-none focus:outline-none focus:border-purple-500"
                            placeholder="Senior Full Stack Developer, React/Node.js, 5+ years, remote"
                            readOnly
                            value="Senior Full Stack Developer, React/Node.js, 5+ years, remote"
                          />
                          <button className="absolute right-4 bottom-4 w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center text-white">
                            <Send className="w-5 h-5" />
                          </button>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-500 mb-3">Example Prompts</p>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              "Senior Frontend Engineer with React experience",
                              "Product Manager for B2B SaaS platform",
                              "DevOps Engineer with AWS and Docker skills",
                              "UX Designer for mobile applications"
                            ].map((prompt, idx) => (
                              <div 
                                key={idx}
                                className="p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all"
                              >
                                {prompt}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Generating State */}
                    {demoState === 'generating' && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
                        <p className="text-lg font-medium text-slate-700">AI is generating your job description...</p>
                      </div>
                    )}

                    {/* Preview State */}
                    {demoState === 'preview' && (
                      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
                        <div className="mb-6">
                          <h4 className="text-xl font-bold text-slate-900 mb-2">Senior Full Stack Developer</h4>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                            <div className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-1" />
                              <span>TechFlow Fintech</span>
                            </div>
                            <span>|</span>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>San Francisco, CA | Remote</span>
                            </div>
                            <span>|</span>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              <span>$120,000 - $160,000</span>
                            </div>
                            <span>|</span>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>Full-time | Permanent</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 mb-6">
                          <div>
                            <h5 className="font-semibold text-slate-900 mb-2">Job Description</h5>
                            <p className="text-slate-600 text-sm">
                              Join our rapidly growing fintech startup as a Senior Full Stack Developer and help build the next generation of financial technology solutions.
                            </p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-slate-900 mb-2">Requirements</h5>
                            <ul className="text-slate-600 text-sm space-y-1">
                              <li className="flex items-center">
                                <Check className="w-4 h-4 text-green-500 mr-2" />
                                5+ years of professional experience with React and Node.js
                              </li>
                              <li className="flex items-center">
                                <Check className="w-4 h-4 text-green-500 mr-2" />
                                Proficiency in TypeScript and modern JavaScript
                              </li>
                              <li className="flex items-center">
                                <Check className="w-4 h-4 text-green-500 mr-2" />
                                Experience with RESTful APIs and database design
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                          <Button variant="outline" className="border-slate-300">
                            Edit Details
                          </Button>
                          <Button className="bg-gradient-to-r from-purple-600 to-blue-500">
                            Create Job
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section - IDENTICAL to original */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              How it works
            </h2>
            <p className="text-xl text-slate-600">
              A simple three-step process to transform your recruitment workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Describe your role",
                description: "Type a few words about the position you're hiring for, or use our AI-powered job description generator.",
                icon: FileText,
                color: "from-purple-500 to-blue-500"
              },
              {
                step: "2",
                title: "AI matches candidates",
                description: "Our AI analyzes thousands of profiles and finds the perfect matches based on skills, experience, and culture fit.",
                icon: Target,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "3",
                title: "Review & hire",
                description: "Review AI-ranked candidates, conduct interviews, and make offers - all within one platform.",
                icon: Check,
                color: "from-cyan-500 to-teal-500"
              }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-2">{step.step}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Superpowers Section - IDENTICAL to original */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header - IDENTICAL to original */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              AI superpowers that transform
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                how you recruit.
              </span>
            </h2>
            <p className="text-xl text-slate-600">
              Each designed to save hours and help you place better candidates faster.
            </p>
          </div>

          {/* Superpower 1: AI-Powered Matching - IDENTICAL to original */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-200 rounded-full text-sm font-medium text-amber-700 mb-4">
                <Target className="w-4 h-4 mr-2" />
                AI-Powered Matching
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Find perfect matches in seconds
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                Discover perfectly suited talent instantly. Our 5-dimensional AI scoring analyzes each candidate against your role, automatically detecting skill stacks. Stop guessing - start matching with confidence.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Experience & Skills Matching Score",
                  "Education & Role Requirements Alignment",
                  "Automatic skill stack detection (MERN, LAMP, etc.)"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <Button className="bg-gradient-to-r from-purple-600 to-blue-500">
                Learn more about Matching
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Sarah Chen</h4>
                <p className="text-slate-600">Senior Full Stack Developer with React & Node.js</p>
              </div>

              {/* Gauges */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: "Role", value: gaugeValues[0] },
                  { label: "Skills", value: gaugeValues[1] },
                  { label: "Experience", value: gaugeValues[2] },
                  { label: "Education", value: gaugeValues[3] },
                  { label: "Requirements", value: gaugeValues[4] }
                ].map((gauge, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-sm font-medium text-slate-700 mb-2">{gauge.label}</div>
                    <div className="relative w-20 h-20 mx-auto mb-2">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#e2e8f0" 
                          strokeWidth="8"
                        />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke={getGaugeColor(idx)}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={String(2 * Math.PI * 45)}
                          strokeDashoffset={String(2 * Math.PI * 45 * (1 - gauge.value / 100))}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-slate-900">{gauge.value}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Superpower 2: AI Job Posting Generator - IDENTICAL to original */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Senior Full Stack Developer</h4>
                    <p className="text-slate-600 text-sm">TechFlow Fintech | San Francisco, CA</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">$120,000 - $160,000</span>
                    <span className="text-sm text-slate-600">Full-time</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-3/4"></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "AWS", "5+ years", "TypeScript", "MongoDB"].map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/5 border border-blue-200 rounded-full text-sm font-medium text-blue-700 mb-4">
                <FileText className="w-4 h-4 mr-2" />
                AI Job Posting Generator
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Type a few words, get a complete description
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                Type a few words and get a complete job description. AI generates compelling descriptions, automatically attaches required skills, requirements, and benefits. Save hours of writing time.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Instant description generation",
                  "Automatic skills & requirements attachment",
                  "SEO optimization and candidate attraction"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
                Try the Generator
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Superpower 3: Talent Pool with AI Parsing - IDENTICAL to original */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-teal-500/10 to-teal-500/5 border border-teal-200 rounded-full text-sm font-medium text-teal-700 mb-4">
                <Users className="w-4 h-4 mr-2" />
                Talent Pool with AI Parsing
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Upload hundreds of resumes at once
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                Upload hundreds of resumes at once. Our AI parses, formats, and structures perfectly. Search, filter, and assign candidates to roles in seconds. Your private talent database.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Bulk upload & resume parsing",
                  "Private searchable database",
                  "Automatic skills and experience extraction"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                      <Check className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <Button className="bg-gradient-to-r from-teal-500 to-emerald-500">
                Manage Talent Pool
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Talent Pool Management</h4>
                <p className="text-slate-600">AI is parsing resumes...</p>
              </div>

              {/* Spinner */}
              <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-8"></div>

              {/* Resume Files */}
              <div className="space-y-4">
                {[
                  { name: "john_doe_resume.pdf", progress: 100 },
                  { name: "sarah_chen_cv.pdf", progress: 75 },
                  { name: "mike_wilson_resume.docx", progress: 50 },
                  { name: "jane_smith_cv.pdf", progress: 25 }
                ].map((file, idx) => (
                  <div key={idx} className="flex items-center p-3 bg-slate-50 rounded-lg">
                    <FileText className="w-5 h-5 text-slate-500 mr-3" />
                    <span className="flex-1 text-sm text-slate-700">{file.name}</span>
                    <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Superpowers Grid - IDENTICAL to original */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
            More powerful features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Filter,
                title: "Smart Filtering",
                description: "Filter candidates by stage, staleness level, tags, score range, and more.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Shield,
                title: "Team Management",
                description: "Create multiple specialized teams with granular permission controls.",
                color: "from-indigo-500 to-blue-500"
              },
              {
                icon: Video,
                title: "AI Interviews",
                description: "Native meeting platform with real-time transcription and AI assessment.",
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: Eye,
                title: "Total Transparency",
                description: "Candidates get real-time visibility into their application status.",
                color: "from-emerald-500 to-green-500"
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Make data-driven decisions with comprehensive recruitment analytics.",
                color: "from-cyan-500 to-blue-500"
              },
              {
                icon: Globe,
                title: "Global Collaboration",
                description: "Work with teams across different time zones and locations.",
                color: "from-rose-500 to-pink-500"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all group">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - IDENTICAL to original */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to transform your recruitment?
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Join thousands of recruiters already using TalentFlow AI to find better talent faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-8"
              onClick={handleSignIn}
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-slate-300 text-slate-700 hover:bg-white px-8"
              onClick={() => window.open('https://calendly.com/talentflow/demo', '_blank')}
            >
              <Video className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-slate-500 mt-6">
            No credit card required | 14-day trial
          </p>
        </div>
      </section>

      {/* Footer - IDENTICAL to original */}
      <footer className="py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-slate-900">TalentFlow AI</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">Intelligent Recruitment with AI</p>
            </div>
            <div className="text-sm text-slate-600">
              <span>© {new Date().getFullYear()} TalentFlow AI</span>
              <span className="mx-2">|</span>
              <span>by DeepSeek AI</span>
              <span className="mx-2">|</span>
              <a href="#" className="text-slate-600 hover:text-purple-600">Terms</a>
              <span className="mx-2">|</span>
              <a href="#" className="text-slate-600 hover:text-purple-600">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}