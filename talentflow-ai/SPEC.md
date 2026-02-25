# TalentFlow AI - Specification

## Overview
Sistema de recrutamento inteligente com matching de candidatos baseado em IA (DeepSeek).

## Tech Stack
- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Auth**: Firebase Auth (Google OAuth)
- **Storage**: Firebase Storage (CVs)
- **AI**: DeepSeek API

## Design Tokens

### Colors
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| primary | #6366f1 | #818cf8 | CTAs, links |
| secondary | #10b981 | #34d399 | Success, positive |
| danger | #ef4444 | #f87171 | Errors, delete |
| warning | #f59e0b | #fbbf24 | Warnings |
| background | #ffffff | #0a0a0a | Page background |
| surface | #f4f4f5 | #18181b | Cards, panels |
| text | #18181b | #fafafa | Primary text |
| muted | #71717a | #a1a1aa | Secondary text |

### Spacing
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Typography
- Font: Inter (sans-serif)
- Sizes: xs(12), sm(14), base(16), lg(18), xl(20), 2xl(24), 3xl(30), 4xl(36)

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'recruiter' | 'viewer';
  createdAt: Timestamp;
}
```

### Job
```typescript
interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  description: string;
  requirements: string[];
  competencies: string[];
  status: 'draft' | 'active' | 'closed';
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Candidate
```typescript
interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cvUrl: string;
  cvText?: string;
  source: 'upload' | 'linkedin' | 'manual';
  matchScore?: number;
  matchHighlights?: string[];
  jobId: string;
  status: 'new' | 'reviewing' | 'interview' | 'offer' | 'rejected';
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### PotentialCandidate (OpenClaw)
```typescript
interface PotentialCandidate {
  id: string;
  name: string;
  linkedInUrl: string;
  headline?: string;
  location?: string;
  source: 'linkedin';
  jobId?: string;
  createdAt: Timestamp;
}
```

## Routes

### Public
- `/` - Landing page
- `/login` - Login page

### Protected (Recruiter/Viewer)
- `/dashboard` - Overview with stats
- `/jobs` - List all jobs
- `/jobs/new` - Create job
- `/jobs/[id]` - Job details + candidates
- `/candidates` - All candidates
- `/candidates/[id]` - Candidate details

## API Endpoints

### Auth
- `POST /api/auth/google` - Google OAuth

### Jobs
- `GET /api/jobs` - List jobs
- `POST /api/jobs` - Create job
- `GET /api/jobs/[id]` - Get job
- `PUT /api/jobs/[id]` - Update job
- `DELETE /api/jobs/[id]` - Delete job

### Candidates
- `GET /api/candidates` - List candidates
- `POST /api/candidates` - Create candidate
- `POST /api/candidates/upload` - Upload CV
- `GET /api/candidates/[id]` - Get candidate
- `PUT /api/candidates/[id]` - Update candidate
- `DELETE /api/candidates/[id]` - Delete candidate

### AI
- `POST /api/ai/generate-description` - Generate job description
- `POST /api/ai/analyze-cv` - Analyze CV and calculate match score

## Features Priority

### Phase 1 (Week 1)
- [x] Project setup
- [x] Design System (tokens, components)
- [x] Firebase Auth + Google Login
- [x] RBAC Middleware
- [x] Job CRUD + AI description generation
- [x] CV Upload
- [x] DeepSeek CV Analysis + Match Score
- [x] Candidate details page
- [x] Candidate Ranking (sorted by match score)

### Phase 2 (Week 2)
- [x] OpenClaw Integration (LinkedIn scraping - estrutura preparada)
- [x] Deploy & Documentation
