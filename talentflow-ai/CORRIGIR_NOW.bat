@echo off
echo ============================================
echo CORREÇÃO IMEDIATA DO POWERSHELL
echo ============================================

echo.
echo EXECUTE ESTES COMANDOS NO POWERSHELL COMO ADMINISTRADOR:
echo.
echo 1. Abra PowerShell como Administrador:
echo    - Clique direito no botão Iniciar
echo    - Selecione "Windows PowerShell (Administrador)"
echo.
echo 2. Execute ESTE comando:
echo    Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser
echo.
echo 3. Digite 'S' quando perguntar
echo.
echo 4. Feche o PowerShell
echo.
echo 5. Tente novamente no PowerShell NORMAL:
echo    cd C:\talentflow-ai\talentflow-ai
echo    npm install
echo    npm run dev
echo.
echo ============================================
echo SOLUÇÃO ALTERNATIVA: USAR CMD
echo ============================================
echo.
echo 1. Pressione Windows + R
echo 2. Digite "cmd" e pressione Enter
echo 3. Execute:
echo    cd C:\talentflow-ai\talentflow-ai
echo    npm install
echo    npm run dev
echo.
echo O CMD NÃO TEM ESTE PROBLEMA!
echo.

pause