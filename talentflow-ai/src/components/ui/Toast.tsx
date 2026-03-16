"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle,
  Upload,
  Download,
  UserCheck,
  Sparkles,
  Bell,
  UserPlus,
  FileText,
  Linkedin
} from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info" | "custom";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  custom: (title: string, message?: string, icon?: ReactNode) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Predefined toast templates for common actions
export const toastTemplates = {
  candidateAdded: (name: string) => ({
    title: "Candidato Adicionado",
    message: `${name} foi adicionado com sucesso`,
    type: "success" as const,
    icon: <UserCheck className="w-5 h-5" />,
  }),
  cvUploaded: (filename: string) => ({
    title: "CV Processado",
    message: `${filename} foi analisado pela IA`,
    type: "success" as const,
    icon: <Upload className="w-5 h-5" />,
  }),
  jobCreated: (title: string) => ({
    title: "Vaga Criada",
    message: `${title} está agora ativa`,
    type: "success" as const,
    icon: <Sparkles className="w-5 h-5" />,
  }),
  matchCompleted: (count: number) => ({
    title: "Matching Concluído",
    message: `${count} candidatos encontrados`,
    type: "info" as const,
    icon: <Sparkles className="w-5 h-5" />,
  }),
  exportReady: () => ({
    title: "Exportação Pronta",
    message: "Seu relatório está disponível para download",
    type: "info" as const,
    icon: <Download className="w-5 h-5" />,
    action: {
      label: "Download",
      onClick: () => window.open("/api/export", "_blank"),
    },
  }),
  linkedinImported: (name: string) => ({
    title: "Perfil Importado",
    message: `${name} importado do LinkedIn`,
    type: "success" as const,
    icon: <Linkedin className="w-5 h-5" />,
  }),
  analysisComplete: () => ({
    title: "Análise Concluída",
    message: "A IA completou a análise do candidato",
    type: "info" as const,
    icon: <FileText className="w-5 h-5" />,
  }),
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts((prev) => {
      const updated = [newToast, ...prev].slice(0, 5); // Max 5 toasts
      return updated;
    });

    if (toast.duration !== 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, toast.duration || 5000);
    }
  }, []);

  const success = useCallback((title: string, message?: string) => {
    showToast({ 
      type: "success", 
      title, 
      message, 
      icon: <CheckCircle className="w-5 h-5" /> 
    });
  }, [showToast]);

  const error = useCallback((title: string, message?: string) => {
    showToast({ 
      type: "error", 
      title, 
      message, 
      icon: <AlertCircle className="w-5 h-5" /> 
    });
  }, [showToast]);

  const warning = useCallback((title: string, message?: string) => {
    showToast({ 
      type: "warning", 
      title, 
      message, 
      icon: <AlertTriangle className="w-5 h-5" /> 
    });
  }, [showToast]);

  const info = useCallback((title: string, message?: string) => {
    showToast({ 
      type: "info", 
      title, 
      message, 
      icon: <Info className="w-5 h-5" /> 
    });
  }, [showToast]);

  const custom = useCallback((title: string, message?: string, icon?: ReactNode) => {
    showToast({ 
      type: "custom", 
      title, 
      message, 
      icon: icon || <Bell className="w-5 h-5" />
    });
  }, [showToast]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getIcon = (toast: Toast) => {
    if (toast.icon) return toast.icon;
    
    switch (toast.type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      case "custom":
        return <Bell className="w-5 h-5" />;
    }
  };

  const getStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300";
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300";
      case "warning":
        return "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300";
      case "info":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300";
      case "custom":
        return "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300";
    }
  };

  const getIconBg = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-emerald-100 dark:bg-emerald-900/40";
      case "error":
        return "bg-red-100 dark:bg-red-900/40";
      case "warning":
        return "bg-amber-100 dark:bg-amber-900/40";
      case "info":
        return "bg-blue-100 dark:bg-blue-900/40";
      case "custom":
        return "bg-indigo-100 dark:bg-indigo-900/40";
    }
  };

  const clearAll = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info, custom }}>
      {children}
      <div className="fixed top-4 right-4 z-[120] space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              relative flex items-start gap-3 p-4 rounded-xl border shadow-lg
              ${getStyles(toast.type)}
              backdrop-blur-sm animate-slide-in-right
              max-w-sm w-full
            `}
            role="alert"
            aria-live="assertive"
          >
            <div className="flex-shrink-0 mt-0.5">
              <div className={`p-2 rounded-lg ${getIconBg(toast.type)}`}>
                {getIcon(toast)}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm mb-1">{toast.title}</h4>
              {toast.message && (
                <p className="text-sm opacity-90">{toast.message}</p>
              )}
              {toast.action && (
                <button
                  onClick={toast.action.onClick}
                  className="mt-2 text-sm font-medium hover:underline"
                >
                  {toast.action.label}
                </button>
              )}
            </div>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Progress bar */}
            {toast.duration !== 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-current/10 rounded-b-xl overflow-hidden">
                <div className="h-full bg-current/30 animate-toast-progress" />
              </div>
            )}
          </div>
        ))}
        
        {toasts.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-auto block"
          >
            Limpar todas ({toasts.length})
          </button>
        )}
      </div>
    </ToastContext.Provider>
  );
}
