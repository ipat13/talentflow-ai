export type JobType = "full-time" | "part-time" | "contract" | "remote";
export type JobStatus = "draft" | "active" | "closed";

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  description: string;
  requirements: string[];
  competencies: string[];
  status: JobStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobInput {
  title: string;
  department: string;
  location: string;
  type: JobType;
  description?: string;
  requirements?: string[];
  competencies?: string[];
  status?: JobStatus;
}

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  "full-time": "Tempo Inteiro",
  "part-time": "Part-time",
  "contract": "Contrato",
  "remote": "Remoto",
};

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  draft: "Rascunho",
  active: "Ativa",
  closed: "Fechada",
};
