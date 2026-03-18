"use client";

interface SectionImageProps {
  src: string;
  alt: string;
  className?: string;
  icon?: string;
}

export default function SectionImage({ 
  src,
  alt,
  className = "",
  icon = "🖼️"
}: SectionImageProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* Placeholder enquanto carrega */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#112240] to-[#0A192F] z-10 flex items-center justify-center transition-opacity duration-500"
        style={{ opacity: 0 }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      >
        <div className="text-center">
          <div className="text-5xl mb-2">{icon}</div>
          <p className="text-[#94a3b8] text-sm">{alt}</p>
        </div>
      </div>
      
      {/* Imagem real */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        onLoad={(e) => {
          const target = e.target as HTMLImageElement;
          const parent = target.parentElement;
          if (parent) {
            parent.querySelector('div')?.remove();
          }
        }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          const parent = target.parentElement;
          if (parent) {
            target.style.display = 'none';
          }
        }}
      />
    </div>
  );
}
