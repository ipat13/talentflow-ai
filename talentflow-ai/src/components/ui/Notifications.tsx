"use client";

import { ReactNode, useState, useEffect, createContext, useContext } from "react";
import { X, CheckCircle, AlertCircle, Info, Bell, AlertTriangle, Zap } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info" | "default";

interface Toast {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove toast after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  const typeConfig = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400",
      iconColor: "text-emerald-400",
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      textColor: "text-red-400",
      iconColor: "text-red-400",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400",
      iconColor: "text-amber-400",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
      iconColor: "text-blue-400",
    },
    default: {
      icon: Bell,
      bgColor: "bg-slate-500/10",
      borderColor: "border-slate-500/30",
      textColor: "text-slate-400",
      iconColor: "text-slate-400",
    },
  };

  const config = typeConfig[toast.type];
  const Icon = config.icon;

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(handleClose, toast.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  return (
    <div
      className={`
        relative overflow-hidden
        ${config.bgColor} ${config.borderColor}
        border rounded-xl p-4
        shadow-lg backdrop-blur-sm
        transition-all duration-300
        ${isExiting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"}
        animate-slide-up
      `}
    >
      {/* Progress bar */}
      {toast.duration !== 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-700/30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-progress"
            style={{ animationDuration: `${toast.duration || 5000}ms` }}
          />
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${config.bgColor}`}>
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className={`font-medium ${config.textColor} mb-1`}>
            {toast.title}
          </h4>
          {toast.message && (
            <p className="text-sm text-slate-300">{toast.message}</p>
          )}

          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                handleClose();
              }}
              className="mt-3 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        <button
          onClick={handleClose}
          className="p-1 hover:bg-slate-700/30 rounded-lg transition-colors"
          aria-label="Fechar notificação"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
}

// 🎯 Hook para notificações pré-definidas
export function useNotification() {
  const { addToast } = useToast();

  const success = (title: string, message?: string, options?: Partial<Toast>) => {
    addToast({
      title,
      message,
      type: "success",
      ...options,
    });
  };

  const error = (title: string, message?: string, options?: Partial<Toast>) => {
    addToast({
      title,
      message,
      type: "error",
      ...options,
    });
  };

  const warning = (title: string, message?: string, options?: Partial<Toast>) => {
    addToast({
      title,
      message,
      type: "warning",
      ...options,
    });
  };

  const info = (title: string, message?: string, options?: Partial<Toast>) => {
    addToast({
      title,
      message,
      type: "info",
      ...options,
    });
  };

  const custom = (toast: Omit<Toast, "id">) => {
    addToast(toast);
  };

  return { success, error, warning, info, custom };
}

// 🔔 Notification Bell Component
export function NotificationBell({
  count = 0,
  onClick,
  className = "",
}: {
  count?: number;
  onClick?: () => void;
  className?: string;
}) {
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setIsRinging(true);
      const timer = setTimeout(() => setIsRinging(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <button
      onClick={onClick}
      className={`
        relative p-2 rounded-lg
        bg-slate-800/50 hover:bg-slate-700/50
        border border-slate-700/50
        transition-all duration-200
        hover:scale-105
        ${className}
      `}
      aria-label={`Notificações (${count} novas)`}
    >
      <Bell className={`w-5 h-5 text-slate-300 ${isRinging ? "animate-bounce-subtle" : ""}`} />
      
      {count > 0 && (
        <>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">
              {count > 9 ? "9+" : count}
            </span>
          </span>
        </>
      )}
    </button>
  );
}

// 📱 Inline Notification
export function InlineNotification({
  type = "info",
  title,
  message,
  onClose,
  className = "",
}: {
  type?: ToastType;
  title: string;
  message?: string;
  onClose?: () => void;
  className?: string;
}) {
  const typeConfig = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400",
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      textColor: "text-red-400",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
    },
    default: {
      icon: Bell,
      bgColor: "bg-slate-500/10",
      borderColor: "border-slate-500/30",
      textColor: "text-slate-400",
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        ${config.bgColor} ${config.borderColor}
        border rounded-xl p-4
        animate-fade-in
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.textColor} mt-0.5`} />
        
        <div className="flex-1">
          <h4 className={`font-medium ${config.textColor} mb-1`}>
            {title}
          </h4>
          {message && (
            <p className="text-sm text-slate-300">{message}</p>
          )}
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700/30 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>
    </div>
  );
}

// ⚡ Notification with Action
export function ActionNotification({
  icon = Zap,
  title,
  message,
  primaryAction,
  secondaryAction,
  className = "",
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  message: string;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}) {
  const Icon = icon;

  return (
    <div
      className={`
        bg-gradient-to-br from-slate-800/50 to-slate-900/50
        border border-slate-700/50 rounded-xl p-5
        shadow-xl backdrop-blur-sm
        animate-scale-in
        ${className}
      `}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-slate-300 mb-4">{message}</p>
          
          <div className="flex gap-3">
            <button
              onClick={primaryAction.onClick}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105"
            >
              {primaryAction.label}
            </button>
            
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-lg font-medium hover:bg-slate-700/50 transition-colors"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 🎯 Notification Demo Component
export function NotificationDemo() {
  const { success, error, warning, info } = useNotification();

  const notifications = [
    {
      label: "Sucesso",
      onClick: () => success("Candidato adicionado", "João Silva foi adicionado com sucesso ao pipeline."),
      color: "bg-emerald-500",
    },
    {
      label: "Erro",
      onClick: () => error("Falha no upload", "Não foi possível fazer upload do CV. Tente novamente."),
      color: "bg-red-500",
    },
    {
      label: "Aviso",
      onClick: () => warning("Match baixo", "O candidato tem apenas 45% de match com os requisitos."),
      color: "bg-amber-500",
    },
    {
      label: "Informação",
      onClick: () => info("Análise completa", "DeepSeek AI concluiu a análise de 15 currículos."),
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Demonstração de Notificações</h3>
      <div className="grid grid-cols-2 gap-3">
        {notifications.map((notification) => (
          <button
            key={notification.label}
            onClick={notification.onClick}
            className={`
              px-4 py-3 rounded-lg text-white font-medium
              transition-all duration-200 hover:scale-105
              ${notification.color}
            `}
          >
            {notification.label}
          </button>
        ))}
      </div>
    </div>
  );
}