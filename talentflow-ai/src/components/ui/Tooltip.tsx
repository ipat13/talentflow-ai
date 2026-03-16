"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { Info, HelpCircle, AlertCircle, Star, Zap, Target } from "lucide-react";

type TooltipPosition = "top" | "bottom" | "left" | "right";
type TooltipVariant = "default" | "info" | "warning" | "success" | "premium";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
  variant?: TooltipVariant;
  delay?: number;
  maxWidth?: number;
  icon?: ReactNode;
  className?: string;
}

const positionStyles = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowStyles = {
  top: "bottom-[-6px] left-1/2 -translate-x-1/2 border-t-current",
  bottom: "top-[-6px] left-1/2 -translate-x-1/2 border-b-current",
  left: "right-[-6px] top-1/2 -translate-y-1/2 border-l-current",
  right: "left-[-6px] top-1/2 -translate-y-1/2 border-r-current",
};

const variantStyles = {
  default: "bg-slate-800 text-white border-slate-700",
  info: "bg-blue-500 text-white border-blue-600",
  warning: "bg-amber-500 text-white border-amber-600",
  success: "bg-emerald-500 text-white border-emerald-600",
  premium: "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-700",
};

const variantIcons = {
  default: <Info className="w-4 h-4" />,
  info: <Info className="w-4 h-4" />,
  warning: <AlertCircle className="w-4 h-4" />,
  success: <Star className="w-4 h-4" />,
  premium: <Zap className="w-4 h-4" />,
};

export function Tooltip({
  children,
  content,
  position = "top",
  variant = "default",
  delay = 300,
  maxWidth = 250,
  icon,
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let x = 0;
    let y = 0;

    switch (position) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.top - tooltipRect.height - 8;
        break;
      case "bottom":
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.bottom + 8;
        break;
      case "left":
        x = triggerRect.left - tooltipRect.width - 8;
        y = triggerRect.top + triggerRect.height / 2;
        break;
      case "right":
        x = triggerRect.right + 8;
        y = triggerRect.top + triggerRect.height / 2;
        break;
    }

    // Adjust for viewport boundaries
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (position === "top" && y < 0) {
      y = triggerRect.bottom + 8;
    } else if (position === "bottom" && y + tooltipRect.height > viewportHeight) {
      y = triggerRect.top - tooltipRect.height - 8;
    } else if (position === "left" && x < 0) {
      x = triggerRect.right + 8;
    } else if (position === "right" && x + tooltipRect.width > viewportWidth) {
      x = triggerRect.left - tooltipRect.width - 8;
    }

    setCoords({ x, y });
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isVisible, position]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const displayIcon = icon || variantIcons[variant];

  return (
    <div
      ref={triggerRef}
      className={`inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      aria-describedby={isVisible ? "tooltip-content" : undefined}
    >
      {children}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            fixed z-[130] rounded-lg border shadow-xl
            ${variantStyles[variant]}
            animate-scale-in
            backdrop-blur-sm
          `}
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            maxWidth: `${maxWidth}px`,
            transform: "translate(-50%, -50%)",
          }}
          role="tooltip"
          id="tooltip-content"
        >
          <div className="relative p-3">
            <div className="flex items-start gap-2">
              {displayIcon && (
                <div className="flex-shrink-0 mt-0.5">
                  {displayIcon}
                </div>
              )}
              <div className="flex-1 text-sm">
                {content}
              </div>
            </div>
            
            {/* Arrow */}
            <div
              className={`
                absolute w-0 h-0 border-4 border-transparent
                ${arrowStyles[position]}
              `}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Predefined tooltip components for common use cases
export function InfoTooltip({ content, ...props }: Omit<TooltipProps, 'children' | 'variant'>) {
  return (
    <Tooltip variant="info" content={content} {...props}>
      <button
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
        aria-label="Informação"
      >
        <Info className="w-3 h-3" />
      </button>
    </Tooltip>
  );
}

export function HelpTooltip({ content, ...props }: Omit<TooltipProps, 'children' | 'variant'>) {
  return (
    <Tooltip variant="default" content={content} {...props}>
      <button
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Ajuda"
      >
        <HelpCircle className="w-3 h-3" />
      </button>
    </Tooltip>
  );
}

export function PremiumTooltip({ content, ...props }: Omit<TooltipProps, 'children' | 'variant'>) {
  return (
    <Tooltip variant="premium" content={content} {...props}>
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 text-xs font-medium">
        <Zap className="w-3 h-3" />
        Premium
      </span>
    </Tooltip>
  );
}

export function MatchScoreTooltip({ score, details }: { score: number; details: string }) {
  return (
    <Tooltip
      variant={score >= 80 ? "success" : score >= 60 ? "info" : "warning"}
      content={
        <div className="space-y-2">
          <div className="font-medium">Score: {score}%</div>
          <p className="text-white/90">{details}</p>
          <div className="pt-1">
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>
      }
    >
      <span className="inline-flex items-center gap-1 cursor-help">
        <Target className="w-4 h-4" />
        {score}%
      </span>
    </Tooltip>
  );
}

// Inline text tooltip
export function TextWithTooltip({ 
  text, 
  tooltip, 
  underline = true,
  variant = "info",
}: { 
  text: string; 
  tooltip: string;
  underline?: boolean;
  variant?: TooltipVariant;
}) {
  return (
    <Tooltip
      variant={variant}
      content={tooltip}
      position="top"
    >
      <span className={`inline ${underline ? "underline decoration-dotted" : ""} cursor-help`}>
        {text}
      </span>
    </Tooltip>
  );
}