import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] focus:ring-[var(--color-primary)]",
      secondary:
        "bg-[var(--color-secondary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-secondary-hover)] focus:ring-[var(--color-secondary)]",
      danger:
        "bg-[var(--color-danger)] text-[var(--color-text-inverse)] hover:bg-[var(--color-danger-hover)] focus:ring-[var(--color-danger)]",
      ghost:
        "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] focus:ring-[var(--color-border)]",
    };

    const sizes = {
      sm: "text-sm px-3 py-1.5 rounded-[var(--radius-sm)]",
      md: "text-base px-4 py-2 rounded-[var(--radius-md)]",
      lg: "text-lg px-6 py-3 rounded-[var(--radius-md)]",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
