@echo off
echo ============================================
echo INSTALANDO E INICIANDO TALENTFLOW AI
echo ============================================

echo.
echo 1. Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo Instale Node.js v18 ou superior: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo 2. Verificando npm...
npm --version
if %errorlevel% neq 0 (
    echo ERRO: npm nao encontrado!
    pause
    exit /b 1
)

echo.
echo 3. Instalando dependencias...
echo Isto pode demorar alguns minutos...
npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias!
    pause
    exit /b 1
)

echo.
echo 4. Iniciando servidor de desenvolvimento...
echo.
echo ============================================
echo SERVIDOR INICIANDO EM: http://localhost:3000
echo ============================================
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

npm run dev

pause