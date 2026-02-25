"use client";

import { useState, useEffect, Suspense } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { CVUploader, CandidateCard } from "@/components/candidates";
import { Candidate, Job, CANDIDATE_STATUS_LABELS } from "@/types";
import { Upload, Loader2, Filter, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

function CandidatesContent() {
  const searchParams = useSearchParams();
  const jobIdFromUrl = searchParams.get("jobId");

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploader, setShowUploader] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>(jobIdFromUrl || "all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCandidates();
    fetchJobs();
  }, []);

  useEffect(() => {
    if (jobIdFromUrl) {
      setSelectedJobId(jobIdFromUrl);
      setShowUploader(true);
    }
  }, [jobIdFromUrl]);

  const fetchCandidates = async () => {
    try {
      const response = await fetch("/api/candidates");
      const data = await response.json();
      setCandidates(data.candidates || []);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleAnalyze = async (candidateId: string) => {
    setAnalyzingId(candidateId);
    try {
      const response = await fetch("/api/candidates/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId }),
      });

      if (response.ok) {
        fetchCandidates();
      } else {
        const error = await response.json();
        alert(error.error || "Erro ao analisar CV");
      }
    } catch (error) {
      console.error("Error analyzing CV:", error);
      alert("Erro ao analisar CV");
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tens a certeza que queres eliminar este candidato?")) return;

    try {
      const response = await fetch(`/api/candidates/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCandidates((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    if (selectedJobId !== "all" && candidate.jobId !== selectedJobId) {
      return false;
    }
    if (statusFilter !== "all" && candidate.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (a.matchScore === null || a.matchScore === undefined) return 1;
    if (b.matchScore === null || b.matchScore === undefined) return -1;
    return b.matchScore - a.matchScore;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Candidatos
          </h1>
          <p className="text-[var(--color-text-muted)]">
            Gerir e analisar candidatos com IA
          </p>
        </div>
        <Button onClick={() => setShowUploader(!showUploader)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload CVs
        </Button>
      </div>

      {showUploader && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upload de CVs</CardTitle>
              <button
                onClick={() => setShowUploader(false)}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label className="text-sm font-medium text-[var(--color-text)] mb-2 block">
                Selecionar Vaga
              </label>
              <select
                value={selectedJobId === "all" ? "" : selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value || "all")}
                className="w-full px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text)]"
              >
                <option value="">Escolhe uma vaga...</option>
                {jobs
                  .filter((j) => j.status === "active")
                  .map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
              </select>
            </div>

            {selectedJobId && selectedJobId !== "all" ? (
              <CVUploader
                jobId={selectedJobId}
                onUploadComplete={() => {
                  fetchCandidates();
                  setShowUploader(false);
                }}
              />
            ) : (
              <p className="text-sm text-[var(--color-text-muted)] text-center py-4">
                Seleciona uma vaga para fazer upload de CVs
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[var(--color-text-muted)]" />
          <span className="text-sm text-[var(--color-text-muted)]">Vaga:</span>
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="px-3 py-1.5 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)]"
          >
            <option value="all">Todas ({candidates.length})</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title} ({candidates.filter((c) => c.jobId === job.id).length})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--color-text-muted)]">Estado:</span>
          <div className="flex gap-1">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                statusFilter === "all"
                  ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                  : "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
              }`}
            >
              Todos
            </button>
            {Object.entries(CANDIDATE_STATUS_LABELS).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  statusFilter === value
                    ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                    : "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {sortedCandidates.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-[var(--color-text-muted)] mb-4">
              {candidates.length === 0
                ? "Nenhum candidato ainda."
                : "Nenhum candidato corresponde aos filtros."}
            </p>
            {candidates.length === 0 && (
              <Button onClick={() => setShowUploader(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Fazer Upload de CVs
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sortedCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onAnalyze={handleAnalyze}
              onDelete={handleDelete}
              analyzing={analyzingId === candidate.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CandidatesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
        </div>
      }
    >
      <CandidatesContent />
    </Suspense>
  );
}
