"use client";

import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// 🎨 Componente de Card com Glassmorphism
export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass-card rounded-2xl p-6 transition-all-smooth hover-lift ${className}`}>
      {children}
    </div>
  );
}

// ✨ Componente com Animação de Entrada
export function AnimatedCard({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: ReactNode; 
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible 
          ? "opacity-100 transform translate-y-0" 
          : "opacity-0 transform translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

// 📊 Progress Ring Animado
export function ProgressRing({ 
  value, 
  max = 100, 
  size = 80,
  strokeWidth = 4,
  color = "stroke-indigo-500"
}: { 
  value: number; 
  max?: number; 
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedValue / max) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className={`${color} transition-all duration-1000 ease-out`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold text-white">{value}%</div>
      </div>
    </div>
  );
}

// 🔥 Badge com Animação
export function AnimatedBadge({ 
  children, 
  variant = "default",
  pulse = false,
  className = ""
}: { 
  children: ReactNode; 
  variant?: "default" | "success" | "warning" | "danger" | "info";
  pulse?: boolean;
  className?: string;
}) {
  const variants = {
    default: "bg-slate-700 text-slate-300",
    success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    danger: "bg-red-500/20 text-red-400 border-red-500/30",
    info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${variants[variant]} ${pulse ? "animate-pulse" : ""} transition-all-smooth ${className}`}>
      {children}
    </span>
  );
}

// 🌈 Avatar com Gradiente Único
export function GradientAvatar({ 
  text, 
  size = 40,
  className = ""
}: { 
  text: string; 
  size?: number;
  className?: string;
}) {
  // Gerar gradiente único baseado no texto
  const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  
  const gradientStyle = {
    background: `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${(hue + 30) % 360}, 70%, 50%))`,
    width: `${size}px`,
    height: `${size}px`,
  };
  
  return (
    <div 
      className={`rounded-full flex items-center justify-center text-white font-bold shadow-lg ${className}`}
      style={gradientStyle}
    >
      {text[0]?.toUpperCase() || "?"}
    </div>
  );
}

// ⚡ Skeleton Loading Animado
export function ShimmerSkeleton({ 
  width = "100%", 
  height = "20px",
  className = ""
}: { 
  width?: string | number;
  height?: string | number;
  className?: string;
}) {
  return (
    <div 
      className={`rounded bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-shimmer bg-[length:200%_100%] ${className}`}
      style={{ width, height }}
    />
  );
}

// 🎯 Status Indicator com Animação
export function StatusIndicator({ 
  status,
  label,
  showLabel = true
}: { 
  status: "active" | "inactive" | "warning" | "success" | "error";
  label?: string;
  showLabel?: boolean;
}) {
  const config = {
    active: { color: "bg-emerald-500", pulse: true },
    inactive: { color: "bg-slate-500", pulse: false },
    warning: { color: "bg-amber-500", pulse: true },
    success: { color: "bg-emerald-500", pulse: false },
    error: { color: "bg-red-500", pulse: true },
  }[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color} ${config.pulse ? "animate-pulse" : ""}`} />
      {showLabel && label && <span className="text-sm text-slate-300">{label}</span>}
    </div>
  );
}

// 💫 Efeito de Partículas (simples)
export function ParticleBackground({ 
  particleCount = 30,
  className = ""
}: { 
  particleCount?: number;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: particleCount }).map((_, i) => {
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${duration}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// 🎭 Card com Gradiente Interativo
export function InteractiveGradientCard({ 
  children,
  className = ""
}: { 
  children: ReactNode;
  className?: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };
  
  return (
    <div 
      className={`relative overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 50, y: 50 })}
    >
      <div 
        className="absolute inset-0 opacity-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #6366f1, transparent 50%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// 📱 Responsive Grid com Animação Stagger
export function AnimatedGrid({ 
  children,
  className = ""
}: { 
  children: ReactNode[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {children.map((child, index) => (
        <div 
          key={index}
          className="opacity-0 animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// 🔔 Notification Badge Animado
export function NotificationBadge({ 
  count,
  max = 9
}: { 
  count: number;
  max?: number;
}) {
  if (count <= 0) return null;
  
  const displayCount = count > max ? `${max}+` : count.toString();
  
  return (
    <div className="relative">
      {count > 0 && (
        <>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">
              {displayCount}
            </span>
          </span>
        </>
      )}
    </div>
  );
}

// 🎨 Toggle de Tema Avançado
export function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  
  const getThemeIcon = () => {
    if (theme === "system") {
      return resolvedTheme === "dark" ? "🌓" : "🌓";
    }
    return theme === "dark" ? "🌙" : "☀️";
  };
  
  const getThemeLabel = () => {
    if (theme === "system") {
      return `Sistema (${resolvedTheme === "dark" ? "Escuro" : "Claro"})`;
    }
    return theme === "dark" ? "Escuro" : "Claro";
  };

  return (
    <button
      onClick={toggleTheme}
      className="group relative p-3 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:from-slate-700/50 hover:to-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover-lift"
      aria-label={`Mudar tema. Atual: ${getThemeLabel()}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="text-2xl transition-transform duration-500 group-hover:scale-110">
            {getThemeIcon()}
          </div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
        </div>
        <div className="text-left">
          <div className="text-sm font-medium text-white">Tema</div>
          <div className="text-xs text-slate-400">{getThemeLabel()}</div>
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </button>
  );
}