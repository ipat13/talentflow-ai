"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import { Check, X, Star, Heart, ThumbsUp, Zap, Sparkles, MousePointerClick } from "lucide-react";

// 🎯 Hover Effects
export function HoverCard({
  children,
  className = "",
  scale = true,
  glow = false,
  border = false,
}: {
  children: ReactNode;
  className?: string;
  scale?: boolean;
  glow?: boolean;
  border?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative transition-all duration-300
        ${scale ? "hover:scale-[1.02]" : ""}
        ${glow ? "hover:shadow-lg hover:shadow-blue-500/20" : "hover:shadow-md"}
        ${border ? "hover:border-blue-500/50" : ""}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {glow && isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl -z-10" />
      )}
    </div>
  );
}

// ✨ Click Feedback
export function RippleButton({
  children,
  onClick,
  className = "",
  variant = "default",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "primary" | "success" | "danger";
  disabled?: boolean;
}) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const variants = {
    default: "bg-slate-800 hover:bg-slate-700 text-white",
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        px-4 py-2 rounded-lg
        font-medium transition-all duration-200
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
      
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </button>
  );
}

// ⭐ Rating Interaction
export function RatingStars({
  value = 0,
  onChange,
  max = 5,
  size = "md",
  interactive = true,
}: {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
}) {
  const [hoverValue, setHoverValue] = useState(0);
  const [localValue, setLocalValue] = useState(value);

  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const handleClick = (index: number) => {
    if (!interactive) return;
    
    const newValue = index + 1;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseEnter = (index: number) => {
    if (!interactive) return;
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverValue(0);
  };

  const displayValue = hoverValue || localValue;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index < displayValue;
        const isHovered = index < hoverValue;
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            disabled={!interactive}
            className={`
              transition-all duration-200
              ${interactive ? "hover:scale-110 cursor-pointer" : "cursor-default"}
              ${sizeClasses[size]}
            `}
          >
            <Star
              className={`
                ${isFilled ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}
                ${isHovered ? "scale-110" : ""}
                transition-all duration-200
              `}
            />
          </button>
        );
      })}
      
      {interactive && (
        <span className="ml-2 text-sm text-slate-400">
          {localValue}/{max}
        </span>
      )}
    </div>
  );
}

// ❤️ Like/Dislike Interaction
export function LikeDislike({
  likes = 0,
  dislikes = 0,
  userVote,
  onVote,
  compact = false,
}: {
  likes?: number;
  dislikes?: number;
  userVote?: "like" | "dislike" | null;
  onVote?: (vote: "like" | "dislike" | null) => void;
  compact?: boolean;
}) {
  const [localLikes, setLocalLikes] = useState(likes);
  const [localDislikes, setLocalDislikes] = useState(dislikes);
  const [localVote, setLocalVote] = useState(userVote);

  const handleLike = () => {
    if (localVote === "like") {
      setLocalLikes((prev) => prev - 1);
      setLocalVote(null);
      onVote?.(null);
    } else {
      if (localVote === "dislike") {
        setLocalDislikes((prev) => prev - 1);
      }
      setLocalLikes((prev) => prev + 1);
      setLocalVote("like");
      onVote?.("like");
    }
  };

  const handleDislike = () => {
    if (localVote === "dislike") {
      setLocalDislikes((prev) => prev - 1);
      setLocalVote(null);
      onVote?.(null);
    } else {
      if (localVote === "like") {
        setLocalLikes((prev) => prev - 1);
      }
      setLocalDislikes((prev) => prev + 1);
      setLocalVote("dislike");
      onVote?.("dislike");
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleLike}
          className={`
            p-2 rounded-lg transition-all duration-200
            ${localVote === "like" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50"}
            hover:scale-110
          `}
        >
          <ThumbsUp className="w-4 h-4" />
        </button>
        <span className="text-sm text-slate-300">{localLikes}</span>
        
        <button
          onClick={handleDislike}
          className={`
            p-2 rounded-lg transition-all duration-200
            ${localVote === "dislike" ? "bg-red-500/20 text-red-400" : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50"}
            hover:scale-110
          `}
        >
          <ThumbsUp className="w-4 h-4 rotate-180" />
        </button>
        <span className="text-sm text-slate-300">{localDislikes}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleLike}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
          ${localVote === "like" ? "bg-emerald-500/20 border-emerald-500/30" : "bg-slate-800/50 border-slate-700/50"}
          border hover:scale-105
        `}
      >
        <ThumbsUp className={`w-5 h-5 ${localVote === "like" ? "text-emerald-400" : "text-slate-400"}`} />
        <span className={`font-medium ${localVote === "like" ? "text-emerald-400" : "text-slate-300"}`}>
          {localLikes}
        </span>
      </button>
      
      <button
        onClick={handleDislike}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
          ${localVote === "dislike" ? "bg-red-500/20 border-red-500/30" : "bg-slate-800/50 border-slate-700/50"}
          border hover:scale-105
        `}
      >
        <ThumbsUp className={`w-5 h-5 rotate-180 ${localVote === "dislike" ? "text-red-400" : "text-slate-400"}`} />
        <span className={`font-medium ${localVote === "dislike" ? "text-red-400" : "text-slate-300"}`}>
          {localDislikes}
        </span>
      </button>
    </div>
  );
}

