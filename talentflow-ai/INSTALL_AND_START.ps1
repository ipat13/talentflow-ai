Write-Host "============================================" -ForegroundColor Cyan
Write-Host "INSTALANDO E INICIANDO TALENTFLOW AI" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Node.js nao encontrado!" -ForegroundColor Red
    Write-Host "Instale Node.js v18 ou superior: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""
Write-Host "2. Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "npm encontrado: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "ERRO: npm nao encontrado!" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""
Write-Host "3. Instalando dependencias..." -ForegroundColor Yellow
Write-Host "Isto pode demorar alguns minutos..." -ForegroundColor Yellow
try {
    npm install
    if ($LASTEXITCODE -ne 0) {
        throw "Falha na instalacao"
    }
    Write-Host "Dependencias instaladas com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Falha ao instalar dependencias!" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""
Write-Host "4. Iniciando servidor de desenvolvimento..." -ForegroundColor Yellow
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SERVIDOR INICIANDO EM: http://localhost:3000" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Yellow
Write-Host ""

npm run dev

Read-Host "Pressione Enter para sair"