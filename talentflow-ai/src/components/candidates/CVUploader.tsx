"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui";
import { Upload, FileText, X, Loader2, CheckCircle } from "lucide-react";

interface UploadedFile {
  name: string;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
  candidateId?: string;
}

interface CVUploaderProps {
  jobId: string;
  onUploadComplete?: () => void;
}

export function CVUploader({ jobId, onUploadComplete }: CVUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (f) => f.type === "application/pdf"
    );

    addFiles(droppedFiles);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(
        (f) => f.type === "application/pdf"
      );
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      name: file.name,
      status: "pending" as const,
    }));
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setUploading(true);

    const pendingFiles = files.filter((f) => f.status === "pending");
    const input = inputRef.current;

    if (!input?.files) {
      setUploading(false);
      return;
    }

    const fileArray = Array.from(input.files);
    const pdfFiles = fileArray.filter((f) => f.type === "application/pdf");

    for (let i = 0; i < pendingFiles.length; i++) {
      const fileIndex = files.findIndex((f) => f.name === pendingFiles[i].name && f.status === "pending");
      if (fileIndex === -1) continue;

      const file = pdfFiles.find((f) => f.name === pendingFiles[i].name);
      if (!file) continue;

      setFiles((prev) =>
        prev.map((f, idx) =>
          idx === fileIndex ? { ...f, status: "uploading" } : f
        )
      );

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("jobId", jobId);

        const response = await fetch("/api/candidates/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Upload failed");
        }

        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === fileIndex ? { ...f, status: "success" } : f
          )
        );
      } catch (error) {
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === fileIndex
              ? { ...f, status: "error", error: String(error) }
              : f
          )
        );
      }
    }

    setUploading(false);
    onUploadComplete?.();
  };

  const hasPendingFiles = files.some((f) => f.status === "pending");

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
            : "border-[var(--color-border)]"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-muted)]" />
        <p className="text-[var(--color-text)] mb-2">
          Arrasta ficheiros PDF para aqui
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">ou</p>
        <Button
          variant="secondary"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          Selecionar Ficheiros
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[var(--color-surface)] rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[var(--color-text-muted)]" />
                <span className="text-sm text-[var(--color-text)]">
                  {file.name}
                </span>
                {file.status === "uploading" && (
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--color-primary)]" />
                )}
                {file.status === "success" && (
                  <CheckCircle className="w-4 h-4 text-[var(--color-secondary)]" />
                )}
              </div>
              {file.status === "pending" && (
                <button
                  onClick={() => removeFile(index)}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              {file.status === "error" && (
                <span className="text-xs text-[var(--color-danger)]">
                  {file.error}
                </span>
              )}
            </div>
          ))}

          {hasPendingFiles && (
            <Button
              onClick={uploadFiles}
              disabled={uploading}
              className="w-full"
            >
              {uploading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              Upload {files.filter((f) => f.status === "pending").length} CVs
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