// 🔥 Progress Interaction
export function InteractiveProgress({
  value,
  max = 100,
  onChange,
  showLabel = true,
  color = "blue",
  className = "",
}: {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  showLabel?: boolean;
  color?: "blue" | "green" | "purple" | "red";
  className?: string;
}) {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-emerald-500 to-emerald-600",
    purple: "from-purple-500 to-purple-600",
    red: "from-red-500 to-red-600",
  };

  const percentage = (localValue / max) * 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!onChange) return;
    
    setIsDragging(true);
    updateValue(e);
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      updateValue(moveEvent);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const updateValue = (e: MouseEvent | React.MouseEvent) => {
    if (!progressRef.current || !onChange) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    let newValue = Math.round((x / width) * max);
    newValue = Math.max(0, Math.min(max, newValue));
    
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {showLabel && (
        <div className="flex justify-between">
          <span className="text-sm text-slate-300">Progresso</span>
          <span className="text-sm font-medium text-white">{localValue}%</span>
        </div>
      )}
      
      <div
        ref={progressRef}
        className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden cursor-pointer group"
        onMouseDown={handleMouseDown}
      >
        <div
          className={`h-full bg-gradient-to-r ${colors[color]} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
        
        {/* Handle */}
        <div
          className={`
            absolute top-1/2 w-6 h-6 -translate-y-1/2 -translate-x-1/2
            bg-white rounded-full shadow-lg
            transition-all duration-200
            ${isDragging ? "scale-125 ring-4 ring-blue-500/30" : "scale-100"}
            ${onChange ? "cursor-grab active:cursor-grabbing" : "cursor-default"}
            group-hover:scale-110
          `}
          style={{ left: `${percentage}%` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
          </div>
        </div>
        
        {/* Hover indicator */}
        {onChange && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute top-1/2 h-1 -translate-y-1/2 bg-white/20 rounded-full left-0 right-0" />
          </div>
        )}
      </div>
      
      <div className="flex justify-between text-xs text-slate-500">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

// ✨ Toggle Switch with Animation
export function AnimatedToggle({
  checked = false,
  onChange,
  size = "md",
  label,
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  const [isChecked, setIsChecked] = useState(checked);

  const sizeClasses = {
    sm: "w-10 h-6",
    md: "w-12 h-7",
    lg: "w-14 h-8",
  };

  const handleClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-sm text-slate-300">{label}</span>
      )}
      
      <button
        type="button"
        onClick={handleToggle}
        className={`
          relative inline-flex items-center rounded-full
          transition-all duration-300
          ${sizeClasses[size]}
          ${isChecked ? "bg-emerald-500" : "bg-slate-700"}
          hover:scale-105
        `}
      >
        <span
          className={`
            absolute bg-white rounded-full shadow-lg
            transition-all duration-300
            ${handleClasses[size]}
            ${isChecked ? "translate-x-6" : "translate-x-1"}
          `}
        />
        
        {/* Icons */}
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2">
          <Check className={`w-3 h-3 ${isChecked ? "text-emerald-500" : "text-slate-500"}`} />
        </div>
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
          <X className={`w-3 h-3 ${isChecked ? "text-emerald-500" : "text-slate-500"}`} />
        </div>
      </button>
    </div>
  );
}

// 🎯 Hover Tooltip
export function Tooltip({
  children,
  text,
  position = "top",
  className = "",
}: {
  children: ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          className={`
            absolute z-50 px-3 py-2 text-sm
            bg-slate-900 text-white rounded-lg
            shadow-xl border border-slate-700
            whitespace-nowrap
            animate-scale-in
            ${positionClasses[position]}
          `}
        >
          {text}
          {/* Arrow */}
          <div
            className={`
              absolute w-2 h-2 bg-slate-900 transform rotate-45
              border border-slate-700
              ${
                position === "top" ? "top-full -translate-x-1/2 border-t-0 border-l-0" :
                position === "bottom" ? "bottom-full -translate-x-1/2 border-b-0 border-r-0" :
                position === "left" ? "left-full -translate-y-1/2 border-l-0 border-b-0" :
                "right-full -translate-y-1/2 border-r-0 border-t-0"
              }
            `}
          />
        </div>
      )}
    </div>
  );
}

// 🔄 Loading Spinner with Interaction
export function InteractiveSpinner({
  isLoading,
  onClick,
  children,
  className = "",
}: {
  isLoading: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative px-6 py-3 rounded-lg
        bg-gradient-to-r from-blue-600 to-purple-600
        text-white font-medium
        transition-all duration-300
        hover:from-blue-700 hover:to-purple-700
        hover:scale-105 hover:shadow-lg
        active:scale-95
        disabled:opacity-70 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Processando...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          {children}
          {isHovered && <Zap className="w-4 h-4 animate-pulse" />}
        </div>
      )}
      
      {/* Glow effect */}
      {isHovered && !isLoading && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse -z-10" />
      )}
    </button>
  );
}

// 🎭 Confetti Effect (simplified)
export function ConfettiEffect({
  trigger,
  count = 50,
}: {
  trigger: boolean;
  count?: number;
}) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: count }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][Math.floor(Math.random() * 5)],
      }));
      
      setParticles(newParticles);
      
      // Clear particles after animation
      setTimeout(() => {
        setParticles([]);
      }, 2000);
    }
  }, [trigger, count]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full animate-bounce-subtle"
          style={{
            left: `${particle.x}vw`,
            top: `${particle.y}vh`,
            backgroundColor: particle.color,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}