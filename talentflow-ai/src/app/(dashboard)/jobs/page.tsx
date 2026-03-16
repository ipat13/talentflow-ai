"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input, Textarea } from "@/components/ui";
import { Job, JobType, JobStatus, JOB_TYPE_LABELS, JOB_STATUS_LABELS } from "@/types";
import { Plus, Search, MapPin, DollarSign, Users, X, Loader2, Edit, Trash2, Briefcase } from "lucide-react";

function JobSkeleton() {
  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-6 w-48 bg-slate-700 rounded"></div>
            <div className="h-5 w-16 bg-slate-700 rounded"></div>
          </div>
          <div className="h-4 w-32 bg-slate-700 rounded mb-3"></div>
          <div className="flex gap-4">
            <div className="h-4 w-24 bg-slate-700 rounded"></div>
            <div className="h-4 w-20 bg-slate-700 rounded"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-slate-700 rounded"></div>
          <div className="h-8 w-8 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-32 h-32 mb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full"></div>
        <div className="absolute inset-4 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full"></div>
        <Briefcase className="absolute inset-0 m-auto w-12 h-12 text-indigo-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Nenhuma vaga ainda</h3>
      <p className="text-slate-400 mb-6 max-w-md">
        Cria a tua primeira vaga de emprego para começar a receber candidatos e utilizar as funcionalidades de IA.
      </p>
      <Button onClick={onCreate} className="bg-indigo-600 hover:bg-indigo-700">
        <Plus className="w-4 h-4 mr-2" />
        Criar Primeira Vaga
      </Button>
    </div>
  );
}

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-24 bg-slate-700 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-48 bg-slate-700 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-slate-700 rounded animate-pulse"></div>
        </div>

        <div className="flex gap-4">
          <div className="h-10 w-64 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-10 w-20 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-10 w-20 bg-slate-700 rounded animate-pulse"></div>
        </div>

        <div className="space-y-4">
          <JobSkeleton />
          <JobSkeleton />
          <JobSkeleton />
        </div>
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
            id="search"
            name="search"
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
          <CardContent className="p-6">
            {jobs.length === 0 ? (
              <EmptyState onCreate={() => setShowModal(true)} />
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-300 mb-4">Nenhuma vaga corresponde à pesquisa.</p>
                <Button onClick={() => { setSearchQuery(""); setStatusFilter("all"); }} variant="outline">
                  Limpar Filtros
                </Button>
              </div>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110]">
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
                <label htmlFor="title" className="text-slate-200 text-sm mb-2 block">Título *</label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Ex: Senior Frontend Engineer"
                />
              </div>
              <div>
                <label htmlFor="company" className="text-slate-200 text-sm mb-2 block">Empresa *</label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Ex: Tech Corp"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="text-slate-200 text-sm mb-2 block">Localização</label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Remote, Lisboa"
                  />
                </div>
                <div>
                  <label htmlFor="type" className="text-slate-200 text-sm mb-2 block">Tipo</label>
                  <select
                    id="type"
                    name="type"
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
                <label htmlFor="salary" className="text-slate-200 text-sm mb-2 block">Salário</label>
                <Input
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="€50k - €70k"
                />
              </div>
              <div>
                <label htmlFor="description" className="text-slate-200 text-sm mb-2 block">Descrição</label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white h-32"
                  placeholder="Descreve a vaga..."
                />
              </div>
              <div>
                <label htmlFor="status" className="text-slate-200 text-sm mb-2 block">Estado</label>
                <select
                  id="status"
                  name="status"
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
