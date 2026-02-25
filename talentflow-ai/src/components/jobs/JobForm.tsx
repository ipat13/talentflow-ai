"use client";

import { useState } from "react";
import { Button, Input, Card, CardContent, Badge } from "@/components/ui";
import { Job, JobInput, JOB_TYPE_LABELS, JOB_STATUS_LABELS } from "@/types/job";
import { Sparkles, X, Plus, Loader2 } from "lucide-react";

interface JobFormProps {
  job?: Job;
  onSubmit: (data: JobInput) => Promise<void>;
  onCancel: () => void;
}

export function JobForm({ job, onSubmit, onCancel }: JobFormProps) {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState<JobInput>({
    title: job?.title || "",
    department: job?.department || "",
    location: job?.location || "",
    type: job?.type || "full-time",
    description: job?.description || "",
    requirements: job?.requirements || [],
    competencies: job?.competencies || [],
    status: job?.status || "draft",
  });
  const [newRequirement, setNewRequirement] = useState("");
  const [newCompetency, setNewCompetency] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...(prev.requirements || []), newRequirement.trim()],
      }));
      setNewRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements?.filter((_, i) => i !== index),
    }));
  };

  const addCompetency = () => {
    if (newCompetency.trim()) {
      setFormData((prev) => ({
        ...prev,
        competencies: [...(prev.competencies || []), newCompetency.trim()],
      }));
      setNewCompetency("");
    }
  };

  const removeCompetency = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      competencies: prev.competencies?.filter((_, i) => i !== index),
    }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.title || !formData.competencies?.length) {
      alert("Preenche o título e pelo menos uma competência para gerar a descrição");
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch("/api/ai/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          competencies: formData.competencies,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate description");
      }

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        description: data.description,
        requirements: data.requirements,
      }));
    } catch (error) {
      console.error("Error generating description:", error);
      alert("Erro ao gerar descrição. Verifica a API DeepSeek.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Erro ao guardar vaga.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Título da Vaga *"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ex: Senior React Developer"
          required
        />

        <Input
          label="Departamento *"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Ex: Engineering"
          required
        />

        <Input
          label="Localização *"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Ex: Lisboa, Portugal"
          required
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--color-text)]">
            Tipo de Vaga *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            {Object.entries(JOB_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--color-text)]">
            Estado
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            {Object.entries(JOB_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-text)]">
              Competências Chave
            </h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleGenerateDescription}
              disabled={generating || !formData.title || !formData.competencies?.length}
            >
              {generating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Gerar com IA
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {formData.competencies?.map((comp, index) => (
              <Badge key={index} variant="info" className="gap-1">
                {comp}
                <button
                  type="button"
                  onClick={() => removeCompetency(index)}
                  className="ml-1 hover:text-[var(--color-danger)]"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Adicionar competência..."
              value={newCompetency}
              onChange={(e) => setNewCompetency(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCompetency())}
            />
            <Button type="button" variant="secondary" onClick={addCompetency}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--color-text)]">
          Descrição
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          placeholder="Descrição completa da vaga..."
          className="px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
        />
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-sm font-medium text-[var(--color-text)] mb-4">
            Requisitos
          </h3>

          <div className="space-y-2 mb-3">
            {formData.requirements?.map((req, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-[var(--color-surface-hover)] rounded-[var(--radius-sm)]"
              >
                <span className="text-sm text-[var(--color-text)]">{req}</span>
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Adicionar requisito..."
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
            />
            <Button type="button" variant="secondary" onClick={addRequirement}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : null}
          {job ? "Guardar Alterações" : "Criar Vaga"}
        </Button>
      </div>
    </form>
  );
}
