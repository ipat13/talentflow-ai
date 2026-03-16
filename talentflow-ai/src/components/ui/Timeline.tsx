"use client";

import { ReactNode, useState, ComponentType } from "react";
import { CheckCircle, Clock, AlertCircle, XCircle, Circle, ChevronRight, User, Briefcase, MessageSquare, FileText, Award } from "lucide-react";

type TimelineItemStatus = "completed" | "active" | "pending" | "warning" | "error";

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status: TimelineItemStatus;
  icon?: ReactNode | ComponentType<any>;
  metadata?: Record<string, any>;
}

interface TimelineProps {
  items: TimelineItem[];
  orientation?: "vertical" | "horizontal";
  showConnectors?: boolean;
  interactive?: boolean;
  onItemClick?: (item: TimelineItem) => void;
  className?: string;
}

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
  active: {
    icon: Clock,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    pulse: true,
  },
  pending: {
    icon: Circle,
    color: "text-slate-500",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/30",
  },
  warning: {
    icon: AlertCircle,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
  },
  error: {
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
  },
};

const defaultIcons = {
  candidate: User,
  job: Briefcase,
  interview: MessageSquare,
  document: FileText,
  assessment: Award,
};

export function Timeline({
  items,
  orientation = "vertical",
  showConnectors = true,
  interactive = true,
  onItemClick,
  className = "",
}: TimelineProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (item: TimelineItem) => {
    if (interactive) {
      setActiveItem(activeItem === item.id ? null : item.id);
      onItemClick?.(item);
    }
  };

  if (orientation === "horizontal") {
    return (
      <div className={`flex items-center ${className}`}>
        {items.map((item, index) => {
          const config = statusConfig[item.status];
          const Icon = item.icon || config.icon;
          const isActive = activeItem === item.id;
          const isLast = index === items.length - 1;

          return (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleItemClick(item)}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 ${config.borderColor} ${config.bgColor} transition-all duration-300 ${interactive ? "hover:scale-110 hover:shadow-lg cursor-pointer" : "cursor-default"} ${isActive ? "ring-4 ring-offset-2 ring-offset-slate-900 ring-blue-500/50" : ""}`}
                 >
                   {typeof Icon === 'function' ? (
                      <Icon className={`w-6 h-6 ${config.color} ${'pulse' in config && config.pulse ? "animate-pulse" : ""}`} />
                    ) : (
                      <div className={`w-6 h-6 ${config.color} ${'pulse' in config && config.pulse ? "animate-pulse" : ""}`}>
                       {Icon}
                     </div>
                   )}
                   
                   {item.status === "active" && (
                    <div className="absolute -top-1 -right-1">
                      <div className="relative">
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full animate-ping" />
                        <div className="relative w-3 h-3 bg-blue-500 rounded-full" />
                      </div>
                    </div>
                  )}
                </button>

                <div className="mt-3 text-center max-w-[120px]">
                  <div className={`text-sm font-medium ${isActive ? "text-white" : "text-slate-300"}`}>
                    {item.title}
                  </div>
                  {item.date && (
                    <div className="text-xs text-slate-500 mt-1">{item.date}</div>
                  )}
                </div>
              </div>

              {showConnectors && !isLast && (
                <div className="w-16 h-0.5 bg-gradient-to-r from-slate-700 to-slate-600 mx-2" />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Vertical Timeline
  return (
    <div className={`relative ${className}`}>
      {showConnectors && (
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700" />
      )}

      <div className="space-y-8">
        {items.map((item, index) => {
          const config = statusConfig[item.status];
          const Icon = item.icon || config.icon;
          const isActive = activeItem === item.id;
          const isLast = index === items.length - 1;

          return (
            <div key={item.id} className="relative">
              {/* Connector dot */}
              {showConnectors && !isLast && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-slate-600 to-slate-700" />
              )}

              <div className="flex gap-4">
                {/* Icon/Status indicator */}
                <div className="relative flex-shrink-0">
                  <div className="relative">
                    <button
                      onClick={() => handleItemClick(item)}
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${config.borderColor} ${config.bgColor} transition-all duration-300 ${interactive ? "hover:scale-110 hover:shadow-lg cursor-pointer" : "cursor-default"} ${isActive ? "ring-4 ring-offset-2 ring-offset-slate-900 ring-blue-500/50" : ""}`}
                    >
                   {typeof Icon === 'function' ? (
                     <Icon className={`w-6 h-6 ${config.color} ${'pulse' in config && config.pulse ? "animate-pulse" : ""}`} />
                   ) : (
                     <div className={`w-6 h-6 ${config.color} ${'pulse' in config && config.pulse ? "animate-pulse" : ""}`}>
                       {Icon}
                     </div>
                   )}
                    </button>

                    {item.status === "active" && (
                      <div className="absolute -top-1 -right-1">
                        <div className="relative">
                          <div className="absolute w-3 h-3 bg-blue-500 rounded-full animate-ping" />
                          <div className="relative w-3 h-3 bg-blue-500 rounded-full" />
                        </div>
                      </div>
                    )}
                  </div>

                  {item.date && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-slate-500">
                      {item.date}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div 
                    className={`p-4 rounded-xl border transition-all duration-300 ${isActive ? "bg-slate-800/50 border-slate-600 shadow-lg" : "bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/40"}`}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-medium ${isActive ? "text-white" : "text-slate-300"}`}>
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                        )}
                      </div>
                      
                      {interactive && (
                        <ChevronRight className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isActive ? "rotate-90" : ""}`} />
                      )}
                    </div>

                    {/* Metadata */}
                    {item.metadata && Object.keys(item.metadata).length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-700/50">
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(item.metadata).map(([key, value]) => (
                            <div key={key} className="text-xs px-2 py-1 bg-slate-700/50 rounded">
                              <span className="text-slate-400">{key}:</span>{" "}
                              <span className="text-slate-300">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expanded content */}
                  {isActive && item.metadata?.details && (
                    <div className="mt-2 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 animate-fade-in">
                      <div className="text-sm text-slate-400">{item.metadata.details}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 📊 Timeline para Processo de Recrutamento
export function RecruitmentTimeline({
  candidateId,
  className = "",
}: {
  candidateId?: string;
  className?: string;
}) {
  const recruitmentSteps: TimelineItem[] = [
    {
      id: "1",
      title: "Candidatura Recebida",
      description: "CV submetido para análise",
      status: "completed",
      icon: defaultIcons.candidate,
      date: "15 Mar",
      metadata: { source: "LinkedIn", score: "85%" },
    },
    {
      id: "2",
      title: "Análise Inicial",
      description: "Análise automática pelo DeepSeek AI",
      status: "completed",
      icon: defaultIcons.assessment,
      date: "16 Mar",
      metadata: { match: "92%", skills: "React, TypeScript, Node.js" },
    },
    {
      id: "3",
      title: "Triagem Humana",
      description: "Revisão pelo recrutador",
      status: "active",
      icon: defaultIcons.document,
      date: "Hoje",
      metadata: { reviewer: "Ana Silva", status: "Em análise" },
    },
    {
      id: "4",
      title: "Entrevista Técnica",
      description: "Agendamento pendente",
      status: "pending",
      icon: defaultIcons.interview,
      date: "Próxima semana",
      metadata: { duration: "60min", type: "Remota" },
    },
    {
      id: "5",
      title: "Avaliação Final",
      description: "Decisão de contratação",
      status: "pending",
      icon: defaultIcons.job,
      date: "A definir",
      metadata: { decision: "Pendente" },
    },
  ];

  return <Timeline items={recruitmentSteps} className={className} />;
}

// 📈 Timeline com Progresso
export function ProgressTimeline({
  currentStep,
  steps,
  className = "",
}: {
  currentStep: number;
  steps: { title: string; description?: string }[];
  className?: string;
}) {
  const timelineItems: TimelineItem[] = steps.map((step, index) => {
    const stepNumber = index + 1;
    let status: TimelineItemStatus = "pending";
    
    if (stepNumber < currentStep) status = "completed";
    else if (stepNumber === currentStep) status = "active";
    else if (stepNumber > currentStep) status = "pending";

    return {
      id: `step-${stepNumber}`,
      title: step.title,
      description: step.description,
      status,
      metadata: { step: stepNumber },
    };
  });

  return (
    <div className={className}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">Progresso do Processo</h3>
          <div className="text-sm text-slate-400">
            Passo {currentStep} de {steps.length}
          </div>
        </div>
        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
      
      <Timeline items={timelineItems} />
    </div>
  );
}

// 🎯 Timeline Compacta para Dashboard
export function CompactTimeline({
  items,
  limit = 3,
  className = "",
}: {
  items: TimelineItem[];
  limit?: number;
  className?: string;
}) {
  const displayedItems = items.slice(0, limit);
  const hasMore = items.length > limit;

  return (
    <div className={className}>
      <div className="space-y-3">
        {displayedItems.map((item) => {
          const config = statusConfig[item.status];
          const Icon = item.icon || config.icon;

          return (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/40 transition-colors"
            >
              <div className={`p-2 rounded-lg ${config.bgColor}`}>
                 {typeof Icon === 'function' ? (
                   <Icon className={`w-4 h-4 ${config.color}`} />
                 ) : (
                   <div className={`w-4 h-4 ${config.color}`}>
                     {Icon}
                   </div>
                 )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {item.title}
                </div>
                {item.description && (
                  <div className="text-xs text-slate-400 truncate">
                    {item.description}
                  </div>
                )}
              </div>
              {item.date && (
                <div className="text-xs text-slate-500 whitespace-nowrap">
                  {item.date}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-4 text-center">
          <div className="text-sm text-slate-400">
            +{items.length - limit} mais atividades
          </div>
        </div>
      )}
    </div>
  );
}

// 📊 Timeline com Estatísticas
export function StatsTimeline({
  items,
  className = "",
}: {
  items: TimelineItem[];
  className?: string;
}) {
  const stats = {
    completed: items.filter(item => item.status === "completed").length,
    active: items.filter(item => item.status === "active").length,
    pending: items.filter(item => item.status === "pending").length,
    total: items.length,
  };

  const completionRate = Math.round((stats.completed / stats.total) * 100);

  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <div className="text-2xl font-bold text-emerald-400">{stats.completed}</div>
          <div className="text-sm text-slate-400">Concluídos</div>
        </div>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="text-2xl font-bold text-blue-400">{stats.active}</div>
          <div className="text-sm text-slate-400">Ativos</div>
        </div>
        <div className="p-4 bg-slate-500/10 border border-slate-500/20 rounded-xl">
          <div className="text-2xl font-bold text-slate-400">{stats.pending}</div>
          <div className="text-sm text-slate-400">Pendentes</div>
        </div>
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
          <div className="text-2xl font-bold text-purple-400">{completionRate}%</div>
          <div className="text-sm text-slate-400">Taxa Conclusão</div>
        </div>
      </div>

      <Timeline items={items} />
    </div>
  );
}