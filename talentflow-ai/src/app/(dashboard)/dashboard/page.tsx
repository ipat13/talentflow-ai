"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/ui";
import { Briefcase, Users, TrendingUp, Clock, ArrowRight, Loader2, Linkedin, Upload, Activity, Target, Zap } from "lucide-react";
import Link from "next/link";
import { GlassCard, AnimatedCard, ProgressRing, AnimatedBadge, GradientAvatar, StatusIndicator, InteractiveGradientCard } from "@/components/ui/VisualEffects";

interface DashboardStats {
  activeJobs: number;
  totalCandidates: number;
  avgMatchScore: number;
  inInterview: number;
}

interface Job {
  id: string;
  title: string;
  company: string;
  status: string;
  _count?: { candidates: number };
}

interface Candidate {
  id: string;
  name: string;
  jobTitle?: string;
  matchScore: number | null;
  status: string;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-32 bg-slate-700 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-56 bg-slate-700 rounded animate-pulse"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-40 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-slate-700 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-24 bg-slate-700 rounded mb-2"></div>
                <div className="h-8 w-16 bg-slate-700 rounded"></div>
              </div>
              <div className="w-12 h-12 bg-slate-700 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 animate-pulse">
          <div className="h-6 w-32 bg-slate-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-slate-700/50 rounded"></div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 animate-pulse">
          <div className="h-6 w-32 bg-slate-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-slate-700/50 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    activeJobs: 0,
    totalCandidates: 0,
    avgMatchScore: 0,
    inInterview: 0,
  });
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [topCandidates, setTopCandidates] = useState<Candidate[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jobsRes, candidatesRes] = await Promise.all([
        fetch("/api/jobs"),
        fetch("/api/candidates"),
      ]);

      const jobsData = await jobsRes.json();
      const candidatesData = await candidatesRes.json();

      const jobs = jobsData.jobs || [];
      const candidates = candidatesData.candidates || [];

      const activeJobs = jobs.filter((j: Job) => j.status === "active").length;
      const inInterview = candidates.filter((c: Candidate) => c.status === "interview").length;
      const scoresWithMatch = candidates.filter((c: Candidate) => c.matchScore !== null);
      const avgMatchScore = scoresWithMatch.length > 0
        ? Math.round(scoresWithMatch.reduce((acc: number, c: Candidate) => acc + (c.matchScore || 0), 0) / scoresWithMatch.length)
        : 0;

      setStats({
        activeJobs,
        totalCandidates: candidates.length,
        avgMatchScore,
        inInterview,
      });

      setRecentJobs(jobs.slice(0, 5));
      setCandidates(candidates);
      setTopCandidates(
        candidates
          .filter((c: Candidate) => c.matchScore !== null)
          .sort((a: Candidate, b: Candidate) => (b.matchScore || 0) - (a.matchScore || 0))
          .slice(0, 5)
      );
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <DashboardSkeleton />
      </div>
    );
  }

  const statsCards = [
    {
      title: "Vagas Ativas",
      value: stats.activeJobs.toString(),
      change: `${stats.totalCandidates} candidatos total`,
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Candidatos",
      value: stats.totalCandidates.toString(),
      change: `${stats.inInterview} em entrevista`,
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Match Score Médio",
      value: `${stats.avgMatchScore}%`,
      change: stats.avgMatchScore >= 80 ? "Excelente" : "Bom",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Em Entrevista",
      value: stats.inInterview.toString(),
      change: "Candidatos avançados",
      icon: Clock,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "interview":
        return <Badge variant="success">Entrevista</Badge>;
      case "reviewing":
        return <Badge variant="warning">Em Análise</Badge>;
      case "offer":
        return <Badge variant="info">Proposta</Badge>;
      case "rejected":
        return <Badge variant="danger">Rejeitado</Badge>;
      default:
        return <Badge variant="default">Novo</Badge>;
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 dashboard-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-300 text-sm md:text-base">
            Visão geral do teu processo de recrutamento
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 text-sm md:text-base py-2 md:py-2.5"
            onClick={() => router.push("/jobs?modal=linkedin")}
          >
            <Linkedin className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Importar LinkedIn</span>
            <span className="sm:hidden">LinkedIn</span>
          </Button>
          <Button
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-sm md:text-base py-2 md:py-2.5"
            onClick={() => router.push("/jobs/new")}
          >
            <Upload className="w-4 h-4 mr-2" />
            Nova Vaga
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {statsCards.map((stat, index) => (
          <AnimatedCard key={stat.title} delay={index * 100}>
            <InteractiveGradientCard className="h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-slate-300 text-xs md:text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl md:text-3xl font-bold text-white mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-2 md:p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg hover-lift`}>
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-slate-400 text-xs mb-2">{stat.change}</p>
                  <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${stat.color.split(' ')[0]} rounded-full transition-all duration-1000`}
                      style={{ 
                        width: `${Math.min(parseInt(stat.value) || 0, 100)}%`,
                        background: stat.color.replace('bg-gradient-to-br', 'linear-gradient(90deg)')
                      }}
                    />
                  </div>
                </div>
              </div>
            </InteractiveGradientCard>
          </AnimatedCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <AnimatedCard delay={400}>
          <GlassCard className="h-full">
            <CardHeader className="flex flex-row items-center justify-between px-4 md:px-6 py-4 md:py-6">
              <CardTitle className="text-white text-base md:text-lg flex items-center gap-2">
                <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                Vagas Recentes
              </CardTitle>
              <Link href="/jobs" className="text-indigo-400 hover:text-indigo-300 text-xs md:text-sm flex items-center gap-1 hover-lift">
                Ver todas <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </Link>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              {recentJobs.length === 0 ? (
                <div className="text-center py-6 md:py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-400">Nenhuma vaga ainda.</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => router.push("/jobs/new")}
                  >
                    Criar Primeira Vaga
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {recentJobs.map((job, index) => (
                    <AnimatedCard key={job.id} delay={500 + index * 50}>
                      <Link
                        href={`/jobs?id=${job.id}`}
                        className="group flex items-center justify-between p-3 md:p-4 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600 rounded-xl transition-all duration-300 hover-lift ripple"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-lg flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-600/30 transition-all">
                              <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-white text-sm md:text-base truncate group-hover:text-indigo-300 transition-colors">
                                {job.title}
                              </p>
                              <p className="text-xs md:text-sm text-slate-300 truncate">
                                {job.company} • {job._count?.candidates || 0} candidatos
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <AnimatedBadge
                            variant={job.status === "active" ? "success" : "default"}
                            className="text-xs md:text-sm"
                          >
                            {job.status === "active" ? "Ativa" : "Rascunho"}
                          </AnimatedBadge>
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                        </div>
                      </Link>
                    </AnimatedCard>
                  ))}
                </div>
              )}
            </CardContent>
          </GlassCard>
        </AnimatedCard>

        <AnimatedCard delay={450}>
          <GlassCard className="h-full">
            <CardHeader className="flex flex-row items-center justify-between px-4 md:px-6 py-4 md:py-6">
              <CardTitle className="text-white text-base md:text-lg flex items-center gap-2">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                Top Candidatos
              </CardTitle>
              <Link href="/candidates" className="text-indigo-400 hover:text-indigo-300 text-xs md:text-sm flex items-center gap-1 hover-lift">
                Ver todos <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </Link>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              {topCandidates.length === 0 ? (
                <div className="text-center py-6 md:py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-400">Nenhum candidato ainda.</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => router.push("/candidates/new")}
                  >
                    Adicionar Candidato
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {topCandidates.map((candidate, index) => (
                    <AnimatedCard key={candidate.id} delay={550 + index * 50}>
                      <Link
                        href={`/candidates?id=${candidate.id}`}
                        className="group flex items-center justify-between p-3 md:p-4 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600 rounded-xl transition-all duration-300 hover-lift ripple"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <GradientAvatar
                            text={candidate.name}
                            size={40}
                            className="flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white text-sm md:text-base truncate group-hover:text-emerald-300 transition-colors">
                              {candidate.name}
                            </p>
                            <p className="text-xs md:text-sm text-slate-300 truncate">
                              {candidate.jobTitle || "Candidato"}
                            </p>
                          </div>
                        </div>
                         <div className="flex items-center gap-3 flex-shrink-0">
                          {candidate.matchScore !== null && (
                            <div className="relative">
                               <ProgressRing
                                 size={40}
                                 value={candidate.matchScore || 0}
                                 color={
                                   candidate.matchScore >= 90
                                     ? "stroke-emerald-500"
                                     : candidate.matchScore >= 80
                                     ? "stroke-purple-500"
                                     : "stroke-blue-500"
                                 }
                              />
                            </div>
                          )}
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                        </div>
                      </Link>
                    </AnimatedCard>
                  ))}
                </div>
              )}
            </CardContent>
          </GlassCard>
        </AnimatedCard>
      </div>

      <AnimatedCard delay={500}>
        <GlassCard>
          <CardHeader className="px-4 md:px-6 py-4 md:py-6">
            <CardTitle className="text-white text-base md:text-lg flex items-center gap-2">
              <Activity className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              Candidatos por Estado
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            <div className="space-y-3 md:space-y-4">
              {[
                { status: "new", label: "Novos", color: "from-blue-500 to-blue-600", icon: Zap, gradient: "bg-gradient-to-br from-blue-500 to-blue-600" },
                { status: "reviewing", label: "Em Análise", color: "from-yellow-500 to-yellow-600", icon: Target, gradient: "bg-gradient-to-br from-yellow-500 to-yellow-600" },
                { status: "interview", label: "Entrevista", color: "from-emerald-500 to-emerald-600", icon: Users, gradient: "bg-gradient-to-br from-emerald-500 to-emerald-600" },
                { status: "offer", label: "Proposta", color: "from-purple-500 to-purple-600", icon: TrendingUp, gradient: "bg-gradient-to-br from-purple-500 to-purple-600" },
                { status: "rejected", label: "Rejeitados", color: "from-red-500 to-red-600", icon: Clock, gradient: "bg-gradient-to-br from-red-500 to-red-600" },
              ].map((item, index) => {
                const count = candidates.filter((c: Candidate) => c.status === item.status).length;
                const total = stats.totalCandidates || 1;
                const percentage = Math.round((count / total) * 100) || 0;
                return (
                  <AnimatedCard key={item.status} delay={600 + index * 50}>
                    <div className="group flex items-center gap-3 md:gap-4 p-3 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600 rounded-xl transition-all duration-300 hover-lift">
                      <div className={`w-8 h-8 md:w-10 md:h-10 ${item.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-300 text-xs md:text-sm truncate font-medium">{item.label}</span>
                          <span className="text-white font-bold text-sm md:text-base whitespace-nowrap ml-2">
                            {count} <span className="text-slate-400 font-normal">({percentage}%)</span>
                          </span>
                        </div>
                        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                );
              })}
            </div>

            {stats.totalCandidates > 0 && (
              <AnimatedCard delay={850}>
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-colors">
                      <p className="text-2xl md:text-3xl font-bold text-emerald-400 text-gradient bg-gradient-to-r from-emerald-400 to-emerald-300">
                        {Math.round((candidates.filter((c: Candidate) => c.status === "interview").length / stats.totalCandidates) * 100) || 0}%
                      </p>
                      <p className="text-slate-400 text-xs mt-1">Taxa de Entrevista</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-colors">
                      <p className="text-2xl md:text-3xl font-bold text-purple-400 text-gradient bg-gradient-to-r from-purple-400 to-purple-300">
                        {Math.round((candidates.filter((c: Candidate) => c.status === "offer").length / stats.totalCandidates) * 100) || 0}%
                      </p>
                      <p className="text-slate-400 text-xs mt-1">Taxa de Proposta</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-colors">
                      <p className="text-2xl md:text-3xl font-bold text-blue-400 text-gradient bg-gradient-to-r from-blue-400 to-blue-300">
                        {stats.avgMatchScore}%
                      </p>
                      <p className="text-slate-400 text-xs mt-1">Match Médio</p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            )}
          </CardContent>
        </GlassCard>
      </AnimatedCard>
    </div>
  );
}
