"use client";

import { useRouter } from "next/navigation";
import { JobForm } from "@/components/jobs";
import { JobInput } from "@/types/job";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewJobPage() {
  const router = useRouter();

  const handleSubmit = async (data: JobInput) => {
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/jobs");
    } else {
      throw new Error("Failed to create job");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/jobs"
          className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Nova Vaga
          </h1>
          <p className="text-[var(--color-text-muted)]">
            Cria uma nova posição e usa IA para gerar a descrição
          </p>
        </div>
      </div>

      <JobForm onSubmit={handleSubmit} onCancel={() => router.push("/jobs")} />
    </div>
  );
}
