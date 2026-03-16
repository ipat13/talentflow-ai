"use client";

import { ReactNode } from "react";
import { CheckCircle, Circle, Clock, AlertCircle } from "lucide-react";

type ProgressVariant = "default" | "success" | "warning" | "danger" | "premium";
type ProgressSize = "sm" | "md" | "lg";

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  striped?: boolean;
}

interface Step {
  id: string;
  label: string;
  description?: string;
  status: "completed" | "current" | "pending" | "error";
  icon?: ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  variant?: ProgressVariant;
  orientation?: "horizontal" | "vertical";
}

const variantConfig = {
  default: {
    bg: "bg-slate-200 dark:bg-slate-700",
    fill: "bg-indigo-600 dark:bg-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  success: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    fill: "bg-emerald-600 dark:bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    fill: "bg-amber-600 dark:bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
  },
  danger: {
    bg: "bg-red-100 dark:bg-red-900/30",
    fill: "bg-red-600 dark:bg-red-500",
    text: "text-red-600 dark:text-red-400",
  },
  premium: {
    bg: "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
    fill: "bg-gradient-to-r from-purple-600 to-pink-600",
    text: "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600",
  },
};

const sizeConfig = {
  sm: {
    height: "h-1.5",
    text: "text-xs",
  },
  md: {
    height: "h-2.5",
    text: "text-sm",
  },
  lg: {
    height: "h-4",
    text: "text-base",
  },
};

export function ProgressBar({
  value,
  max = 100,
  variant = "default",
  size = "md",
  showLabel = true,
  label,
  animated = false,
  striped = false,
}: ProgressBarProps) {
  const config = variantConfig[variant];
  const sizeStyle = sizeConfig[size];
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const displayLabel = label || `${Math.round(percentage)}%`;

  return (
    <div className="space-y-2">
      {(showLabel || label) && (
        <div className="flex justify-between items-center">
          <span className={`font-medium ${sizeStyle.text} ${config.text}`}>
            {displayLabel}
          </span>
          {showLabel && !label && (
            <span className={`font-medium ${sizeStyle.text} text-slate-600 dark:text-slate-400`}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className={`relative rounded-full overflow-hidden ${sizeStyle.height} ${config.bg}`}>
        <div
          className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${config.fill} ${
            striped ? "bg-striped" : ""
          } ${animated ? "animate-pulse" : ""}`}
          style={{ width: `${percentage}%` }}
        >
          {striped && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          )}
        </div>
      </div>
    </div>
  );
}

export function CircularProgress({
  value,
  max = 100,
  variant = "default",
  size = "md",
  showLabel = true,
  label,
  strokeWidth = 3,
}: Omit<ProgressBarProps, 'striped' | 'animated'> & { strokeWidth?: number }) {
  const config = variantConfig[variant];
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const sizePx = {
    sm: 48,
    md: 64,
    lg: 80,
  }[size];
  
  const radius = (sizePx - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const displayLabel = label || `${Math.round(percentage)}%`;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={sizePx}
        height={sizePx}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={sizePx / 2}
          cy={sizePx / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-slate-200 dark:text-slate-700"
        />
        
        {/* Progress circle */}
        <circle
          cx={sizePx / 2}
          cy={sizePx / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`transition-all duration-700 ${config.text}`}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-lg"} ${config.text}`}>
            {displayLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export function Stepper({
  steps,
  currentStep,
  variant = "default",
  orientation = "horizontal",
}: StepperProps) {
  const config = variantConfig[variant];

  const getStepIcon = (step: Step) => {
    if (step.icon) return step.icon;
    
    switch (step.status) {
      case "completed":
        return <CheckCircle className="w-5 h-5" />;
      case "current":
        return <Clock className="w-5 h-5" />;
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "pending":
        return <Circle className="w-5 h-5" />;
    }
  };

  const getStepStyles = (step: Step, index: number) => {
    const baseStyles = "flex items-center";
    
    if (orientation === "horizontal") {
      return `${baseStyles} flex-col`;
    }
    
    return `${baseStyles} ${index < steps.length - 1 ? "mb-8" : ""}`;
  };

  const getConnectorStyles = (index: number) => {
    if (orientation === "horizontal") {
      return `flex-1 h-0.5 ${index < currentStep ? config.fill : "bg-slate-200 dark:bg-slate-700"}`;
    }
    
    return `flex-1 w-0.5 ${index < currentStep ? config.fill : "bg-slate-200 dark:bg-slate-700"}`;
  };

  if (orientation === "horizontal") {
    return (
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex flex-col items-center">
            <div className="flex items-center w-full">
              {index > 0 && (
                <div className={getConnectorStyles(index - 1)} />
              )}
              
              <div className={`relative flex flex-col items-center ${getStepStyles(step, index)}`}>
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${step.status === "completed" ? config.fill : 
                      step.status === "current" ? "bg-white dark:bg-slate-800 border-2 " + config.fill :
                      step.status === "error" ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" :
                      "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
                    }
                    ${step.status === "current" ? "border-2" : ""}
                    transition-all duration-300
                  `}
                >
                  {getStepIcon(step)}
                </div>
                
                <div className="mt-2 text-center">
                  <div className={`text-sm font-medium ${
                    index <= currentStep ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
                  }`}>
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={getConnectorStyles(index)} />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Vertical orientation
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        {steps.map((step, index) => (
          <div key={step.id} className={getStepStyles(step, index)}>
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                ${step.status === "completed" ? config.fill : 
                  step.status === "current" ? "bg-white dark:bg-slate-800 border-2 " + config.fill :
                  step.status === "error" ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" :
                  "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
                }
                ${step.status === "current" ? "border-2" : ""}
                transition-all duration-300
              `}
            >
              {getStepIcon(step)}
            </div>
            
            {index < steps.length - 1 && (
              <div className={getConnectorStyles(index)} />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex flex-col justify-between py-2">
        {steps.map((step, index) => (
          <div key={step.id} className={`${index < steps.length - 1 ? "mb-8" : ""} ${index === 0 ? "pt-1" : ""}`}>
            <div className={`font-medium ${
              index <= currentStep ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
            }`}>
              {step.label}
            </div>
            {step.description && (
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {step.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Multi-step progress with labels
export function MultiStepProgress({
  steps,
  currentStep,
  variant = "default",
}: {
  steps: string[];
  currentStep: number;
  variant?: ProgressVariant;
}) {
  const config = variantConfig[variant];
  const stepWidth = 100 / steps.length;

  return (
    <div className="space-y-4">
      <div className="relative h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full rounded-full ${config.fill} transition-all duration-500`}
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
        
        {/* Step markers */}
        {steps.map((_, index) => (
          <div
            key={index}
            className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${
              index <= currentStep
                ? `${config.fill} border-white dark:border-slate-900`
                : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
            }`}
            style={{ left: `${(index / steps.length) * 100}%` }}
          />
        ))}
      </div>
      
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-sm font-medium ${
              index <= currentStep ? config.text : "text-slate-500 dark:text-slate-400"
            }`}
            style={{ width: `${stepWidth}%`, textAlign: index === 0 ? "left" : index === steps.length - 1 ? "right" : "center" }}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}