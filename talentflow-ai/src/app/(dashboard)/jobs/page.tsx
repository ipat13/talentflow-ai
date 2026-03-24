"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Textarea } from "@/components/ui";
import { Job, JobType, JobStatus, JOB_TYPE_LABELS, JOB_STATUS_LABELS } from "@/types";
import { Plus, Search, MapPin, DollarSign, Users, X, Loader2, Edit, Trash2 } from "lucide-react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<{
    title: string;
    company: string;
    location: string;
    type: JobType;
    salary: string;
    description: string;
    status: JobStatus;
  }>({
    title: "",
    company: "",
    location: "",
    type: "full-time",
    salary: "",
    description: "",
    status: "active",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.company) return;
    setSaving(true);

    try {
      const url = editingJob ? `/api/jobs/${editingJob.id}` : "/api/jobs";
      const method = editingJob ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchJobs();
        closeModal();
      }
    } catch (error) {
      console.error("Error saving job:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tens a certeza que queres eliminar esta vaga?")) return;

    try {
      const response = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (response.ok) {
        setJobs((prev) => prev.filter((j) => j.id !== id));
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location || "",
      type: job.type,
      salary: job.salary || "",
      description: job.description || "",
      status: job.status,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingJob(null);
    setFormData({
      title: "",
      company: "",
      location: "",
      type: "full-time",
      salary: "",
      description: "",
      status: "active",
    });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Vagas</h1>
          <p className="text-slate-300">Gerir as tuas vagas de emprego</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Vaga
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400" />
          <Input
            placeholder="Pesquisar vagas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <div className="flex gap-2">
          {Object.entries(JOB_STATUS_LABELS).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setStatusFilter(value)}
              className={`px-3 py-1.5 text-sm rounded-lg ${
                statusFilter === value
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <Card className="bg-slate-800/80 border-slate-700">
          <CardContent className="py-12 text-center">
            <p className="text-slate-300 mb-4">
              {jobs.length === 0 ? "Nenhuma vaga ainda." : "Nenhuma vaga corresponde à pesquisa."}
            </p>
            {jobs.length === 0 && (
              <Button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeira Vaga
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="bg-slate-800/80 border-slate-700 hover:border-slate-600">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                      <Badge
                        variant={job.status === "active" ? "success" : "default"}
                      >
                        {JOB_STATUS_LABELS[job.status]}
                      </Badge>
                    </div>
                    <p className="text-slate-300 mb-3">{job.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job._count?.candidates || 0} candidatos
                      </span>
                      {job.salary && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                      )}
                      <Badge variant="info">{JOB_TYPE_LABELS[job.type]}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(job)}>
                      <Edit className="w-4 h-4 text-slate-400" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(job.id)}>
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-lg border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingJob ? "Editar Vaga" : "Criar Nova Vaga"}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-200 text-sm mb-2 block">Localização</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Remote, Lisboa"
                  />
                </div>
                <div>
                  <label className="text-slate-200 text-sm mb-2 block">Tipo</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
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
                  placeholder="€50k - €70k"
                />
              </div>
              <div>
                <label className="text-slate-200 text-sm mb-2 block">Descrição</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white h-32"
                  placeholder="Descreve a vaga..."
                />
              </div>
              <div>
                <label className="text-slate-200 text-sm mb-2 block">Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                >
                  {Object.entries(JOB_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={saving || !formData.title || !formData.company}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                {saving ? "A guardar..." : editingJob ? "Guardar Alterações" : "Criar Vaga"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
