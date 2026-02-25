import { HTMLAttributes, forwardRef } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-[var(--color-surface)] text-[var(--color-text)]",
      success: "bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]",
      warning: "bg-[var(--color-warning)]/20 text-[var(--color-warning)]",
      danger: "bg-[var(--color-danger)]/20 text-[var(--color-danger)]",
      info: "bg-[var(--color-primary)]/20 text-[var(--color-primary)]",
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-[var(--radius-full)] ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
