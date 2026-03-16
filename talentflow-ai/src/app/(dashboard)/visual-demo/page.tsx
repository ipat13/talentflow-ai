"use client";

import { 
  EnhancedCard, 
  StatsCard, 
  ActionCard,
  EnhancedButton,
  GradientButton,
  IconButton,
  EnhancedBadge,
  StatusBadge,
  SkillBadge,
  MatchScoreBadge,
  EnhancedLoading,
  PageLoading
} from "@/components/ui";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Download,
  Upload,
  Plus,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  UserPlus,
  FileText,
  Linkedin,
  Sparkles
} from "lucide-react";
import { useState } from "react";

export default function VisualDemoPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("components");

  const handleAction = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-in-down">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Demonstração Visual
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Componentes visuais aprimorados para o TalentFlow AI
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <EnhancedButton
                variant={activeTab === "components" ? "primary" : "ghost"}
                onClick={() => setActiveTab("components")}
              >
                Componentes
              </EnhancedButton>
              <EnhancedButton
                variant={activeTab === "previews" ? "primary" : "ghost"}
                onClick={() => setActiveTab("previews")}
              >
                Pré-visualizações
              </EnhancedButton>
            </div>
          </div>

          <EnhancedCard glowEffect className="mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Novos Componentes Visuais
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Explore os componentes aprimorados com animações, gradientes e efeitos visuais
                </p>
              </div>
            </div>
          </EnhancedCard>
        </div>

        {activeTab === "components" ? (
          <div className="space-y-8">
            {/* Stats Cards Section */}
            <section className="animate-slide-in-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Cartões de Estatísticas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                  title="Candidatos Totais"
                  value="1,248"
                  change="+12%"
                  icon={Users}
                  trend="up"
                />
                <StatsCard
                  title="Vagas Ativas"
                  value="42"
                  change="+5%"
                  icon={Briefcase}
                  trend="up"
                />
                <StatsCard
                  title="Taxa de Match"
                  value="78%"
                  change="-2%"
                  icon={TrendingUp}
                  trend="down"
                />
                <StatsCard
                  title="Novos Hoje"
                  value="24"
                  change="+18%"
                  icon={UserPlus}
                  trend="up"
                />
              </div>
            </section>

            {/* Action Cards Section */}
            <section className="animate-slide-in-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Cartões de Ação
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ActionCard
                  title="Importar CV"
                  description="Faça upload de currículos em PDF para análise automática"
                  icon={Upload}
                  action={
                    <GradientButton
                      onClick={handleAction}
                      loading={loading}
                      fullWidth
                    >
                      Importar Agora
                    </GradientButton>
                  }
                  variant="primary"
                />
                <ActionCard
                  title="Nova Vaga"
                  description="Crie uma nova vaga com descrição gerada por IA"
                  icon={Plus}
                  action={
                    <EnhancedButton
                      onClick={handleAction}
                      loading={loading}
                      fullWidth
                    >
                      Criar Vaga
                    </EnhancedButton>
                  }
                  variant="secondary"
                />
                <ActionCard
                  title="Importar LinkedIn"
                  description="Importe perfis do LinkedIn automaticamente"
                  icon={Linkedin}
                  action={
                    <EnhancedButton
                      onClick={handleAction}
                      loading={loading}
                      variant="outline"
                      fullWidth
                    >
                      Conectar
                    </EnhancedButton>
                  }
                  variant="primary"
                />
              </div>
            </section>

            {/* Buttons Section */}
            <section className="animate-slide-in-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Botões Aprimorados
              </h2>
              <EnhancedCard>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <EnhancedButton variant="primary">
                      Primário
                    </EnhancedButton>
                    <EnhancedButton variant="secondary">
                      Secundário
                    </EnhancedButton>
                    <EnhancedButton variant="danger">
                      Perigo
                    </EnhancedButton>
                    <EnhancedButton variant="outline">
                      Outline
                    </EnhancedButton>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <GradientButton glowEffect>
                      Gradiente
                    </GradientButton>
                    <EnhancedButton loading>
                      Carregando
                    </EnhancedButton>
                    <EnhancedButton disabled>
                      Desativado
                    </EnhancedButton>
                    <IconButton
                      icon={Plus}
                      label="Adicionar"
                      variant="primary"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <EnhancedButton size="sm">
                      Pequeno
                    </EnhancedButton>
                    <EnhancedButton size="md">
                      Médio
                    </EnhancedButton>
                    <EnhancedButton size="lg">
                      Grande
                    </EnhancedButton>
                  </div>
                </div>
              </EnhancedCard>
            </section>

            {/* Badges Section */}
            <section className="animate-slide-in-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Badges Aprimorados
              </h2>
              <EnhancedCard>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    <EnhancedBadge>Default</EnhancedBadge>
                    <EnhancedBadge variant="primary" gradient>
                      Primário
                    </EnhancedBadge>
                    <EnhancedBadge variant="secondary">
                      Secundário
                    </EnhancedBadge>
                    <EnhancedBadge variant="success">
                      Sucesso
                    </EnhancedBadge>
                    <EnhancedBadge variant="warning">
                      Aviso
                    </EnhancedBadge>
                    <EnhancedBadge variant="danger">
                      Perigo
                    </EnhancedBadge>
                    <EnhancedBadge variant="info">
                      Info
                    </EnhancedBadge>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <StatusBadge status="active" />
                    <StatusBadge status="pending" />
                    <StatusBadge status="completed" />
                    <StatusBadge status="warning" />
                    <StatusBadge status="error" />
                    <StatusBadge status="inactive" />
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <SkillBadge skill="React" removable />
                    <SkillBadge skill="TypeScript" removable />
                    <SkillBadge skill="Node.js" removable />
                    <SkillBadge skill="Tailwind CSS" removable />
                    <SkillBadge skill="Firebase" removable />
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6">
                    <MatchScoreBadge score={95} />
                    <MatchScoreBadge score={78} />
                    <MatchScoreBadge score={62} />
                    <MatchScoreBadge score={45} />
                    <MatchScoreBadge score={28} />
                  </div>
                </div>
              </EnhancedCard>
            </section>

            {/* Loading States */}
            <section className="animate-slide-in-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Estados de Carregamento
              </h2>
              <EnhancedCard>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center space-y-3">
                    <EnhancedLoading type="spinner" size="md" />
                    <p className="text-sm text-slate-600 dark:text-slate-400">Spinner</p>
                  </div>
                  <div className="text-center space-y-3">
                    <EnhancedLoading type="dots" size="md" />
                    <p className="text-sm text-slate-600 dark:text-slate-400">Pontos</p>
                  </div>
                  <div className="text-center space-y-3">
                    <EnhancedLoading type="pulse" size="md" />
                    <p className="text-sm text-slate-600 dark:text-slate-400">Pulso</p>
                  </div>
                  <div className="text-center space-y-3">
                    <EnhancedLoading type="skeleton" size="md" />
                    <p className="text-sm text-slate-600 dark:text-slate-400">Esqueleto</p>
                  </div>
                </div>
              </EnhancedCard>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Dashboard Preview */}
            <section className="animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Pré-visualização do Dashboard
              </h2>
              <EnhancedCard gradientBorder className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full -translate-y-32 translate-x-32" />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Visão Geral do Recrutamento
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Dados atualizados em tempo real
                      </p>
                    </div>
                    <EnhancedButton variant="primary" icon={Download} iconPosition="right">
                      Exportar Relatório
                    </EnhancedButton>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatsCard
                      title="Match Alto"
                      value="18"
                      change="+24%"
                      icon={Star}
                      trend="up"
                    />
                    <StatsCard
                      title="Em Análise"
                      value="36"
                      change="+8%"
                      icon={Clock}
                      trend="up"
                    />
                    <StatsCard
                      title="Entrevistas"
                      value="12"
                      change="+15%"
                      icon={CheckCircle}
                      trend="up"
                    />
                    <StatsCard
                      title="Rejeitados"
                      value="7"
                      change="-3%"
                      icon={XCircle}
                      trend="down"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <EnhancedCard hoverEffect>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                        Candidatos por Fonte
                      </h4>
                      <div className="space-y-3">
                        {[
                          { source: "LinkedIn", count: 42, color: "bg-blue-500" },
                          { source: "Upload CV", count: 28, color: "bg-emerald-500" },
                          { source: "Site", count: 15, color: "bg-purple-500" },
                          { source: "Indicação", count: 9, color: "bg-amber-500" },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 ${item.color} rounded-full`} />
                              <span className="text-sm text-slate-700 dark:text-slate-300">
                                {item.source}
                              </span>
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">
                              {item.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </EnhancedCard>
                    
                    <EnhancedCard hoverEffect>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                        Status das Vagas
                      </h4>
                      <div className="space-y-3">
                        {[
                          { status: "Aberta", count: 8, variant: "success" as const },
                          { status: "Em Andamento", count: 5, variant: "primary" as const },
                          { status: "Pausada", count: 2, variant: "warning" as const },
                          { status: "Fechada", count: 3, variant: "default" as const },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <EnhancedBadge variant={item.variant}>
                              {item.status}
                            </EnhancedBadge>
                            <span className="font-medium text-slate-900 dark:text-white">
                              {item.count} vagas
                            </span>
                          </div>
                        ))}
                      </div>
                    </EnhancedCard>
                  </div>
                </div>
              </EnhancedCard>
            </section>

            {/* Candidate Card Preview */}
            <section className="animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Pré-visualização de Candidato
              </h2>
              <EnhancedCard glowEffect className="max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <UserPlus className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                          João Silva
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                          Senior Frontend Developer • 8 anos de experiência
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <SkillBadge skill="React" />
                          <SkillBadge skill="TypeScript" />
                          <SkillBadge skill="Next.js" />
                          <SkillBadge skill="Tailwind" />
                          <SkillBadge skill="GraphQL" />
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <MatchScoreBadge score={92} />
                        <StatusBadge status="active" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Última Empresa</p>
                        <p className="text-slate-900 dark:text-white">TechCorp Solutions</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Educação</p>
                        <p className="text-slate-900 dark:text-white">MSc Ciência da Computação</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Localização</p>
                        <p className="text-slate-900 dark:text-white">Lisboa, Portugal</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Fonte</p>
                        <EnhancedBadge variant="primary" icon={Linkedin} iconPosition="left">
                          LinkedIn
                        </EnhancedBadge>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                      <EnhancedButton variant="primary" fullWidth>
                        Ver Perfil Completo
                      </EnhancedButton>
                      <EnhancedButton variant="outline" fullWidth>
                        Agendar Entrevista
                      </EnhancedButton>
                    </div>
                  </div>
                </div>
              </EnhancedCard>
            </section>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700/50">
          <EnhancedCard className="text-center">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                TalentFlow AI - Plataforma Inteligente
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Componentes visuais aprimorados com animações, gradientes e efeitos modernos
              </p>
              <div className="flex justify-center gap-3 pt-4">
                <EnhancedBadge variant="primary" gradient>
                  React
                </EnhancedBadge>
                <EnhancedBadge variant="secondary">
                  TypeScript
                </EnhancedBadge>
                <EnhancedBadge variant="success">
                  Tailwind CSS
                </EnhancedBadge>
                <EnhancedBadge variant="warning">
                  Next.js
                </EnhancedBadge>
              </div>
            </div>
          </EnhancedCard>
        </div>
      </div>
    </div>
  );
}