"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { Candidate, CANDIDATE_STATUS_LABELS, CANDIDATE_STATUS_VARIANTS, CandidateStatus } from "@/types/candidate";
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
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-gray-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-50";
    if (score >= 60) return "bg-yellow-50";
    return "bg-gray-50";
  };

  const getRecommendationIcon = (rec?: string) => {
    switch (rec) {
      case "strong_match":
        return <ThumbsUp className="w-5 h-5 text-green-600" />;
      case "good_match":
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case "potential":
        return <Minus className="w-5 h-5 text-yellow-600" />;
      case "weak_match":
        return <ThumbsDown className="w-5 h-5 text-red-600" />;
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
        return "text-green-600";
      case "good_match":
        return "text-blue-600";
      case "potential":
        return "text-yellow-600";
      case "weak_match":
        return "text-red-600";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Candidato não encontrado</p>
        <Link href="/candidates">
          <Button className="mt-4">Voltar aos Candidatos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/candidates" className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
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
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${candidate.email}`} className="text-gray-900 hover:text-indigo-600">
                      {candidate.email}
                    </a>
                  </div>
                </div>
                {candidate.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Telefone</p>
                      <a href={`tel:${candidate.phone}`} className="text-gray-900 hover:text-indigo-600">
                        {candidate.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notas</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Adiciona notas sobre o candidato..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-end mt-3">
                <Button onClick={handleSaveNotes} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
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
                  <div className={`text-5xl font-bold ${getScoreColor(candidate.matchScore)} mb-2`}>
                    {candidate.matchScore}%
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Button onClick={handleAnalyze} disabled={analyzing} className="w-full">
                    {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span className="ml-2">Analisar com IA</span>
                  </Button>
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
                        status === value ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
