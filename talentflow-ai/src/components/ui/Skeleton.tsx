"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SkeletonProps {
  className?: string;
  children?: ReactNode;
  shimmer?: boolean;
  pulse?: boolean;
  delay?: number;
  style?: React.CSSProperties;
}

export function Skeleton({ 
  className, 
  children, 
  shimmer = true, 
  pulse = false, 
  delay = 0,
  style 
}: SkeletonProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg", 
        pulse && "animate-pulse",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        ...style 
      }}
    >
      {children || <div className="h-full w-full bg-slate-700/50" />}
      {shimmer && (
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
    </div>
  );
}

export function CardSkeleton({
  count = 1,
  variant = "default"
}: {
  count?: number;
  variant?: "default" | "stats" | "list" | "chart";
}) {
  const skeletons = Array.from({ length: count });
  
  const getVariantContent = () => {
    switch (variant) {
      case "stats":
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-4 w-24" shimmer />
              <Skeleton className="h-10 w-10 rounded-xl" shimmer />
            </div>
            <Skeleton className="h-8 w-16 mb-2" shimmer />
            <Skeleton className="h-2 w-full" shimmer />
          </div>
        );
      
      case "list":
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-32" shimmer />
              <Skeleton className="h-4 w-16" shimmer />
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" shimmer />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" shimmer />
                      <Skeleton className="h-3 w-24" shimmer />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" shimmer />
                </div>
              ))}
            </div>
          </div>
        );
      
      case "chart":
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-6 w-40" shimmer />
              <Skeleton className="h-4 w-20" shimmer />
            </div>
            <div className="h-48 flex items-end justify-between gap-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <Skeleton 
                    className="w-3/4 rounded-t-lg" 
                    shimmer 
                    style={{ height: `${20 + Math.random() * 60}%` }}
                  />
                  <Skeleton className="h-3 w-8 mt-2" shimmer />
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-6">
            <Skeleton className="h-6 w-32 mb-4" shimmer />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" shimmer />
              <Skeleton className="h-4 w-5/6" shimmer />
              <Skeleton className="h-4 w-4/6" shimmer />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {skeletons.map((_, index) => (
        <Skeleton 
          key={index} 
          className="bg-slate-800/30 border border-slate-700/50"
          shimmer
          delay={index * 100}
        >
          {getVariantContent()}
        </Skeleton>
      ))}
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-700">
      <Skeleton className="h-10 w-10 rounded-full" shimmer />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" shimmer />
        <Skeleton className="h-3 w-1/2" shimmer />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" shimmer />
    </div>
  );
}

export function JobListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CandidateListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <TableRowSkeleton key={i} />
      ))}
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="bg-slate-800/80 border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" shimmer />
          <Skeleton className="h-8 w-16" shimmer />
          <Skeleton className="h-3 w-20" shimmer />
        </div>
        <Skeleton className="h-12 w-12 rounded-xl" shimmer />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" shimmer />
          <Skeleton className="h-10 w-full" shimmer />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" shimmer />
          <Skeleton className="h-10 w-full" shimmer />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" shimmer />
        <Skeleton className="h-24 w-full" shimmer />
      </div>
      <Skeleton className="h-10 w-32" shimmer />
    </div>
  );
}

// 🌈 Skeleton com Gradiente
export function GradientSkeleton({
  className = "",
  gradient = "from-slate-700 via-slate-600 to-slate-700"
}: {
  className?: string;
  gradient?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-r", gradient, "animate-shimmer bg-[length:200%_100%]")} />
      <div className="relative bg-slate-800/30 h-full w-full" />
    </div>
  );
}

// 🔄 Skeleton com Spinner
export function SpinnerSkeleton({
  text = "A carregar...",
  size = "md"
}: {
  text?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className={cn(sizeClasses[size], "border-2 border-slate-700 border-t-indigo-500 rounded-full animate-spin")} />
        <div className="absolute inset-0 border-2 border-transparent border-t-indigo-300 rounded-full animate-spin" style={{ animationDirection: "reverse" }} />
      </div>
      {text && (
        <div className="text-center">
          <Skeleton className="h-4 w-24 mx-auto mb-1" shimmer />
          <Skeleton className="h-3 w-32 mx-auto" shimmer />
        </div>
      )}
    </div>
  );
}

// 📋 Skeleton para Tabela Avançada
export function TableSkeleton({
  rows = 5,
  columns = 4
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700/50">
      <div className="bg-slate-800/30 p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" shimmer />
          <Skeleton className="h-4 w-24" shimmer />
        </div>
      </div>
      
      <div className="divide-y divide-slate-700/30">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton 
                  key={colIndex} 
                  className="h-4" 
                  shimmer
                  delay={rowIndex * 50 + colIndex * 10}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 👤 Skeleton para Perfil
export function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4">
      <Skeleton className="h-12 w-12 rounded-full" shimmer />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" shimmer />
        <Skeleton className="h-3 w-24" shimmer />
      </div>
    </div>
  );
}

// 🎭 Skeleton com Placeholder
export function PlaceholderSkeleton({
  icon,
  title,
  description,
  action
}: {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="text-center p-8 space-y-4">
      {icon && (
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
          {icon}
        </div>
      )}
      
      {title && (
        <div className="space-y-2">
          <Skeleton className="h-6 w-48 mx-auto" shimmer />
          {description && <Skeleton className="h-4 w-64 mx-auto" shimmer />}
        </div>
      )}
      
      {action && (
        <div className="pt-4">
          {action}
        </div>
      )}
    </div>
  );
}
