# 🚀 INICIAR TALENTFLOW AI RAPIDAMENTE

## Problema: Servidores não estão a funcionar
**Causa:** As dependências do projeto (`node_modules`) não estão instaladas.

## Solução Rápida:

### Opção 1: Script Automático (Recomendado)
1. **Abra o PowerShell como Administrador**
2. **Execute:**
   ```powershell
   cd C:\talentflow-ai\talentflow-ai
   .\INSTALL_AND_START.ps1
   ```

### Opção 2: Comandos Manuais
1. **Abra o terminal na pasta do projeto:**
   ```cmd
   cd C:\talentflow-ai\talentflow-ai
   ```

2. **Instale as dependências:**
   ```cmd
   npm install
   ```
   *Isto pode demorar 2-5 minutos*

3. **Inicie o servidor:**
   ```cmd
   npm run dev
   ```

## 📍 URLs para Testar:
- **Dashboard:** http://localhost:3000/dashboard
- **Teste Dropdown:** http://localhost:3000/test-dropdown
- **Jobs:** http://localhost:3000/jobs
- **Candidates:** http://localhost:3000/candidates

## ✅ Solução do Dropdown Implementada:
O dropdown do perfil agora usa:
- **JavaScript direto** para mover para `document.body`
- **z-index máximo** (2147483647) garantido
- **Script de backup** que executa a cada 100ms
- **Funciona em todas as páginas**

**Após instalar as dependências, o servidor deve iniciar automaticamente!**