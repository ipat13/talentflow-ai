export type CandidateSource = "upload" | "linkedin" | "manual";
export type CandidateStatus = "new" | "reviewing" | "interview" | "offer" | "rejected";

export interface CandidateAnalysis {
  skillsMatch?: {
    matched: string[];
    missing: string[];
  };
  experience?: {
    yearsFound: number;
    relevantRoles: string[];
  };
  education?: {
    level: string;
    field: string;
  };
  recommendation?: "strong_match" | "good_match" | "potential" | "weak_match";
  recommendationReason?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cvUrl: string;
  cvText?: string;
  source: CandidateSource;
  matchScore?: number;
  matchHighlights?: string[];
  analysis?: CandidateAnalysis;
  jobId: string;
  jobTitle?: string;
  status: CandidateStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CandidateInput {
  name: string;
  email: string;
  phone?: string;
  cvUrl?: string;
  cvText?: string;
  source?: CandidateSource;
  jobId: string;
  status?: CandidateStatus;
  notes?: string;
}

export interface PotentialCandidate {
  id: string;
  name: string;
  linkedInUrl: string;
  headline?: string;
  location?: string;
  company?: string;
  summary?: string;
  skills?: string[];
  source: "linkedin";
  jobId?: string;
  jobTitle?: string;
  createdAt: Date;
}

export interface PotentialCandidateInput {
  linkedInUrl: string;
  jobId?: string;
}

export const CANDIDATE_STATUS_LABELS: Record<CandidateStatus, string> = {
  new: "Novo",
  reviewing: "Em Análise",
  interview: "Entrevista",
  offer: "Proposta",
  rejected: "Rejeitado",
};

export const CANDIDATE_STATUS_VARIANTS: Record<CandidateStatus, "default" | "info" | "warning" | "success" | "danger"> = {
  new: "info",
  reviewing: "warning",
  interview: "default",
  offer: "success",
  rejected: "danger",
};
