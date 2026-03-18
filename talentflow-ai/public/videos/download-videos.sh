#!/bin/bash

# Script para descarregar recursos multimédia gratuitos
# Executar na pasta public/videos/

cd "$(dirname "$0")"

echo "📥 A descarregar vídeos gratuitos..."

# Vídeo de fundo para Hero Section
echo "Descarregando hero-bg.mp4..."
curl -L -o hero-bg.mp4 "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4" 2>/dev/null

# Vídeo demo
echo "Descarregando demo.mp4..."
curl -L -o demo.mp4 "https://cdn.pixabay.com/video/2020/09/02/46481-460110073_large.mp4" 2>/dev/null

echo "✅ Vídeos descarregados!"
ls -la *.mp4
