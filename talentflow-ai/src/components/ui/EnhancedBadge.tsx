"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface EnhancedBadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  pulse?: boolean;
  gradient?: boolean;
  className?: string;
}

export function EnhancedBadge({
  children,
  variant = "default",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  pulse = false,
  gradient = false,
  className = "",
}: EnhancedBadgeProps) {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-all duration-300";
  
  const variantStyles = {
    default: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200",
    primary: gradient
      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
      : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300",
    secondary: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300",
    success: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
    warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300",
    danger: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
    info: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  const pulseStyle = pulse ? "animate-pulse" : "";

  return (
    <span
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${pulseStyle}
        ${className}
        ${gradient ? "shadow-sm" : ""}
      `}
    >
      {/* Icon on left */}
      {Icon && iconPosition === "left" && (
        <Icon className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"} mr-1.5 flex-shrink-0`} />
      )}
      
      {/* Badge content */}
      <span className="whitespace-nowrap">{children}</span>
      
      {/* Icon on right */}
      {Icon && iconPosition === "right" && (
        <Icon className={`${size === "sm" ? "w-3 h-3" : "w-4 h-4"} ml-1.5 flex-shrink-0`} />
      )}
    </span>
  );
}

// Status badge variants
export function StatusBadge({ status }: { status: "active" | "inactive" | "pending" | "completed" | "warning" | "error" }) {
  const config = {
    active: {
      label: "Ativo",
      variant: "success" as const,
      pulse: true,
    },
    inactive: {
      label: "Inativo",
      variant: "default" as const,
      pulse: false,
    },
    pending: {
      label: "Pendente",
      variant: "warning" as const,
      pulse: true,
    },
    completed: {
      label: "Concluído",
      variant: "success" as const,
      pulse: false,
    },
    warning: {
      label: "Aviso",
      variant: "warning" as const,
      pulse: true,
    },
    error: {
      label: "Erro",
      variant: "danger" as const,
      pulse: true,
    },
  };

  const { label, variant, pulse } = config[status];

  return (
    <EnhancedBadge variant={variant} pulse={pulse}>
      {label}
    </EnhancedBadge>
  );
}

// Skill badge with remove option
export function SkillBadge({
  skill,
  onRemove,
  removable = false,
}: {
  skill: string;
  onRemove?: () => void;
  removable?: boolean;
}) {
  return (
    <EnhancedBadge
      variant="primary"
      className="group relative"
    >
      {skill}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1.5 -mr-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
          aria-label={`Remover ${skill}`}
        >
          <span className="sr-only">Remover</span>
          <span className="w-3 h-3 flex items-center justify-center">×</span>
        </button>
      )}
    </EnhancedBadge>
  );
}

// Match score badge
export function MatchScoreBadge({ score }: { score: number }) {
  const getVariant = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "primary";
    if (score >= 40) return "warning";
    return "danger";
  };

  const getColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 60) return "text-indigo-600 dark:text-indigo-400";
    if (score >= 40) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="flex items-center gap-2">
      <EnhancedBadge variant={getVariant(score)} gradient={score >= 80}>
        {score}%
      </EnhancedBadge>
      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${getColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}