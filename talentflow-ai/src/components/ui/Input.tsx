import { InputHTMLAttributes, forwardRef } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, success, id, ...props }, ref) => {
    const errorId = error ? `${id}-error` : undefined;
    const successId = success ? `${id}-success` : undefined;
    
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[var(--color-text)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={errorId || successId}
            className={`w-full px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors ${error ? "border-[var(--color-danger)] pr-10" : ""} ${success && !error ? "border-[var(--color-secondary)] pr-10" : ""} ${className}`}
            {...props}
          />
          {error && (
            <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-danger)]" />
          )}
          {success && !error && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-secondary)]" />
          )}
        </div>
        {error && (
          <span id={errorId} className="text-sm text-[var(--color-danger)]" role="alert">
            {error}
          </span>
        )}
        {success && !error && (
          <span id={successId} className="text-sm text-[var(--color-secondary)]">
            {success}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
