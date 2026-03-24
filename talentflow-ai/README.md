# TalentFlow AI

Sistema de recrutamento inteligente com matching de candidatos baseado em IA (DeepSeek).

## Tech Stack

- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore (configurado)
- **Auth**: Firebase Auth (Google OAuth)
- **Storage**: Firebase Storage (CVs)
- **AI**: DeepSeek API (configurado)
- **LinkedIn**: Apify API (configurado)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Crie um ficheiro `.env.local` com as seguintes variáveis:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
FIREBASE_ADMIN_PRIVATE_KEY=your_private_key

# DeepSeek AI
DEEPSEEK_API_KEY=your_deepseek_api_key

# Apify (LinkedIn Scraping)
APIFY_API_KEY=your_apify_api_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production

```bash
npm run build
npm start
```

## Features

- **Autenticação**: Login com Google OAuth via Firebase
- **Gestão de Vagas**: CRUD completo de vagas de emprego
- **Geração de IA**: Geração automática de descrições de vagas com DeepSeek
- **Gestão de Candidatos**: Upload de CVs e tracking de candidatos
- **Análise de IA**: Análise de CVs e cálculo de match score
- **Integração LinkedIn**: Importação de candidatos via Apify
- **Dashboard**: Métricas e estatísticas em tempo real

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login)
│   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── dashboard/     # Dashboard home
│   │   ├── jobs/          # Jobs CRUD
│   │   └── candidates/    # Candidates management
│   └── api/               # API routes
├── components/             # React components
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   └── candidates/        # Candidate components
├── contexts/              # React contexts
├── lib/                   # Utilities
├── services/              # Business logic services
└── types/                 # TypeScript types
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Firebase Hosting

```bash
npm run build
firebase deploy
```

## License

MIT
