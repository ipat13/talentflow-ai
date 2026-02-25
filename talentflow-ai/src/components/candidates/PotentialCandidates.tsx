"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { PotentialCandidate } from "@/types/candidate";
import {
  Linkedin,
  Loader2,
  Plus,
  ExternalLink,
  UserPlus,
  Trash2,
  MapPin,
  Building,
} from "lucide-react";

interface PotentialCandidatesProps {
  jobId?: string;
  onConvert?: () => void;
}

export function PotentialCandidates({ jobId, onConvert }: PotentialCandidatesProps) {
  const [candidates, setCandidates] = useState<PotentialCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const [convertingId, setConvertingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const url = jobId ? `/api/potential-candidates?jobId=${jobId}` : "/api/potential-candidates";
      const response = await fetch(url);
      const data = await response.json();
      setCandidates(data.candidates || []);
    } catch (err) {
      console.error("Error fetching potential candidates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const handleAdd = async () => {
    if (!linkedInUrl.trim()) return;

    setAdding(true);
    setError(null);

    try {
      const response = await fetch("/api/potential-candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedInUrl, jobId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add candidate");
      }

      setLinkedInUrl("");
      fetchCandidates();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add candidate");
    } finally {
      setAdding(false);
    }
  };

  const handleConvert = async (id: string) => {
    setConvertingId(id);
    try {
      const response = await fetch(`/api/potential-candidates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ convertToCandidate: true, jobId }),
      });

      if (response.ok) {
        setCandidates((prev) => prev.filter((c) => c.id !== id));
        onConvert?.();
      }
    } catch (err) {
      console.error("Error converting candidate:", err);
    } finally {
      setConvertingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remover este potencial candidato?")) return;

    try {
      await fetch(`/api/potential-candidates/${id}`, { method: "DELETE" });
      setCandidates((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting candidate:", err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Linkedin className="w-5 h-5 text-[#0A66C2]" />
          Potenciais Candidatos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <input
            type="url"
            value={linkedInUrl}
            onChange={(e) => setLinkedInUrl(e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="flex-1 px-3 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          <Button onClick={handleAdd} disabled={adding || !linkedInUrl.trim()}>
            {adding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            <span className="ml-2 hidden sm:inline">Adicionar</span>
          </Button>
        </div>

        {error && (
          <p className="text-sm text-[var(--color-danger)]">{error}</p>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-[var(--color-primary)]" />
          </div>
        ) : candidates.length === 0 ? (
          <p className="text-sm text-[var(--color-text-muted)] text-center py-4">
            Nenhum potencial candidato adicionado ainda.
          </p>
        ) : (
          <div className="space-y-3">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="p-4 border border-[var(--color-border)] rounded-lg hover:border-[var(--color-primary)] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-[var(--color-text)] truncate">
                        {candidate.name}
                      </h4>
                      <a
                        href={candidate.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-text-muted)] hover:text-[#0A66C2]"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    {candidate.headline && (
                      <p className="text-sm text-[var(--color-text-muted)] mb-2">
                        {candidate.headline}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 text-xs text-[var(--color-text-muted)]">
                      {candidate.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {candidate.location}
                        </span>
                      )}
                      {candidate.company && (
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {candidate.company}
                        </span>
                      )}
                    </div>

                    {candidate.skills && candidate.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {candidate.skills.slice(0, 5).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-xs bg-[var(--color-surface)] text-[var(--color-text-muted)] rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleConvert(candidate.id)}
                      disabled={convertingId === candidate.id}
                      title="Converter em Candidato"
                    >
                      {convertingId === candidate.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <UserPlus className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(candidate.id)}
                      className="text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
