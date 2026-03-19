"use client";

export function PageLoader() {
  return (
    <div className="min-h-screen bg-[#F7FFF7] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#E2E8F0] border-t-[#006EB8] animate-spin" />
        <p className="mt-4 text-[#95A5A6]">Loading...</p>
      </div>
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="space-y-4">
        <div className="h-8 bg-[#E2E8F0] rounded w-1/4 mx-auto" />
        <div className="h-12 bg-[#E2E8F0] rounded w-2/3 mx-auto" />
        <div className="h-4 bg-[#E2E8F0] rounded w-full" />
        <div className="h-4 bg-[#E2E8F0] rounded w-5/6 mx-auto" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-8 border border-[#E2E8F0] animate-pulse">
      <div className="w-14 h-14 bg-[#E2E8F0] rounded-xl mb-6" />
      <div className="h-6 bg-[#E2E8F0] rounded w-3/4 mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-[#E2E8F0] rounded w-full" />
        <div className="h-4 bg-[#E2E8F0] rounded w-5/6" />
      </div>
    </div>
  );
}
