"use client";

import Link from "next/link";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import {
  Candidate,
  CANDIDATE_STATUS_LABELS,
  CANDIDATE_STATUS_VARIANTS,
} from "@/types/candidate";
import { Mail, Phone, MoreVertical, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

interface CandidateCardProps {
  candidate: Candidate;
  onAnalyze?: (id: string) => void;
  onDelete?: (id: string) => void;
  analyzing?: boolean;
}

export function CandidateCard({
  candidate,
  onAnalyze,
  onDelete,
  analyzing,
}: CandidateCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[var(--color-secondary)]";
    if (score >= 60) return "text-[var(--color-warning)]";
    return "text-[var(--color-text-muted)]";
  };

  return (
    <Card className="hover:shadow-[var(--shadow-lg)] transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/candidates/${candidate.id}`}
                className="text-lg font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)]"
              >
                {candidate.name}
              </Link>
              <Badge variant={CANDIDATE_STATUS_VARIANTS[candidate.status]}>
                {CANDIDATE_STATUS_LABELS[candidate.status]}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)] mb-3">
              {candidate.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {candidate.email}
                </span>
              )}
              {candidate.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {candidate.phone}
                </span>
              )}
            </div>

            {candidate.jobTitle && (
              <p className="text-sm text-[var(--color-text-muted)] mb-2">
                Vaga: {candidate.jobTitle}
              </p>
            )}

            {candidate.matchHighlights && candidate.matchHighlights.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {candidate.matchHighlights.slice(0, 3).map((highlight, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {candidate.matchScore !== null && candidate.matchScore !== undefined ? (
              <div className="text-center">
                <div
                  className={`text-2xl font-bold ${getScoreColor(candidate.matchScore)}`}
                >
                  {candidate.matchScore}%
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  Match
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAnalyze?.(candidate.id)}
                disabled={analyzing}
              >
                {analyzing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span className="ml-2">Analisar</span>
              </Button>
            )}

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
                      href={`/candidates/${candidate.id}`}
                      className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                    >
                      Ver Detalhes
                    </Link>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onDelete?.(candidate.id);
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
        </div>
      </CardContent>
    </Card>
  );
}
