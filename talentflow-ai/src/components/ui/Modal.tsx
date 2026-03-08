"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={`relative bg-slate-800 rounded-2xl p-6 w-full ${sizes[size]} border border-slate-700 shadow-2xl mx-4`}
      >
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 id="modal-title" className="text-xl font-bold text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
