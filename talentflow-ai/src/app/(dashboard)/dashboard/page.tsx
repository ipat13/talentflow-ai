"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Briefcase, Users, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    title: "Vagas Ativas",
    value: "12",
    change: "+2 este mês",
    icon: Briefcase,
    color: "text-[var(--color-primary)]",
  },
  {
    title: "Candidatos",
    value: "48",
    change: "+15 esta semana",
    icon: Users,
    color: "text-[var(--color-secondary)]",
  },
  {
    title: "Match Score Médio",
    value: "76%",
    change: "+5% vs mês passado",
    icon: TrendingUp,
    color: "text-[var(--color-warning)]",
  },
  {
    title: "Em Entrevista",
    value: "8",
    change: "3 hoje",
    icon: Clock,
    color: "text-[var(--color-danger)]",
  },
];

const recentJobs = [
  { id: "1", title: "Senior React Developer", candidates: 12, status: "active" },
  { id: "2", title: "Product Manager", candidates: 8, status: "active" },
  { id: "3", title: "UX Designer", candidates: 5, status: "draft" },
  { id: "4", title: "Backend Engineer", candidates: 15, status: "active" },
];

const topCandidates = [
  { id: "1", name: "Ana Silva", job: "Senior React Developer", score: 94 },
  { id: "2", name: "João Santos", job: "Product Manager", score: 91 },
  { id: "3", name: "Maria Costa", job: "UX Designer", score: 88 },
  { id: "4", name: "Pedro Oliveira", job: "Backend Engineer", score: 85 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Dashboard</h1>
        <p className="text-[var(--color-text-muted)]">
          Visão geral do teu processo de recrutamento
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">{stat.title}</p>
                  <p className="text-2xl font-bold text-[var(--color-text)] mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {stat.change}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vagas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0"
                >
                  <div>
                    <p className="font-medium text-[var(--color-text)]">{job.title}</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {job.candidates} candidatos
                    </p>
                  </div>
                  <Badge variant={job.status === "active" ? "success" : "default"}>
                    {job.status === "active" ? "Ativa" : "Rascunho"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Candidatos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-text-inverse)] text-sm font-medium">
                      {candidate.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text)]">
                        {candidate.name}
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {candidate.job}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        candidate.score >= 90
                          ? "text-[var(--color-secondary)]"
                          : candidate.score >= 80
                          ? "text-[var(--color-warning)]"
                          : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {candidate.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
