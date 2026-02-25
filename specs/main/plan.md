# Implementation Plan: TalentFlow AI

**Branch**: `talentflow-ai` | **Date**: 2025-02-24 | **Spec**: [spec.md](./spec.md)

## Summary

Sistema de recrutamento inteligente com matching de candidatos baseado em IA (DeepSeek). Next.js 16 application with Firebase backend for auth, storage, and database, integrated with DeepSeek AI for job description generation and CV analysis.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 4, Firebase SDK, Firebase Admin
**Storage**: Firebase Firestore (database), Firebase Storage (CVs)
**Testing**: Not configured yet (optional)
**Target Platform**: Web (responsive), deployed to Vercel
**Project Type**: Web application (full-stack Next.js)
**Performance Goals**: Page loads < 2s, AI operations < 10s
**Constraints**: Firebase free tier limits, DeepSeek API rate limits
**Scale/Scope**: Single organization, 1-10 recruiters, 100s of jobs, 1000s of candidates

## Project Structure

```text
talentflow-ai/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── jobs/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── candidates/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── me/route.ts
│   │   │   │   └── session/route.ts
│   │   │   ├── jobs/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── candidates/
│   │   │   │   ├── route.ts
│   │   │   │   ├── [id]/route.ts
│   │   │   │   ├── upload/route.ts
│   │   │   │   └── analyze/route.ts
│   │   │   └── ai/
│   │   │       └── generate-description/route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Select.tsx
│   │   │   └── Textarea.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── jobs/
│   │   │   ├── JobCard.tsx
│   │   │   └── JobForm.tsx
│   │   └── candidates/
│   │       ├── CandidateCard.tsx
│   │       └── CVUploader.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── firebase-admin.ts
│   │   ├── auth.ts
│   │   ├── api-auth.ts
│   │   ├── rbac.ts
│   │   └── useSession.ts
│   ├── services/
│   │   ├── deepseek.ts
│   │   └── pdf.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── job.ts
│   │   └── candidate.ts
│   └── middleware.ts
├── public/
├── .env.example
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Implementation Status

| Component | Status | Notes |
|-----------|--------|-------|
| Project Setup | Done | Next.js 16 initialized |
| UI Components | Partial | Button, Input, Card, Badge done |
| Firebase Config | Done | Client + Admin SDKs |
| Auth Context | Done | AuthContext exists |
| Auth API Routes | Partial | me, session done; google incomplete |
| Middleware | Done | RBAC middleware exists |
| Jobs CRUD | Partial | Routes exist, UI needs polish |
| AI Description | Partial | Route exists, needs testing |
| Candidates CRUD | Partial | Routes exist |
| CV Upload | Partial | Route exists, needs testing |
| CV Analysis | Partial | Route exists, DeepSeek service exists |
| Dashboard | Partial | Basic page exists |

## Environment Variables Required

```env
# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# DeepSeek AI
DEEPSEEK_API_KEY=
```
