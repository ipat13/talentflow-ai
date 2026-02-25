"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import {
  Candidate,
  CANDIDATE_STATUS_LABELS,
  CANDIDATE_STATUS_VARIANTS,
  CandidateStatus,
} from "@/types/candidate";
import { Job, JOB_TYPE_LABELS } from "@/types/job";
import {
  ArrowLeft,
  Mail,
  Phone,
  FileText,
  Calendar,
  Sparkles,
  Loader2,
  ExternalLink,
  Save,
  Briefcase,
  MapPin,
  Building,
  CheckCircle,
  XCircle,
  GraduationCap,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Minus,
} from "lucide-react";

export default function CandidateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const candidateId = params.id as string;

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<CandidateStatus>("new");

  useEffect(() => {
    fetchCandidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateId]);

  const fetchCandidate = async () => {
    try {
      const response = await fetch(`/api/candidates/${candidateId}`);
      if (!response.ok) {
        router.push("/candidates");
        return;
      }
      const data = await response.json();
      setCandidate(data.candidate);
      setNotes(data.candidate.notes || "");
      setStatus(data.candidate.status);

      if (data.candidate.jobId) {
        fetchJob(data.candidate.jobId);
      }
    } catch (error) {
      console.error("Error fetching candidate:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJob = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`);
      if (response.ok) {
        const data = await response.json();
        setJob(data.job);
      }
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch("/api/candidates/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId }),
      });

      if (response.ok) {
        const data = await response.json();
        setCandidate((prev) =>
          prev
            ? {
                ...prev,
                matchScore: data.score,
                matchHighlights: data.highlights,
                analysis: {
                  skillsMatch: data.skillsMatch,
                  experience: data.experience,
                  education: data.education,
                  recommendation: data.recommendation,
                  recommendationReason: data.recommendationReason,
                },
              }
            : null
        );
      } else {
        const error = await response.json();
        alert(error.error || "Erro ao analisar CV");
      }
    } catch (error) {
      console.error("Error analyzing CV:", error);
      alert("Erro ao analisar CV");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleUpdateStatus = async (newStatus: CandidateStatus) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/candidates/${candidateId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setStatus(newStatus);
        setCandidate((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/candidates/${candidateId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });

      if (response.ok) {
        setCandidate((prev) => (prev ? { ...prev, notes } : null));
      }
    } catch (error) {
      console.error("Error saving notes:", error);
    } finally {
      setSaving(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[var(--color-secondary)]";
    if (score >= 60) return "text-[var(--color-warning)]";
    return "text-[var(--color-text-muted)]";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-[var(--color-secondary)]/10";
    if (score >= 60) return "bg-[var(--color-warning)]/10";
    return "bg-[var(--color-surface)]";
  };

  const getRecommendationIcon = (rec?: string) => {
    switch (rec) {
      case "strong_match":
        return <ThumbsUp className="w-5 h-5 text-[var(--color-secondary)]" />;
      case "good_match":
        return <CheckCircle className="w-5 h-5 text-[var(--color-primary)]" />;
      case "potential":
        return <Minus className="w-5 h-5 text-[var(--color-warning)]" />;
      case "weak_match":
        return <ThumbsDown className="w-5 h-5 text-[var(--color-danger)]" />;
      default:
        return null;
    }
  };

  const getRecommendationLabel = (rec?: string) => {
    switch (rec) {
      case "strong_match":
        return "Match Forte";
      case "good_match":
        return "Bom Match";
      case "potential":
        return "Potencial";
      case "weak_match":
        return "Match Fraco";
      default:
        return "";
    }
  };

  const getRecommendationColor = (rec?: string) => {
    switch (rec) {
      case "strong_match":
        return "text-[var(--color-secondary)]";
      case "good_match":
        return "text-[var(--color-primary)]";
      case "potential":
        return "text-[var(--color-warning)]";
      case "weak_match":
        return "text-[var(--color-danger)]";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--color-text-muted)]">Candidato não encontrado</p>
        <Link href="/candidates">
          <Button className="mt-4">Voltar aos Candidatos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/candidates"
          className="p-2 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-text-muted)]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            {candidate.name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={CANDIDATE_STATUS_VARIANTS[candidate.status]}>
              {CANDIDATE_STATUS_LABELS[candidate.status]}
            </Badge>
            {candidate.matchScore !== null && candidate.matchScore !== undefined && (
              <span className={`text-sm font-medium ${getScoreColor(candidate.matchScore)}`}>
                {candidate.matchScore}% Match
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {candidate.cvUrl && (
            <a href={candidate.cvUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="border border-[var(--color-border)]">
                <FileText className="w-4 h-4 mr-2" />
                Ver CV
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Candidato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[var(--color-text-muted)]" />
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)]">Email</p>
                    <a
                      href={`mailto:${candidate.email}`}
                      className="text-[var(--color-text)] hover:text-[var(--color-primary)]"
                    >
                      {candidate.email}
                    </a>
                  </div>
                </div>
                {candidate.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[var(--color-text-muted)]" />
                    <div>
                      <p className="text-sm text-[var(--color-text-muted)]">Telefone</p>
                      <a
                        href={`tel:${candidate.phone}`}
                        className="text-[var(--color-text)] hover:text-[var(--color-primary)]"
                      >
                        {candidate.phone}
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[var(--color-text-muted)]" />
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)]">Candidatado em</p>
                    <p className="text-[var(--color-text)]">
                      {new Date(candidate.createdAt).toLocaleDateString("pt-PT")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[var(--color-text-muted)]" />
                  <div>
                    <p className="text-sm text-[var(--color-text-muted)]">Fonte</p>
                    <p className="text-[var(--color-text)] capitalize">{candidate.source}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {job && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Vaga Associada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/jobs/${job.id}`}
                  className="block p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
                >
                  <h3 className="font-semibold text-[var(--color-text)] mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {JOB_TYPE_LABELS[job.type]}
                    </span>
                  </div>
                </Link>
              </CardContent>
            </Card>
          )}

          {candidate.analysis && (
            <>
              {candidate.analysis.skillsMatch && (
                <Card>
                  <CardHeader>
                    <CardTitle>Análise de Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-[var(--color-secondary)] mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Skills Correspondentes
                        </h4>
                        <div className="space-y-2">
                          {candidate.analysis.skillsMatch.matched.length > 0 ? (
                            candidate.analysis.skillsMatch.matched.map((skill, idx) => (
                              <div
                                key={idx}
                                className="px-3 py-2 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-lg text-sm"
                              >
                                {skill}
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-[var(--color-text-muted)]">
                              Nenhuma skill correspondente identificada
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[var(--color-danger)] mb-3 flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Skills em Falta
                        </h4>
                        <div className="space-y-2">
                          {candidate.analysis.skillsMatch.missing.length > 0 ? (
                            candidate.analysis.skillsMatch.missing.map((skill, idx) => (
                              <div
                                key={idx}
                                className="px-3 py-2 bg-[var(--color-danger)]/10 text-[var(--color-danger)] rounded-lg text-sm"
                              >
                                {skill}
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-[var(--color-text-muted)]">
                              Todas as skills necessárias estão presentes
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {(candidate.analysis.experience || candidate.analysis.education) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Experiência e Formação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {candidate.analysis.experience && (
                        <div>
                          <h4 className="text-sm font-medium text-[var(--color-text)] mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[var(--color-text-muted)]" />
                            Experiência
                          </h4>
                          <div className="space-y-2">
                            {candidate.analysis.experience.yearsFound > 0 && (
                              <p className="text-2xl font-bold text-[var(--color-text)]">
                                {candidate.analysis.experience.yearsFound} anos
                              </p>
                            )}
                            {candidate.analysis.experience.relevantRoles.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {candidate.analysis.experience.relevantRoles.map((role, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-[var(--color-surface)] text-[var(--color-text-muted)] rounded text-xs"
                                  >
                                    {role}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {candidate.analysis.education && (
                        <div>
                          <h4 className="text-sm font-medium text-[var(--color-text)] mb-3 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-[var(--color-text-muted)]" />
                            Formação
                          </h4>
                          <div className="space-y-1">
                            <p className="font-medium text-[var(--color-text)]">
                              {candidate.analysis.education.level}
                            </p>
                            {candidate.analysis.education.field && (
                              <p className="text-sm text-[var(--color-text-muted)]">
                                {candidate.analysis.education.field}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Notas</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Adiciona notas sobre o candidato..."
                className="w-full h-32 px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <div className="flex justify-end mt-3">
                <Button onClick={handleSaveNotes} disabled={saving}>
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span className="ml-2">Guardar Notas</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Match Score</CardTitle>
            </CardHeader>
            <CardContent>
              {candidate.matchScore !== null && candidate.matchScore !== undefined ? (
                <div className="text-center">
                  <div
                    className={`text-5xl font-bold ${getScoreColor(candidate.matchScore)} mb-2`}
                  >
                    {candidate.matchScore}%
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-4">
                    Compatibilidade com a vaga
                  </p>

                  {candidate.analysis?.recommendation && (
                    <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${getScoreBg(candidate.matchScore)}`}>
                      {getRecommendationIcon(candidate.analysis.recommendation)}
                      <span className={`font-medium ${getRecommendationColor(candidate.analysis.recommendation)}`}>
                        {getRecommendationLabel(candidate.analysis.recommendation)}
                      </span>
                    </div>
                  )}

                  {candidate.analysis?.recommendationReason && (
                    <p className="text-sm text-[var(--color-text-muted)] mt-3">
                      {candidate.analysis.recommendationReason}
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-[var(--color-text-muted)] mb-4">
                    Ainda não analisado
                  </p>
                  <Button onClick={handleAnalyze} disabled={analyzing} className="w-full">
                    {analyzing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span className="ml-2">Analisar com IA</span>
                  </Button>
                </div>
              )}

              {candidate.matchHighlights && candidate.matchHighlights.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                  <h4 className="text-sm font-medium text-[var(--color-text)] mb-3">
                    Pontos Fortes
                  </h4>
                  <div className="space-y-2">
                    {candidate.matchHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg ${getScoreBg(candidate.matchScore || 0)}`}
                      >
                        <p className="text-sm text-[var(--color-text)]">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alterar Estado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(Object.entries(CANDIDATE_STATUS_LABELS) as [CandidateStatus, string][]).map(
                  ([value, label]) => (
                    <button
                      key={value}
                      onClick={() => handleUpdateStatus(value)}
                      disabled={saving || status === value}
                      className={`w-full px-4 py-2 rounded-lg text-left text-sm transition-colors ${
                        status === value
                          ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                          : "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                      }`}
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
