"use client";

import { useState } from "react";

interface VideoBackgroundProps {
  src?: string;
  fallbackGradient?: string;
}

export default function VideoBackground({ 
  src = "https://assets.mixkit.co/videos/45220/45220-720.mp4",
  fallbackGradient = "linear-gradient(135deg, #030712 0%, #0A192F 50%, #030712 100%)"
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
      </video>

      {/* Overlay para melhor legibilidade do texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-[#030712]/80 to-[#030712]/95 z-[1]" />
    </>
  );
}
