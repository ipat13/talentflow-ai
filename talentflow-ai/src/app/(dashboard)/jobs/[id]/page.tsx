"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Textarea } from "@/components/ui";
import { Job, JobType, JobStatus, JOB_TYPE_LABELS, JOB_STATUS_LABELS } from "@/types";
import { CandidateCard } from "@/components/candidates/CandidateCard";
import { ArrowLeft, Loader2, Sparkles, Trash2, MapPin, Users, DollarSign, Briefcase, Linkedin, Upload } from "lucide-react";

function JobDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");

  const [job, setJob] = useState<Job | null>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    department: "",
    location: "",
    type: "full-time" as JobType,
    salary: "",
    description: "",
    requirements: "",
    competencies: "",
    status: "active" as JobStatus,
  });

  useEffect(() => {
    if (jobId) {
      fetchJob();
      fetchCandidates();
    }
  }, [jobId]);

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`);
      const data = await response.json();
      if (data.job) {
        setJob(data.job);
        setFormData({
          title: data.job.title,
          company: data.job.company,
          department: data.job.department || "",
          location: data.job.location || "",
          type: data.job.type,
          salary: data.job.salary || "",
          description: data.job.description || "",
          requirements: data.job.requirements?.join("\n") || "",
          competencies: data.job.competencies?.join(", ") || "",
          status: data.job.status,
        });
      }
    } catch (error) {
      console.error("Error fetching job:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCandidates = async () => {
    try {
      const response = await fetch(`/api/candidates?jobId=${jobId}`);
      const data = await response.json();
      setCandidates(data.candidates || []);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          requirements: formData.requirements.split("\n").filter((r) => r.trim()),
          competencies: formData.competencies.split(",").map((c) => c.trim()).filter(Boolean),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setJob(data.job);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving job:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tens a certeza que queres eliminar esta vaga? Esta ação não pode ser desfeita.")) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (response.ok) {
        router.push("/jobs");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.title || !formData.requirements) {
      alert("Por favor, preenche o título e os requisitos para gerar a descrição.");
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch("/api/ai/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          requirements: formData.requirements.split("\n").filter((r) => r.trim()),
        }),
      });

      const data = await response.json();
      if (data.description) {
        setFormData((prev) => ({
          ...prev,
          description: data.description,
          competencies: data.competencies?.join(", ") || "",
        }));
      }
    } catch (error) {
      console.error("Error generating description:", error);
    } finally {
      setGenerating(false);
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
      }
    } catch (error) {
      console.error("Error analyzing candidate:", error);
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleDeleteCandidate = async (candidateId: string) => {
    if (!confirm("Tens a certeza que queres eliminar este candidato?")) return;

    try {
      const response = await fetch(`/api/candidates/${candidateId}`, { method: "DELETE" });
      if (response.ok) {
        setCandidates((prev) => prev.filter((c) => c.id !== candidateId));
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-slate-400">Vaga não encontrada</p>
        <Button onClick={() => router.push("/jobs")} className="bg-indigo-600 hover:bg-indigo-700">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar às Vagas
        </Button>
      </div>
    );
  }

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (a.matchScore === null || a.matchScore === undefined) return 1;
    if (b.matchScore === null || b.matchScore === undefined) return -1;
    return b.matchScore - a.matchScore;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push("/jobs")}
          className="flex items-center gap-2 text-slate-300 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar às Vagas
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white text-xl">
                    {isEditing ? "Editar Vaga" : job.title}
                  </CardTitle>
                  {!isEditing && (
                    <p className="text-slate-300 mt-1">{job.company}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Guardar"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="border-slate-600 text-slate-300"
                      >
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-slate-200 text-sm mb-2 block">Título</label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-200 text-sm mb-2 block">Empresa</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-slate-200 text-sm mb-2 block">Departamento</label>
                        <Input
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-200 text-sm mb-2 block">Localização</label>
                        <Input
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-200 text-sm mb-2 block">Tipo</label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value as JobType })}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                        >
                          {Object.entries(JOB_TYPE_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-slate-200 text-sm mb-2 block">Salário</label>
                      <Input
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-slate-200 text-sm">Requisitos</label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleGenerateDescription}
                          disabled={generating}
                          className="text-indigo-400"
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Gerar com IA
                        </Button>
                      </div>
                      <Textarea
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white h-20"
                      />
                    </div>
                    <div>
                      <label className="text-slate-200 text-sm mb-2 block">Competências</label>
                      <Input
                        value={formData.competencies}
                        onChange={(e) => setFormData({ ...formData, competencies: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-200 text-sm mb-2 block">Descrição</label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white h-32"
                      />
                    </div>
                    <div>
                      <label className="text-slate-200 text-sm mb-2 block">Estado</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as JobStatus })}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                      >
                        {Object.entries(JOB_STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                      )}
                      {job.salary && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                      )}
                      <Badge variant={job.status === "active" ? "success" : "default"}>
                        {JOB_STATUS_LABELS[job.status]}
                      </Badge>
                    </div>
                    {job.description && (
                      <div>
                        <h3 className="text-slate-200 font-medium mb-2">Descrição</h3>
                        <p className="text-slate-300 whitespace-pre-wrap">{job.description}</p>
                      </div>
                    )}
                    {job.requirements && job.requirements.length > 0 && (
                      <div>
                        <h3 className="text-slate-200 font-medium mb-2">Requisitos</h3>
                        <ul className="list-disc list-inside text-slate-300 space-y-1">
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {job.competencies && job.competencies.length > 0 && (
                      <div>
                        <h3 className="text-slate-200 font-medium mb-2">Competências</h3>
                        <div className="flex flex-wrap gap-2">
                          {job.competencies.map((comp, idx) => (
                            <Badge key={idx} variant="info">{comp}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  Candidatos ({sortedCandidates.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sortedCandidates.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">
                    Nenhum candidato ainda. Faz upload de CVs ou importa do LinkedIn.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {sortedCandidates.map((candidate) => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        onAnalyze={handleAnalyze}
                        onDelete={handleDeleteCandidate}
                        analyzing={analyzingId === candidate.id}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Candidatos
                  </span>
                  <span className="text-white font-bold">{candidates.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Tipo
                  </span>
                  <Badge variant="info">{JOB_TYPE_LABELS[job.type]}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start"
                  onClick={() => {}}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload CVs
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start"
                  onClick={() => {}}
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Importar LinkedIn
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    }>
      <JobDetailContent />
    </Suspense>
  );
}
