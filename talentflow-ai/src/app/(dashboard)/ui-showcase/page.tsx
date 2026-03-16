"use client";

import { useState } from "react";

export const dynamic = 'force-dynamic';
import {
  // Toast
  useToast,
  toastTemplates,
  // Tooltip
  Tooltip,
  InfoTooltip,
  HelpTooltip,
  PremiumTooltip,
  MatchScoreTooltip,
  TextWithTooltip,
  // Empty States
  NoCandidatesEmptyState,
  NoJobsEmptyState,
  NoMatchesEmptyState,
  NoDataEmptyState,
  UploadCVEmptyState,
  LoadingEmptyState,
  // Progress
  ProgressBar,
  CircularProgress,
  Stepper,
  MultiStepProgress,
  // Enhanced Components
  EnhancedCard,
  EnhancedButton,
  GradientButton,
  EnhancedBadge,
  StatsCard,
} from "@/components/ui";

import { 
  Users,
  Briefcase,
  Upload,
  Plus,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  Download,
  Zap,
  Target,
  BarChart3,
  FileText,
  Search,
} from "lucide-react";

export default function UIShowcasePage() {
  const toast = useToast();
  const [progress, setProgress] = useState(45);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: "1",
      label: "Informações",
      description: "Detalhes da vaga",
      status: "completed" as const,
    },
    {
      id: "2",
      label: "Requisitos",
      description: "Competências necessárias",
      status: "current" as const,
    },
    {
      id: "3",
      label: "Descrição",
      description: "Gerada por IA",
      status: "pending" as const,
    },
    {
      id: "4",
      label: "Publicar",
      description: "Tornar vaga ativa",
      status: "pending" as const,
    },
  ];

  const multiSteps = ["Informações", "Requisitos", "Descrição", "Revisão", "Publicar"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-in-down">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Showcase de Componentes UI
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Todos os componentes visuais aprimorados do TalentFlow AI
          </p>
        </div>

        {/* Toast Notifications Section */}
        <section className="mb-12 animate-fade-in">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Notificações (Toast)
          </h2>
          
          <EnhancedCard className="mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Testar Notificações
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Clique nos botões para ver diferentes tipos de notificações
              </p>
              
              <div className="flex flex-wrap gap-3">
                <EnhancedButton
                  onClick={() => toast.success("Sucesso!", "Operação concluída com sucesso")}
                  variant="primary"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Sucesso
                </EnhancedButton>
                
                <EnhancedButton
                  onClick={() => toast.error("Erro!", "Ocorreu um erro na operação")}
                  variant="danger"
                >
                  Erro
                </EnhancedButton>
                
                <EnhancedButton
                  onClick={() => toast.warning("Aviso!", "Esta ação requer atenção")}
                  variant="primary"
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Aviso
                </EnhancedButton>
                
                <EnhancedButton
                  onClick={() => toast.info("Informação", "Detalhes adicionais disponíveis")}
                  variant="primary"
                >
                  Informação
                </EnhancedButton>
              </div>
              
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h4 className="font-medium text-slate-900 dark:text-white mb-3">
                  Templates Pré-definidos
                </h4>
                <div className="flex flex-wrap gap-3">
                  <EnhancedButton
                    onClick={() => toast.showToast(toastTemplates.candidateAdded("João Silva"))}
                    variant="outline"
                  >
                    Candidato Adicionado
                  </EnhancedButton>
                  
                  <EnhancedButton
                    onClick={() => toast.showToast(toastTemplates.cvUploaded("curriculo.pdf"))}
                    variant="outline"
                  >
                    CV Processado
                  </EnhancedButton>
                  
                  <EnhancedButton
                    onClick={() => toast.showToast(toastTemplates.jobCreated("Frontend Developer"))}
                    variant="outline"
                  >
                    Vaga Criada
                  </EnhancedButton>
                  
                  <EnhancedButton
                    onClick={() => toast.showToast(toastTemplates.matchCompleted(12))}
                    variant="outline"
                  >
                    Matching Concluído
                  </EnhancedButton>
                </div>
              </div>
            </div>
          </EnhancedCard>
        </section>

        {/* Tooltips Section */}
        <section className="mb-12 animate-fade-in">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Tooltips
          </h2>
          
          <EnhancedCard className="mb-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Tipos de Tooltip
                </h3>
                <div className="flex flex-wrap items-center gap-6">
                  <InfoTooltip content="Informação adicional sobre este elemento" />
                  <HelpTooltip content="Precisa de ajuda? Clique aqui para mais informações" />
                  <PremiumTooltip content="Recurso disponível apenas na versão Premium" />
                  
                  <Tooltip
                    content="Tooltip personalizado com ícone customizado"
                    icon={<Zap className="w-4 h-4" />}
                  >
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium cursor-help">
                      <Zap className="w-3 h-3" />
                      Custom
                    </span>
                  </Tooltip>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Tooltips em Texto
                </h3>
                <div className="space-y-2">
                  <p className="text-slate-700 dark:text-slate-300">
                    O <TextWithTooltip text="matching inteligente" tooltip="Sistema de correspondência entre candidatos e vagas usando IA" /> 
                    analisa automaticamente os currículos e encontra os candidatos mais adequados para cada vaga.
                  </p>
                  
                  <p className="text-slate-700 dark:text-slate-300">
                    A <TextWithTooltip 
                      text="análise de CV" 
                      tooltip="Processamento de currículos em PDF para extração de informações como experiência, educação e habilidades"
                      variant="success"
                    /> é feita em segundos usando tecnologia de IA avançada.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Tooltip de Score
                </h3>
                <div className="flex flex-wrap items-center gap-6">
                  <MatchScoreTooltip
                    score={92}
                    details="Excelente correspondência com os requisitos da vaga. Experiência relevante e habilidades técnicas alinhadas."
                  />
                  
                  <MatchScoreTooltip
                    score={78}
                    details="Boa correspondência. Algumas habilidades estão alinhadas, mas falta experiência em áreas específicas."
                  />
                  
                  <MatchScoreTooltip
                    score={45}
                    details="Correspondência moderada. Habilidades básicas presentes, mas falta experiência relevante."
                  />
                </div>
              </div>
            </div>
          </EnhancedCard>
        </section>

        {/* Empty States Section */}
        <section className="mb-12 animate-fade-in">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Estados Vazios (Empty States)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EnhancedCard>
              <NoCandidatesEmptyState onAddCandidate={() => toast.info("Adicionar Candidato", "Funcionalidade em desenvolvimento")} />
            </EnhancedCard>
            
            <EnhancedCard>
              <NoJobsEmptyState onCreateJob={() => toast.info("Criar Vaga", "Funcionalidade em desenvolvimento")} />
            </EnhancedCard>
            
            <EnhancedCard>
              <NoMatchesEmptyState onSearch={() => toast.info("Buscar Matches", "Funcionalidade em desenvolvimento")} />
            </EnhancedCard>
            
            <EnhancedCard>
              <NoDataEmptyState onRefresh={() => toast.info("Atualizar", "Dados atualizados")} />
            </EnhancedCard>
            
            <EnhancedCard>
              <UploadCVEmptyState onUpload={() => toast.info("Upload CV", "Funcionalidade em desenvolvimento")} />
            </EnhancedCard>
            
            <EnhancedCard>
              <LoadingEmptyState />
            </EnhancedCard>
          </div>
        </section>

        {/* Progress Indicators Section */}
        <section className="mb-12 animate-fade-in">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Indicadores de Progresso
          </h2>
          
          <div className="space-y-8">
            <EnhancedCard>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Progress Bars
                  </h3>
                  <div className="space-y-6">
                    <ProgressBar value={progress} variant="default" label="Progresso Padrão" />
                    <ProgressBar value={65} variant="success" label="Sucesso" />
                    <ProgressBar value={35} variant="warning" label="Aviso" striped />
                    <ProgressBar value={85} variant="premium" label="Premium" animated />
                    
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900 dark:text-white">
                          Controle Interativo
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {progress}%
                        </span>
                      </div>
                      <ProgressBar value={progress} />
                      <div className="flex gap-2 mt-3">
                        <EnhancedButton
                          size="sm"
                          onClick={() => setProgress(Math.max(0, progress - 10))}
                        >
                          -10%
                        </EnhancedButton>
                        <EnhancedButton
                          size="sm"
                          onClick={() => setProgress(Math.min(100, progress + 10))}
                        >
                          +10%
                        </EnhancedButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </EnhancedCard>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EnhancedCard>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Progresso Circular
                </h3>
                <div className="flex flex-wrap gap-6 justify-center">
                  <div className="text-center">
                    <CircularProgress value={75} variant="default" />
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Padrão</p>
                  </div>
                  <div className="text-center">
                    <CircularProgress value={90} variant="success" />
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Sucesso</p>
                  </div>
                  <div className="text-center">
                    <CircularProgress value={45} variant="warning" />
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Aviso</p>
                  </div>
                  <div className="text-center">
                    <CircularProgress value={60} variant="premium" />
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Premium</p>
                  </div>
                </div>
              </EnhancedCard>
              
              <EnhancedCard>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Stepper Horizontal
                </h3>
                <Stepper steps={steps} currentStep={currentStep} variant="default" />
                <div className="flex gap-2 mt-4">
                  <EnhancedButton
                    size="sm"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Anterior
                  </EnhancedButton>
                  <EnhancedButton
                    size="sm"
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    disabled={currentStep === steps.length - 1}
                  >
                    Próximo
                  </EnhancedButton>
                </div>
              </EnhancedCard>
            </div>
            
            <EnhancedCard>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Progresso Multi-etapas
              </h3>
                <MultiStepProgress steps={multiSteps} currentStep={currentStep} variant="default" />
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                Etapa atual: {multiSteps[currentStep]}
              </p>
            </EnhancedCard>
          </div>
        </section>

        {/* Integration Example */}
        <section className="animate-fade-in">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Exemplo de Integração
          </h2>
          
          <EnhancedCard gradientBorder className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full -translate-y-32 translate-x-32" />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Processo de Recrutamento
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Exemplo completo usando múltiplos componentes
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <InfoTooltip content="Este é um exemplo de como os componentes trabalham juntos" />
                  <EnhancedBadge variant="success" pulse>
                    Ativo
                  </EnhancedBadge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <StatsCard
                  title="Candidatos em Processo"
                  value="24"
                  change="+8%"
                  icon={Users}
                  trend="up"
                />
                
                <StatsCard
                  title="Taxa de Conversão"
                  value="68%"
                  change="+12%"
                  icon={BarChart3}
                  trend="up"
                />
                
                <StatsCard
                  title="Tempo Médio"
                  value="14 dias"
                  change="-3 dias"
                  icon={Clock}
                  trend="down"
                />
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Progresso do Processo Atual
                    </h4>
                    <TextWithTooltip 
                      text="65% completo" 
                      tooltip="O processo está 65% completo. Restam 3 etapas para finalizar."
                      variant="info"
                    />
                  </div>
                  <ProgressBar value={65} variant="default" animated />
                </div>
                
                <Stepper 
                  steps={[
                    {
                      id: "1",
                      label: "Triagem",
                      description: "Análise inicial de CVs",
                      status: "completed",
                      icon: <FileText className="w-5 h-5" />,
                    },
                    {
                      id: "2",
                      label: "Entrevista",
                      description: "Entrevista técnica",
                      status: "current",
                      icon: <Users className="w-5 h-5" />,
                    },
                    {
                      id: "3",
                      label: "Avaliação",
                      description: "Testes práticos",
                      status: "pending",
                      icon: <Target className="w-5 h-5" />,
                    },
                    {
                      id: "4",
                      label: "Decisão",
                      description: "Contratação",
                      status: "pending",
                      icon: <CheckCircle className="w-5 h-5" />,
                    },
                  ]}
                  currentStep={1}
                  variant="default"
                />
                
                <div className="flex gap-3 pt-4">
                  <GradientButton
                    onClick={() => toast.success("Processo Avançado", "Próxima etapa iniciada com sucesso")}
                    icon={Sparkles}
                  >
                    Avançar Etapa
                  </GradientButton>
                  
                  <EnhancedButton
                    variant="outline"
                    onClick={() => toast.warning("Processo Pausado", "O processo foi pausado temporariamente")}
                  >
                    Pausar
                  </EnhancedButton>
                  
                  <EnhancedButton
                    variant="ghost"
                    onClick={() => {
                      toast.error("Processo Cancelado", "O processo de recrutamento foi cancelado");
                      setTimeout(() => {
                        toast.info("Ação Revertida", "O cancelamento foi revertido");
                      }, 2000);
                    }}
                  >
                    Cancelar
                  </EnhancedButton>
                </div>
              </div>
            </div>
          </EnhancedCard>
        </section>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700/50">
          <EnhancedCard className="text-center">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Sistema de Design Completo
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Todos os componentes são totalmente responsivos, acessíveis e com suporte a temas claro/escuro
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <EnhancedBadge variant="primary" gradient>
                  Toast Notifications
                </EnhancedBadge>
                <EnhancedBadge variant="secondary">
                  Tooltips
                </EnhancedBadge>
                <EnhancedBadge variant="success">
                  Empty States
                </EnhancedBadge>
                <EnhancedBadge variant="warning">
                  Progress Indicators
                </EnhancedBadge>
                <EnhancedBadge variant="primary" gradient>
                  Animações
                </EnhancedBadge>
              </div>
            </div>
          </EnhancedCard>
        </div>
      </div>
    </div>
  );
}