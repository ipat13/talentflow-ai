"use client";

import { useState, useEffect, Suspense } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { CVUploader, CandidateCard } from "@/components/candidates";
import { Candidate, Job, CANDIDATE_STATUS_LABELS } from "@/types";
import { Upload, Loader2, Filter, X, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";

function CandidateSkeleton() {
  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 md:p-6 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-700 rounded-full"></div>
          <div>
            <div className="h-4 md:h-5 w-32 md:w-40 bg-slate-700 rounded mb-2"></div>
            <div className="h-3 md:h-4 w-24 md:w-32 bg-slate-700 rounded"></div>
          </div>
        </div>
        <div className="flex gap-2 self-end md:self-auto">
          <div className="h-8 w-16 md:w-20 bg-slate-700 rounded"></div>
          <div className="h-8 w-8 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onUpload }: { onUpload: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-32 h-32 mb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full"></div>
        <div className="absolute inset-4 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-full"></div>
        <Users className="absolute inset-0 m-auto w-12 h-12 text-emerald-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Nenhum candidato ainda</h3>
      <p className="text-slate-400 mb-6 max-w-md">
        Faz upload dos CVs dos candidatos para utilizar a IA para analisar e encontrar os melhores matches.
      </p>
      <Button onClick={onUpload} className="bg-emerald-600 hover:bg-emerald-700">
        <Upload className="w-4 h-4 mr-2" />
        Fazer Upload de CVs
      </Button>
    </div>
  );
}

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 p-4 md:p-8 space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="h-6 md:h-8 w-32 bg-slate-700 rounded animate-pulse mb-2"></div>
            <div className="h-3 md:h-4 w-48 bg-slate-700 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-full md:w-36 bg-slate-700 rounded animate-pulse"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="h-10 w-full md:w-40 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-10 w-full md:w-20 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-10 w-full md:w-20 bg-slate-700 rounded animate-pulse"></div>
        </div>

        <div className="space-y-3 md:space-y-4">
          <CandidateSkeleton />
          <CandidateSkeleton />
          <CandidateSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 p-4 md:p-8 space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Candidatos</h1>
          <p className="text-slate-300 text-sm md:text-base">Gerir e analisar candidatos com IA</p>
        </div>
        <Button onClick={() => setShowUploader(!showUploader)} className="bg-indigo-600 hover:bg-indigo-700 w-full md:w-auto">
          <Upload className="w-4 h-4 mr-2" />
          Upload CVs
        </Button>
      </div>

      {showUploader && (
        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Upload de CVs</CardTitle>
              <button onClick={() => setShowUploader(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label className="text-slate-200 text-sm mb-2 block">Selecionar Vaga</label>
              <select
                value={selectedJobId === "all" ? "" : selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value || "all")}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              >
                <option value="">Escolhe uma vaga...</option>
                {jobs.filter((j) => j.status === "active").map((job) => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
            </div>

            {selectedJobId && selectedJobId !== "all" ? (
              <CVUploader jobId={selectedJobId} onUploadComplete={() => { fetchCandidates(); setShowUploader(false); }} />
            ) : (
              <p className="text-slate-400 text-center py-4">Seleciona uma vaga para fazer upload de CVs</p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-300" />
            <span className="text-slate-200 text-sm">Vaga:</span>
          </div>
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="px-3 py-2 md:py-1.5 text-sm bg-slate-700 border border-slate-600 rounded-lg text-white w-full md:w-auto"
          >
            <option value="all">Todas ({candidates.length})</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>{job.title} ({candidates.filter((c) => c.jobId === job.id).length})</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <span className="text-slate-200 text-sm">Estado:</span>
          <div className="flex flex-wrap gap-1">
            <button onClick={() => setStatusFilter("all")} className={`px-3 py-2 md:py-1.5 text-sm rounded-lg ${statusFilter === "all" ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-200 hover:bg-slate-600"}`}>Todos</button>
            {Object.entries(CANDIDATE_STATUS_LABELS).map(([value, label]) => (
              <button key={value} onClick={() => setStatusFilter(value)} className={`px-3 py-2 md:py-1.5 text-sm rounded-lg ${statusFilter === value ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-200 hover:bg-slate-600"}`}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      {sortedCandidates.length === 0 ? (
        <Card className="bg-slate-800/80 border-slate-700">
          <CardContent className="p-6">
            {candidates.length === 0 ? (
              <EmptyState onUpload={() => setShowUploader(true)} />
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-300 mb-4">Nenhum candidato corresponde aos filtros.</p>
                <Button onClick={() => { setSelectedJobId("all"); setStatusFilter("all"); }} variant="outline">
                  Limpar Filtros
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
       ) : (
        <div className="grid gap-3 md:gap-4">
          {sortedCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} onAnalyze={handleAnalyze} onDelete={handleDelete} analyzing={analyzingId === candidate.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CandidatesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-white" /></div>}>
      <CandidatesContent />
    </Suspense>
  );
}
