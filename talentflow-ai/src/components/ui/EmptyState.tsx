"use client";

import { ReactNode } from "react";
import { 
  Users, 
  Briefcase, 
  FileText, 
  Search, 
  Upload, 
  Plus, 
  Sparkles,
  FolderOpen,
  BarChart3,
  MessageSquare,
  Award,
  Zap,
  Target,
  LucideIcon
} from "lucide-react";
import { EnhancedButton } from "./EnhancedButton";

type EmptyStateVariant = "default" | "success" | "warning" | "info" | "premium";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  variant?: EmptyStateVariant;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  illustration?: boolean;
  className?: string;
}

const variantConfig = {
  default: {
    iconBg: "bg-slate-100 dark:bg-slate-800",
    iconColor: "text-slate-600 dark:text-slate-400",
    titleColor: "text-slate-900 dark:text-white",
    descColor: "text-slate-600 dark:text-slate-400",
  },
  success: {
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    titleColor: "text-emerald-900 dark:text-emerald-300",
    descColor: "text-emerald-700/80 dark:text-emerald-400/80",
  },
  warning: {
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    titleColor: "text-amber-900 dark:text-amber-300",
    descColor: "text-amber-700/80 dark:text-amber-400/80",
  },
  info: {
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleColor: "text-blue-900 dark:text-blue-300",
    descColor: "text-blue-700/80 dark:text-blue-400/80",
  },
  premium: {
    iconBg: "bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30",
    iconColor: "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600",
    titleColor: "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600",
    descColor: "text-purple-700/80 dark:text-purple-400/80",
  },
};

export function EmptyState({
  title,
  description,
  icon,
  variant = "default",
  action,
  secondaryAction,
  illustration = false,
  className = "",
}: EmptyStateProps) {
  const config = variantConfig[variant];

  const defaultIcons = {
    default: <FolderOpen className="w-8 h-8" />,
    success: <Award className="w-8 h-8" />,
    warning: <Search className="w-8 h-8" />,
    info: <MessageSquare className="w-8 h-8" />,
    premium: <Zap className="w-8 h-8" />,
  };

  const displayIcon = icon || defaultIcons[variant];

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      {illustration && (
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
              <div className={`p-4 rounded-full ${config.iconBg}`}>
                <div className={config.iconColor}>
                  {displayIcon}
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 animate-pulse" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 animate-pulse delay-300" />
        </div>
      )}
      
      {!illustration && (
        <div className={`p-4 rounded-2xl ${config.iconBg} mb-4`}>
          <div className={config.iconColor}>
            {displayIcon}
          </div>
        </div>
      )}
      
      <div className="space-y-3 max-w-md">
        <h3 className={`text-xl font-semibold ${config.titleColor}`}>
          {title}
        </h3>
        
        <p className={`text-sm ${config.descColor}`}>
          {description}
        </p>
      </div>
      
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          {action && (
            <EnhancedButton
              onClick={action.onClick}
              icon={action.icon}
              variant={variant === "premium" ? "primary" : "secondary"}
              gradient={variant === "premium"}
            >
              {action.label}
            </EnhancedButton>
          )}
          
          {secondaryAction && (
            <EnhancedButton
              onClick={secondaryAction.onClick}
              variant="outline"
            >
              {secondaryAction.label}
            </EnhancedButton>
          )}
        </div>
      )}
    </div>
  );
}

// Predefined empty states for common scenarios
export function NoCandidatesEmptyState({ onAddCandidate }: { onAddCandidate: () => void }) {
  return (
    <EmptyState
      title="Nenhum Candidato Encontrado"
      description="Comece adicionando candidatos através de upload de CV, importação do LinkedIn ou criação manual."
      icon={<Users className="w-8 h-8" />}
      variant="info"
      action={{
        label: "Adicionar Candidato",
        onClick: onAddCandidate,
        icon: Plus,
      }}
      illustration
    />
  );
}

export function NoJobsEmptyState({ onCreateJob }: { onCreateJob: () => void }) {
  return (
    <EmptyState
      title="Nenhuma Vaga Criada"
      description="Crie sua primeira vaga para começar a receber candidaturas e usar o matching inteligente."
      icon={<Briefcase className="w-8 h-8" />}
      variant="warning"
      action={{
        label: "Criar Vaga",
        onClick: onCreateJob,
        icon: Sparkles,
      }}
      illustration
    />
  );
}

export function NoMatchesEmptyState({ onSearch }: { onSearch: () => void }) {
  return (
    <EmptyState
      title="Nenhum Match Encontrado"
      description="Ajuste os critérios da vaga ou adicione mais candidatos para encontrar matches perfeitos."
      icon={<Target className="w-8 h-8" />}
      variant="default"
      action={{
        label: "Ajustar Critérios",
        onClick: onSearch,
        icon: Search,
      }}
      secondaryAction={{
        label: "Ver Todos Candidatos",
        onClick: () => window.location.href = "/candidates",
      }}
      illustration
    />
  );
}

export function NoDataEmptyState({ 
  title = "Sem Dados Disponíveis",
  description = "Os dados serão exibidos assim que houver atividade no sistema.",
  onRefresh,
}: { 
  title?: string;
  description?: string;
  onRefresh?: () => void;
}) {
  return (
    <EmptyState
      title={title}
      description={description}
      icon={<BarChart3 className="w-8 h-8" />}
      variant="info"
      action={onRefresh ? {
        label: "Atualizar Dados",
        onClick: onRefresh,
        icon: Sparkles,
      } : undefined}
      illustration
    />
  );
}

export function UploadCVEmptyState({ onUpload }: { onUpload: () => void }) {
  return (
    <EmptyState
      title="Nenhum CV Carregado"
      description="Faça upload de currículos em PDF para análise automática pela IA."
      icon={<FileText className="w-8 h-8" />}
      variant="success"
      action={{
        label: "Upload de CV",
        onClick: onUpload,
        icon: Upload,
      }}
      illustration
    />
  );
}

// Loading empty state (skeleton)
export function LoadingEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="w-24 h-24 rounded-full skeleton" />
      <div className="space-y-2">
        <div className="h-4 w-48 skeleton rounded" />
        <div className="h-3 w-64 skeleton rounded" />
        <div className="h-3 w-56 skeleton rounded" />
      </div>
      <div className="flex gap-3 mt-4">
        <div className="h-10 w-32 skeleton rounded-xl" />
        <div className="h-10 w-28 skeleton rounded-xl" />
      </div>
    </div>
  );
}