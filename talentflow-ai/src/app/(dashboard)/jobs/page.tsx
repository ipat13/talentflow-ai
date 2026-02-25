"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardContent } from "@/components/ui";
import { JobCard } from "@/components/jobs";
import { Job, JOB_STATUS_LABELS } from "@/types/job";
import { Plus, Loader2 } from "lucide-react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

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

  const handleDelete = async (id: string) => {
    if (!confirm("Tens a certeza que queres eliminar esta vaga?")) return;

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setJobs((prev) => prev.filter((job) => job.id !== id));
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (statusFilter === "all") return true;
    return job.status === statusFilter;
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
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Vagas</h1>
          <p className="text-[var(--color-text-muted)]">
            Gerir as posições em aberto
          </p>
        </div>
        <Link href="/jobs/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Vaga
          </Button>
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            statusFilter === "all"
              ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
              : "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
          }`}
        >
          Todas ({jobs.length})
        </button>
        {Object.entries(JOB_STATUS_LABELS).map(([value, label]) => (
          <button
            key={value}
            onClick={() => setStatusFilter(value)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              statusFilter === value
                ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                : "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
            }`}
          >
            {label} ({jobs.filter((j) => j.status === value).length})
          </button>
        ))}
      </div>

      {filteredJobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-[var(--color-text-muted)] mb-4">
              {statusFilter === "all"
                ? "Nenhuma vaga criada ainda."
                : `Nenhuma vaga ${JOB_STATUS_LABELS[statusFilter as keyof typeof JOB_STATUS_LABELS]?.toLowerCase()}.`}
            </p>
            <Link href="/jobs/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeira Vaga
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
