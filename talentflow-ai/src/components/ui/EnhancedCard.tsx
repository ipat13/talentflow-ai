"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface EnhancedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  gradientBorder?: boolean;
  icon?: LucideIcon;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
}

export function EnhancedCard({
  children,
  className = "",
  hoverEffect = true,
  glowEffect = false,
  gradientBorder = false,
  icon: Icon,
  title,
  subtitle,
  footer,
}: EnhancedCardProps) {
  return (
    <div
      className={`
        relative group
        ${gradientBorder ? "p-[1px]" : ""}
        ${className}
      `}
    >
      {/* Gradient Border Effect */}
      {gradientBorder && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-500" />
      )}
      
      <div
        className={`
          relative
          ${gradientBorder ? "bg-slate-900/90 backdrop-blur-sm" : "bg-white dark:bg-slate-800/50"}
          rounded-xl
          border border-slate-200 dark:border-slate-700/50
          ${hoverEffect ? "hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300" : ""}
          ${glowEffect ? "hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5" : "shadow-sm"}
          overflow-hidden
          ${hoverEffect ? "hover-lift" : ""}
        `}
      >
        {/* Header with icon */}
        {(Icon || title || subtitle) && (
          <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-700/50">
            <div className="flex items-start gap-4">
              {Icon && (
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                {title && (
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30">
            {footer}
          </div>
        )}
        
        {/* Hover glow effect */}
        {glowEffect && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}
      </div>
    </div>
  );
}

// Variant components for common use cases
export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  trend = "up",
}: {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
}) {
  return (
    <EnhancedCard
      hoverEffect
      glowEffect
      icon={Icon}
      className="h-full"
    >
      <div className="space-y-2">
        <p className="text-sm text-slate-600 dark:text-slate-400">{title}</p>
        <div className="flex items-end justify-between">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
          {change && (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              trend === "up"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            }`}>
              {trend === "up" ? "↑" : "↓"} {change}
            </span>
          )}
        </div>
      </div>
    </EnhancedCard>
  );
}

export function ActionCard({
  title,
  description,
  icon: Icon,
  action,
  variant = "primary",
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  action: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}) {
  const variantStyles = {
    primary: "from-indigo-500 to-purple-600",
    secondary: "from-emerald-500 to-teal-600",
    danger: "from-red-500 to-pink-600",
  };

  return (
    <EnhancedCard
      hoverEffect
      gradientBorder
      className="h-full"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br ${variantStyles[variant]}">
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>
        
        <div className="pt-2">
          {action}
        </div>
      </div>
    </EnhancedCard>
  );
}