"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/ui";
import { Briefcase, Users, TrendingUp, Clock, ArrowRight, Loader2, Linkedin, Upload } from "lucide-react";
import Link from "next/link";

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
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-300">
            Visão geral do teu processo de recrutamento
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => router.push("/jobs?modal=linkedin")}
          >
            <Linkedin className="w-4 h-4 mr-2" />
            Importar LinkedIn
          </Button>
          <Button
            className="bg-gradient-to-r from-indigo-500 to-purple-600"
            onClick={() => router.push("/jobs/new")}
          >
            <Upload className="w-4 h-4 mr-2" />
            Nova Vaga
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white text-lg">Vagas Recentes</CardTitle>
            <Link href="/jobs" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentJobs.length === 0 ? (
              <p className="text-slate-400 text-center py-8">Nenhuma vaga ainda.</p>
            ) : (
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/jobs?id=${job.id}`}
                    className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0 hover:bg-slate-700/50 -mx-2 px-2 rounded transition-colors"
                  >
                    <div>
                      <p className="font-medium text-white">{job.title}</p>
                      <p className="text-sm text-slate-300">
                        {job.company} • {job._count?.candidates || 0} candidatos
                      </p>
                    </div>
                    <Badge className={job.status === "active" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-slate-700 text-slate-300 border-slate-600"}>
                      {job.status === "active" ? "Ativa" : "Rascunho"}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white text-lg">Top Candidatos</CardTitle>
            <Link href="/candidates" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {topCandidates.length === 0 ? (
              <p className="text-slate-400 text-center py-8">Nenhum candidato ainda.</p>
            ) : (
              <div className="space-y-4">
                {topCandidates.map((candidate) => (
                  <Link
                    key={candidate.id}
                    href={`/candidates?id=${candidate.id}`}
                    className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0 hover:bg-slate-700/50 -mx-2 px-2 rounded transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
                        {candidate.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {candidate.name}
                        </p>
                        <p className="text-sm text-slate-300">
                          {candidate.jobTitle || "Candidato"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(candidate.status)}
                      {candidate.matchScore !== null && (
                        <span
                          className={`text-lg font-bold ${
                            candidate.matchScore >= 90
                              ? "text-emerald-400"
                              : candidate.matchScore >= 80
                              ? "text-purple-400"
                              : "text-slate-300"
                          }`}
                        >
                          {candidate.matchScore}%
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Candidatos por Estado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { status: "new", label: "Novos", color: "bg-blue-500" },
              { status: "reviewing", label: "Em Análise", color: "bg-yellow-500" },
              { status: "interview", label: "Entrevista", color: "bg-emerald-500" },
              { status: "offer", label: "Proposta", color: "bg-purple-500" },
              { status: "rejected", label: "Rejeitados", color: "bg-red-500" },
            ].map((item) => {
              const count = topCandidates.filter((c) => c.status === item.status).length;
              const total = stats.totalCandidates || 1;
              const percentage = Math.round((count / total) * 100) || 0;
              return (
                <div key={item.status} className="text-center">
                  <div className={`${item.color} h-2 rounded-full mb-2`} style={{ width: `${percentage}%` }} />
                  <p className="text-white font-medium">{count}</p>
                  <p className="text-slate-400 text-sm">{item.label}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
