"use client";

import { useState } from "react";

interface VideoBackgroundProps {
  src?: string;
  fallbackGradient?: string;
}

export default function VideoBackground({ 
  src = "/videos/hero-bg.mp4",
  fallbackGradient = "linear-gradient(135deg, #0A192F 0%, #112240 50%, #0A192F 100%)"
}: VideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <>
      {/* Fallback Gradient - mostra enquanto o vídeo não carrega */}
      {!videoLoaded && (
        <div 
          className="absolute inset-0 z-0"
          style={{ background: fallbackGradient }}
        />
      )}
      
      {/* Vídeo de Fundo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`
          absolute inset-0 w-full h-full object-cover z-0
          transition-opacity duration-1000
          ${videoLoaded ? "opacity-20" : "opacity-0"}
        `}
      >
        <source src={src} type="video/mp4" />
        {/* Fallback para browsers antigos */}
        <source src={src.replace(".mp4", ".webm")} type="video/webm" />
      </video>

      {/* Overlay para melhor legibilidade do texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-[#030712]/80 to-[#030712]/95 z-[1]" />
    </>
  );
}
