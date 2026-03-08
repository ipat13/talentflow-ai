import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, error, options, placeholder, id, ...props }, ref) => {
    const errorId = error ? `${id}-error` : undefined;

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
        <select
          ref={ref}
          id={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          className={`px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors ${error ? "border-[var(--color-danger)]" : ""} ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span id={errorId} className="text-sm text-[var(--color-danger)]" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
