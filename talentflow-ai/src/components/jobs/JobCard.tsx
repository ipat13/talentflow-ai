"use client";

import Link from "next/link";
import { Card, CardContent, Badge } from "@/components/ui";
import { Job, JOB_TYPE_LABELS, JOB_STATUS_LABELS } from "@/types/job";
import { Users, MapPin, Briefcase, MoreVertical } from "lucide-react";
import { useState } from "react";

interface JobCardProps {
  job: Job;
  candidateCount?: number;
  onDelete?: (id: string) => void;
}

export function JobCard({ job, candidateCount = 0, onDelete }: JobCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const statusVariant = {
    draft: "default" as const,
    active: "success" as const,
    closed: "danger" as const,
  };

  return (
    <Card className="hover:shadow-[var(--shadow-lg)] transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/jobs/${job.id}`}
                className="text-lg font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)]"
              >
                {job.title}
              </Link>
              <Badge variant={statusVariant[job.status]}>
                {JOB_STATUS_LABELS[job.status]}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)] mb-3">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.department}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <Badge variant="default">{JOB_TYPE_LABELS[job.type]}</Badge>
            </div>

            {job.description && (
              <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-3">
                {job.description}
              </p>
            )}

            {job.competencies && job.competencies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {job.competencies.slice(0, 4).map((comp, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-0.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full"
                  >
                    {comp}
                  </span>
                ))}
                {job.competencies.length > 4 && (
                  <span className="text-xs text-[var(--color-text-muted)]">
                    +{job.competencies.length - 4} mais
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)]"
            >
              <MoreVertical className="w-4 h-4 text-[var(--color-text-muted)]" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-40 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-lg z-20">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                  >
                    Ver Detalhes
                  </Link>
                  <Link
                    href={`/jobs/${job.id}?edit=true`}
                    className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete?.(job.id);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[var(--color-danger)] hover:bg-[var(--color-surface-hover)]"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
            <Users className="w-4 h-4" />
            <span>{candidateCount} candidatos</span>
          </div>
          <span className="text-xs text-[var(--color-text-muted)]">
            {new Date(job.createdAt).toLocaleDateString("pt-PT")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
