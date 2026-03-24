"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea } from "@/components/ui";
import { JobType, JobStatus, JOB_TYPE_LABELS, JOB_STATUS_LABELS } from "@/types";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
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
    status: "draft" as JobStatus,
  });

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
      alert("Erro ao gerar descrição. Tenta novamente.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.company) {
      alert("Por favor, preenche o título e a empresa.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          requirements: formData.requirements.split("\n").filter((r) => r.trim()),
          competencies: formData.competencies.split(",").map((c) => c.trim()).filter(Boolean),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/jobs/${data.job.id}`);
      }
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Erro ao criar vaga. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push("/jobs")}
          className="flex items-center gap-2 text-slate-300 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar às Vagas
        </button>

        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-xl">Criar Nova Vaga</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-200 text-sm mb-2 block">Título *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Ex: Senior Frontend Engineer"
                />
              </div>
              <div>
                <label className="text-slate-200 text-sm mb-2 block">Empresa *</label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Ex: Tech Corp"
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
                  placeholder="Ex: Engineering"
                />
              </div>
              <div>
                <label className="text-slate-200 text-sm mb-2 block">Localização</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Ex: Remote, Lisboa"
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
                placeholder="Ex: €50k - €70k"
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
                  disabled={generating || !formData.title}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  {generating ? (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-1" />
                  )}
                  Gerar com IA
                </Button>
              </div>
              <Textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white h-24"
                placeholder="Ex:&#10;React 3+ anos&#10;TypeScript&#10;Node.js"
              />
            </div>

            <div>
              <label className="text-slate-200 text-sm mb-2 block">Competências</label>
              <Input
                value={formData.competencies}
                onChange={(e) => setFormData({ ...formData, competencies: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Ex: Leadership, Comunicação, Trabalho em equipa"
              />
            </div>

            <div>
              <label className="text-slate-200 text-sm mb-2 block">Descrição</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white h-40"
                placeholder="Descreve a vaga, responsabilidades, benefícios..."
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

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Criar Vaga
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/jobs")}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
