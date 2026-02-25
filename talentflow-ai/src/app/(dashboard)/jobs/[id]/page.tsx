"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { JobForm } from "@/components/jobs";
import { PotentialCandidates } from "@/components/candidates";
import { Job, JobInput, JOB_TYPE_LABELS, JOB_STATUS_LABELS } from "@/types/job";
import { Candidate, CANDIDATE_STATUS_LABELS, CANDIDATE_STATUS_VARIANTS } from "@/types/candidate";
import { ArrowLeft, Edit2, Trash2, Users, Loader2, Upload } from "lucide-react";

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get("edit") === "true";

  const [job, setJob] = useState<Job | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
    fetchCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${id}`);
      if (response.ok) {
        const data = await response.json();
        setJob(data.job);
      }
    } catch (error) {
      console.error("Error fetching job:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCandidates = async () => {
    try {
      const response = await fetch("/api/candidates");
      const data = await response.json();
      const jobCandidates = (data.candidates || []).filter(
        (c: Candidate) => c.jobId === id
      );
      const sorted = jobCandidates.sort((a: Candidate, b: Candidate) => {
        if (a.matchScore === null || a.matchScore === undefined) return 1;
        if (b.matchScore === null || b.matchScore === undefined) return -1;
        return b.matchScore - a.matchScore;
      });
      setCandidates(sorted);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const handleUpdate = async (data: JobInput) => {
    const response = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push(`/jobs/${id}`);
    } else {
      throw new Error("Failed to update job");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tens a certeza que queres eliminar esta vaga?")) return;

    try {
      await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      router.push("/jobs");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--color-text-muted)]">Vaga não encontrada</p>
        <Link href="/jobs">
          <Button className="mt-4">Voltar às Vagas</Button>
        </Link>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/jobs/${id}`}
            className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">
              Editar Vaga
            </h1>
            <p className="text-[var(--color-text-muted)]">{job.title}</p>
          </div>
        </div>

        <JobForm
          job={job}
          onSubmit={handleUpdate}
          onCancel={() => router.push(`/jobs/${id}`)}
        />
      </div>
    );
  }

  const statusVariant = {
    draft: "default" as const,
    active: "success" as const,
    closed: "danger" as const,
  };

  const avgMatchScore =
    candidates.length > 0 && candidates.some((c) => c.matchScore !== null)
      ? Math.round(
          candidates
            .filter((c) => c.matchScore !== null)
            .reduce((sum, c) => sum + (c.matchScore || 0), 0) /
            candidates.filter((c) => c.matchScore !== null).length
        )
      : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/jobs"
            className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[var(--color-text)]">
                {job.title}
              </h1>
              <Badge variant={statusVariant[job.status]}>
                {JOB_STATUS_LABELS[job.status]}
              </Badge>
            </div>
            <p className="text-[var(--color-text-muted)]">
              {job.department} • {job.location} • {JOB_TYPE_LABELS[job.type]}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/jobs/${id}?edit=true`}>
            <Button variant="ghost">
              <Edit2 className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Descrição</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--color-text)] whitespace-pre-wrap">
                {job.description || "Sem descrição"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requisitos</CardTitle>
            </CardHeader>
            <CardContent>
              {job.requirements && job.requirements.length > 0 ? (
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-[var(--color-text)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-2 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[var(--color-text-muted)]">
                  Nenhum requisito definido
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Competências</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.competencies && job.competencies.length > 0 ? (
                  job.competencies.map((comp, index) => (
                    <Badge key={index} variant="info">
                      {comp}
                    </Badge>
                  ))
                ) : (
                  <p className="text-[var(--color-text-muted)]">
                    Nenhuma competência definida
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {candidates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Candidatos ({candidates.length})</span>
                  <Link href={`/candidates?jobId=${id}`}>
                    <Button variant="ghost" size="sm">
                      Ver Todos
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {candidates.slice(0, 5).map((candidate) => (
                    <Link
                      key={candidate.id}
                      href={`/candidates/${candidate.id}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text-muted)]">
                          {candidate.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--color-text)]">
                            {candidate.name}
                          </p>
                          <p className="text-sm text-[var(--color-text-muted)]">
                            {candidate.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={CANDIDATE_STATUS_VARIANTS[candidate.status]}>
                          {CANDIDATE_STATUS_LABELS[candidate.status]}
                        </Badge>
                        {candidate.matchScore !== null && candidate.matchScore !== undefined && (
                          <span
                            className={`text-sm font-medium ${
                              candidate.matchScore >= 80
                                ? "text-[var(--color-secondary)]"
                                : candidate.matchScore >= 60
                                ? "text-[var(--color-warning)]"
                                : "text-[var(--color-text-muted)]"
                            }`}
                          >
                            {candidate.matchScore}%
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <PotentialCandidates jobId={id} onConvert={fetchCandidates} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-muted)]">
                  <Users className="w-4 h-4 inline mr-2" />
                  Candidatos
                </span>
                <span className="font-medium text-[var(--color-text)]">
                  {candidates.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-muted)]">
                  Match Score Médio
                </span>
                <span className="font-medium text-[var(--color-text)]">
                  {avgMatchScore !== null ? `${avgMatchScore}%` : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-muted)]">
                  Criada em
                </span>
                <span className="text-sm text-[var(--color-text)]">
                  {new Date(job.createdAt).toLocaleDateString("pt-PT")}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/candidates?jobId=${id}`} className="block">
                <Button variant="primary" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Adicionar Candidatos
                </Button>
              </Link>
              {job.status === "draft" && (
                <Button variant="secondary" className="w-full">
                  Publicar Vaga
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
