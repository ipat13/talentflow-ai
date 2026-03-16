Write-Host "============================================" -ForegroundColor Red
Write-Host "CORREÇÃO DO POWERSHELL - EXECUTE COMO ADMINISTRADOR" -ForegroundColor Red
Write-Host "============================================" -ForegroundColor Red
Write-Host ""

Write-Host "Este script vai corrigir as políticas de execução do PowerShell." -ForegroundColor Yellow
Write-Host ""

# Verificar se está a executar como Administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERRO: Execute este script como Administrador!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Como executar como Administrador:" -ForegroundColor Yellow
    Write-Host "1. Clique direito no botão Iniciar" -ForegroundColor White
    Write-Host "2. Selecione 'Windows PowerShell (Administrador)'" -ForegroundColor White
    Write-Host "3. Navegue para a pasta: cd C:\talentflow-ai\talentflow-ai" -ForegroundColor White
    Write-Host "4. Execute: .\POWERSHELL_FIX_NOW.ps1" -ForegroundColor White
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "✅ Executando como Administrador" -ForegroundColor Green
Write-Host ""

# Corrigir política de execução
Write-Host "Alterando política de execução..." -ForegroundColor Yellow
try {
    Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser -Force
    Write-Host "✅ Política alterada com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao alterar política: $_" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "CORREÇÃO APLICADA COM SUCESSO!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

Write-Host "Agora pode usar o PowerShell normalmente:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Feche este PowerShell" -ForegroundColor White
Write-Host "2. Abra PowerShell NORMAL (não como Admin)" -ForegroundColor White
Write-Host "3. Execute:" -ForegroundColor White
Write-Host "   cd C:\talentflow-ai\talentflow-ai" -ForegroundColor Cyan
Write-Host "   npm install" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""

Write-Host "OU use o CMD (mais simples):" -ForegroundColor Yellow
Write-Host "1. Windows + R -> digite 'cmd' -> Enter" -ForegroundColor White
Write-Host "2. Execute os mesmos comandos acima" -ForegroundColor White
Write-Host ""

Read-Host "Pressione Enter para sair"