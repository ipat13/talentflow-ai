"use client";

import { Brain, Sparkles } from "lucide-react";

export function LandingLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <Brain className="w-12 h-12 text-white" />
          </div>
          
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-6 h-6 text-amber-500 animate-spin" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          TalentFlow AI
        </h2>
        
        <p className="text-slate-600 mb-8">
          Preparando sua experiência de recrutamento inteligente...
        </p>
        
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}