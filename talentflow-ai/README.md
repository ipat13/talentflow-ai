# TalentFlow AI

Sistema de recrutamento inteligente com matching de candidatos baseado em IA (DeepSeek).

## Resumo

O **TalentFlow AI** é uma plataforma de recrutamento que utiliza inteligência artificial para analisar currículos, calcular scores de compatibilidade e ajudar recrutadores a encontrar os melhores candidatos para cada vaga.

### Como Funciona

1. **Criar Vaga** - Usa IA para gerar descrições otimizadas
2. **Importar CVs** - Upload de PDFs ou importar do LinkedIn
3. **Analisar Matches** - IA analisa e rankeia os candidatos automaticamente

---

## Funcionalidades

### Core
- ✅ Autenticação Google (Firebase Auth)
- ✅ Gestão de Vagas (CRUD completo)
- ✅ Geração de descrições com IA (DeepSeek)
- ✅ Upload de CVs em PDF
- ✅ Extração automática de texto de PDFs
- ✅ Análise de CVs com Match Score (0-100%)
- ✅ Highlights de competências e pontos fortes
- ✅ Ranking de candidatos por score

### Dashboard
- ✅ Estatísticas em tempo real
- ✅ Feed de Strong Matches (≥80%)
- ✅ Ações rápidas

### LinkedIn Integration
- ✅ Importação de potenciais candidatos
- ✅ Estrutura preparada para API externa
- ✅ Conversão para candidato

### UI/UX
- ✅ Design System consistente
- ✅ Dark mode automático
- ✅ Responsivo (mobile/tablet/desktop)
- ✅ Landing page moderna

---

## Tech Stack

| Categoria | Tecnologia |
|-----------|------------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Backend | Next.js API Routes |
| Database | Firebase Firestore |
| Auth | Firebase Auth (Google OAuth) |
| Storage | Firebase Storage |
| AI | DeepSeek API |

---

## Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Firebase
- API Key do DeepSeek

### Passos

```bash
# 1. Clonar o repositório
git clone <repo-url>
cd talentflow-ai

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com as tuas credenciais

# 4. Correr em desenvolvimento
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## Variáveis de Ambiente

### Firebase Client (obrigatório)

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | API Key do Firebase |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Domínio de autenticação |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ID do projeto Firebase |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Bucket do Storage |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | App ID |

### Firebase Admin (obrigatório)

| Variável | Descrição |
|----------|-----------|
| `FIREBASE_PROJECT_ID` | ID do projeto |
| `FIREBASE_CLIENT_EMAIL` | Email do Service Account |
| `FIREBASE_PRIVATE_KEY` | Private Key (com `\n` para newlines) |

### DeepSeek API (obrigatório)

| Variável | Descrição |
|----------|-----------|
| `DEEPSEEK_API_KEY` | API Key do DeepSeek |

### LinkedIn Scraper (opcional)

| Variável | Descrição |
|----------|-----------|
| `SCRAPER_API_URL` | URL da API de scraping |
| `SCRAPER_API_KEY` | API Key do scraper |

### App

| Variável | Descrição | Default |
|----------|-----------|---------|
| `NEXT_PUBLIC_APP_URL` | URL da aplicação | `http://localhost:3000` |

---

## Configuração Firebase

### 1. Criar Projeto

1. Ir a [Firebase Console](https://console.firebase.google.com)
2. Criar novo projeto
3. Ativar Blaze plan (necessário para Firebase Admin)

### 2. Autenticação

1. Authentication > Sign-in method
2. Ativar **Google**
3. Adicionar domínio autorizado

### 3. Firestore

1. Firestore Database > Create database
2. Escolher região
3. Regras de segurança:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. Storage

1. Storage > Get started
2. Regras de segurança:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /cvs/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 5. Service Account

1. Project Settings > Service accounts
2. Click "Generate new private key"
3. Guardar o JSON e extrair valores para `.env`

---

## Deploy

### Vercel (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel
```

### Configurar Variáveis

No dashboard do Vercel:
1. Settings > Environment Variables
2. Adicionar todas as variáveis do `.env`
3. Redeploy

---

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Verificar código com ESLint |

---

## Estrutura do Projeto

```
talentflow-ai/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Páginas de auth
│   │   ├── (dashboard)/     # Páginas protegidas
│   │   └── api/             # API Routes
│   ├── components/
│   │   ├── candidates/      # Componentes de candidatos
│   │   ├── jobs/            # Componentes de vagas
│   │   ├── layout/          # Header, Sidebar
│   │   └── ui/              # Button, Card, Badge, Input
│   ├── contexts/            # React contexts
│   ├── lib/                 # Firebase, utilitários
│   ├── services/            # DeepSeek, PDF, OpenClaw
│   └── types/               # TypeScript types
├── public/
├── .env.example
├── package.json
└── README.md
```

---

## API Endpoints

### Jobs
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/jobs` | Listar vagas |
| POST | `/api/jobs` | Criar vaga |
| GET | `/api/jobs/[id]` | Obter vaga |
| PUT | `/api/jobs/[id]` | Atualizar vaga |
| DELETE | `/api/jobs/[id]` | Eliminar vaga |

### Candidates
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/candidates` | Listar candidatos |
| POST | `/api/candidates` | Criar candidato |
| POST | `/api/candidates/upload` | Upload CV |
| POST | `/api/candidates/analyze` | Analisar CV |
| GET/PUT/DELETE | `/api/candidates/[id]` | CRUD individual |

### Potential Candidates
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/potential-candidates` | Listar |
| POST | `/api/potential-candidates` | Adicionar LinkedIn |
| GET/PUT/DELETE | `/api/potential-candidates/[id]` | CRUD individual |

### AI
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/ai/generate-description` | Gerar descrição |

---

## Licença

MIT

---

## Contribuir

1. Fork do repositório
2. Criar branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit (`git commit -m 'Add nova funcionalidade'`)
4. Push (`git push origin feature/nova-funcionalidade`)
5. Abrir Pull Request
