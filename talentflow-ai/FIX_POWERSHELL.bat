@echo off
echo ============================================
echo CORRIGIR PERMISSÕES DO POWERSHELL
echo ============================================

echo.
echo PROBLEMA: PowerShell bloqueado para executar scripts
echo SOLUÇÃO: Alterar política de execução
echo.

echo 1. Abrindo PowerShell como Administrador...
echo 2. Execute ESTE comando:
echo.
echo    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
echo.
echo 3. Digite 'S' quando perguntar
echo 4. Feche o PowerShell
echo 5. Tente novamente: npm install
echo.

echo OU use o CMD (Command Prompt) em vez do PowerShell:
echo.
echo 1. Pressione Windows + R
echo 2. Digite "cmd"
echo 3. Pressione Enter
echo 4. Execute:
echo    cd C:\talentflow-ai\talentflow-ai
echo    npm install
echo    npm run dev
echo.

pause