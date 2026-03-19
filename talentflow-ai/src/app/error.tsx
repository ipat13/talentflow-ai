"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F7FFF7] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl p-8 border border-[#E2E8F0] shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">⚠️</span>
        </div>
        
        <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">
          Something went wrong
        </h2>
        
        <p className="text-[#95A5A6] mb-8">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-medium bg-[#006EB8] text-white hover:bg-[#005A9C] transition-colors"
        >
          Try Again
        </button>
        
        <p className="mt-4 text-sm text-[#95A5A6]">
          Error ID: {error.digest || "Unknown"}
        </p>
      </div>
    </div>
  );
}
