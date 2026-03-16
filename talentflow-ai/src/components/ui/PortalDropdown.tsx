"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
}

export function PortalDropdown({
  isOpen,
  onClose,
  triggerRef,
  children,
}: PortalDropdownProps) {
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calcula a posição do dropdown
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const trigger = triggerRef.current;
      const rect = trigger.getBoundingClientRect();
      
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right - window.scrollX
      });
    }
  }, [isOpen, triggerRef]);

  // Fecha dropdown quando clica fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  // Renderiza via Portal se estiver aberto
  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={dropdownRef}
      className="fixed z-[999999] min-w-[12rem] bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2"
      style={{
        top: `${position.top}px`,
        right: `${position.right}px`,
      }}
    >
      {children}
    </div>,
    document.body
  );
}