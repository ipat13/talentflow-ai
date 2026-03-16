"use client";

interface EnhancedLoadingProps {
  type?: "spinner" | "dots" | "pulse" | "skeleton";
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export function EnhancedLoading({
  type = "spinner",
  size = "md",
  text,
  fullScreen = false,
  className = "",
}: EnhancedLoadingProps) {
  const sizeStyles = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const Spinner = () => (
    <div className="relative">
      <div className={`${sizeStyles[size]} border-2 border-slate-200 dark:border-slate-700 rounded-full`} />
      <div
        className={`${sizeStyles[size]} border-2 border-indigo-500 border-t-transparent dark:border-indigo-400 dark:border-t-transparent rounded-full absolute top-0 left-0 animate-spin`}
      />
    </div>
  );

  const Dots = () => (
    <div className="flex items-center justify-center space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : "w-3 h-3"} bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const Pulse = () => (
    <div className="relative">
      <div
        className={`${sizeStyles[size]} bg-indigo-500 dark:bg-indigo-400 rounded-full animate-ping opacity-75`}
      />
      <div
        className={`${sizeStyles[size]} bg-indigo-600 dark:bg-indigo-500 rounded-full absolute top-0 left-0`}
      />
    </div>
  );

  const SkeletonCard = () => (
    <div className="space-y-3">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded skeleton" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded skeleton w-5/6" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded skeleton w-4/6" />
    </div>
  );

  const Loader = () => {
    switch (type) {
      case "dots":
        return <Dots />;
      case "pulse":
        return <Pulse />;
      case "skeleton":
        return <SkeletonCard />;
      default:
        return <Spinner />;
    }
  };

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader />
      {text && (
        <p className="text-sm text-slate-600 dark:text-slate-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

// Page loading with gradient background
export function PageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-float">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded" />
            </div>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-3xl blur-xl animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            TalentFlow AI
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Carregando plataforma inteligente...
          </p>
        </div>
        
        <EnhancedLoading type="dots" size="md" />
      </div>
    </div>
  );
}

// Content loading with skeleton
export function ContentLoading({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-4 animate-fade-in">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded skeleton" style={{ width: `${80 - i * 10}%` }} />
        </div>
      ))}
    </div>
  );
}

// Table row loading
export function TableRowLoading({ columns = 4 }: { columns?: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded skeleton" />
        </td>
      ))}
    </tr>
  );
}