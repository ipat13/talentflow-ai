"use client";

import { Modal } from "./Modal";
import { Button } from "./Button";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
  loading = false,
}: ConfirmModalProps) {
  const variantStyles = {
    danger: {
      icon: "bg-red-500/20 text-red-400",
      button: "bg-red-600 hover:bg-red-700",
    },
    warning: {
      icon: "bg-yellow-500/20 text-yellow-400",
      button: "bg-yellow-600 hover:bg-yellow-700",
    },
    info: {
      icon: "bg-blue-500/20 text-blue-400",
      button: "bg-indigo-600 hover:bg-indigo-700",
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-lg ${variantStyles[variant].icon}`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-slate-300 flex-1">{message}</p>
        </div>
        
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className={variantStyles[variant].button}
          >
            {loading ? "A processar..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
