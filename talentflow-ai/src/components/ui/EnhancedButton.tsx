"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface EnhancedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
  glowEffect?: boolean;
  gradient?: boolean;
}

export function EnhancedButton({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  fullWidth = false,
  glowEffect = false,
  gradient = false,
  className = "",
  disabled,
  ...props
}: EnhancedButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover-lift";
  
  const variantStyles = {
    primary: gradient 
      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 focus:ring-indigo-500"
      : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost: "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-500",
    outline: "border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus:ring-slate-500",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const glowStyle = glowEffect ? "hover:shadow-lg hover:shadow-indigo-500/30" : "";
  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${glowStyle}
        ${widthStyle}
        ${className}
        ${glowEffect && variant === "primary" ? "animate-pulse-glow" : ""}
        relative overflow-hidden
      `}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer effect on hover */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Loading spinner */}
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {/* Icon */}
      {Icon && !loading && iconPosition === "left" && (
        <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
      )}
      
      {/* Button text */}
      <span className="relative">{children}</span>
      
      {/* Icon */}
      {Icon && !loading && iconPosition === "right" && (
        <Icon className="w-4 h-4 ml-2 flex-shrink-0" />
      )}
    </button>
  );
}

// Special button variants
export function GradientButton(props: EnhancedButtonProps) {
  return <EnhancedButton {...props} gradient glowEffect />;
}

export function IconButton({
  icon: Icon,
  label,
  ...props
}: Omit<EnhancedButtonProps, 'children'> & { icon: LucideIcon; label: string }) {
  return (
    <EnhancedButton
      {...props}
      aria-label={label}
      className={`p-2 ${props.className || ''}`}
    >
      <Icon className="w-5 h-5" />
    </EnhancedButton>
  );
}