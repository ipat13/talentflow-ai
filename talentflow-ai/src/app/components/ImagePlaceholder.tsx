"use client";

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  className?: string;
  icon?: string;
}

export default function ImagePlaceholder({ 
  src,
  alt,
  className = "",
  icon = "🎯"
}: ImagePlaceholderProps) {
  
  // Se tiver src, usa a imagem real
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    );
  }

  // Placeholder animado quando não há imagem
  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-[#112240] to-[#0A192F]
        border border-[#233554]
        flex flex-col items-center justify-center gap-4
        ${className}
      `}
    >
      {/* Padrão de grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 210, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 210, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Ícone central */}
      <div className="relative z-10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00D2FF]/20 to-[#7C3AED]/20 flex items-center justify-center border border-[#00D2FF]/30">
          <span className="text-4xl">{icon}</span>
        </div>
      </div>
      
      {/* Texto */}
      <div className="relative z-10 text-center">
        <p className="text-[#94a3b8] text-sm">{alt}</p>
      </div>
      
      {/* Efeito glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#00D2FF]/10 rounded-full blur-3xl" />
    </div>
  );
}
