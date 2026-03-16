# 🚀 Deploy do TalentFlow AI para Vercel

## ✅ Pré-requisitos
1. Conta no [Vercel](https://vercel.com)
2. Conta no [GitHub](https://github.com) (opcional, mas recomendado)
3. Node.js 18+ instalado

## 📋 Passos para Deploy

### Opção A: Via CLI do Vercel (Mais Rápida)
```bash
# 1. Instale a CLI do Vercel
npm install -g vercel

# 2. Navegue para o projeto
cd talentflow-ai/talentflow-ai

# 3. Execute o deploy
vercel
```

### Opção B: Via GitHub (Recomendada para atualizações futuras)
```bash
# 1. Inicialize o repositório Git
cd talentflow-ai/talentflow-ai
git init
git add .
git commit -m "Deploy new design to Vercel"
git branch -M main

# 2. Crie um repositório no GitHub
# Visite: https://github.com/new
# Nome: talentflow-ai

# 3. Conecte ao GitHub
git remote add origin https://github.com/SEU_USUARIO/talentflow-ai.git
git push -u origin main

# 4. No Vercel Dashboard:
# - "New Project" → Import from GitHub
# - Selecione "talentflow-ai"
# - Clique em "Deploy"
```

### Opção C: Via Drag & Drop
1. Execute o build local:
   ```bash
   cd talentflow-ai/talentflow-ai
   npm run build
   ```

2. No Vercel Dashboard:
   - "New Project" → "Drag & Drop"
   - Arraste a pasta `.next` (ou a pasta raiz do projeto)

## 🔐 Variáveis de Ambiente (CRÍTICO!)

No painel do Vercel, adicione estas variáveis de ambiente:

### Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDexample1234567890abcdefghijklmnopqrstuvwxyz
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=talentflow-ai.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=talentflow-ai
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=talentflow-ai.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
```

### Firebase Admin (Server-side)
```
FIREBASE_PROJECT_ID=talentflow-ai
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-example@talentflow-ai.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7VJTUt9Us8cKj\nMzEfYyjiWA4R4/M2bS1GBM...\n-----END PRIVATE KEY-----\n
```

### DeepSeek AI
```
DEEPSEEK_API_KEY=sk-example1234567890abcdefghijklmnopqrstuvwxyz
```

### Apify (LinkedIn Scraping)
```
APIFY_API_KEY=apify_api_example1234567890abcdef
```

## ⚙️ Configurações do Projeto no Vercel

### Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Environment Variables
- Adicione TODAS as variáveis listadas acima
- Marque como "Production" e "Preview"

### Domínio Customizado (Opcional)
1. No painel do Vercel, vá para "Domains"
2. Adicione seu domínio (ex: talentflow.ai)
3. Configure os registros DNS conforme instruções

## 🎨 Novas Funcionalidades Implementadas

### Design Atualizado
- ✅ Landing page com cores pastel suaves
- ✅ Estatísticas visuais (85% precisão, 70% tempo economizado)
- ✅ Cards com efeitos hover modernos
- ✅ Footer profissional
- ✅ Loading screen animado

### Páginas
- ✅ `/` - Landing page com novo design
- ✅ `/login` - Página de login atualizada
- ✅ `/dashboard` - Dashboard principal
- ✅ `/ui-showcase` - Demonstração de componentes UI
- ✅ `/visual-demo` - Demonstração visual anterior

### Componentes UI
- ✅ Sistema de notificações (Toast)
- ✅ Tooltips modernos
- ✅ Empty states com ilustrações
- ✅ Progress indicators
- ✅ Cards e botões aprimorados

## 🚨 Solução de Problemas

### Erro: "Module not found"
```bash
# Limpe cache e reinstale
rm -rf node_modules .next
npm install
npm run build
```

### Erro: "Environment variables missing"
- Verifique se TODAS as variáveis estão no Vercel
- Reinicie o deploy após adicionar variáveis

### Erro: "Build failed"
- Verifique logs no Vercel Dashboard
- Teste build local primeiro: `npm run build`

## 🔄 Atualizações Futuras
```bash
# 1. Faça suas alterações
# 2. Commit e push
git add .
git commit -m "Update: descrição das mudanças"
git push origin main

# 3. O Vercel faz deploy automático!
```

## 📞 Suporte
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Issues: https://github.com/SEU_USUARIO/talentflow-ai/issues

---

**URL do Deploy**: https://talentflow-ai.vercel.app (ou seu domínio customizado)

**Status**: ✅ Pronto para deploy com novo design acolhedor!