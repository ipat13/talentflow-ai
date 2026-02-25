# Feature Specification: TalentFlow AI

## Overview

Sistema de recrutamento inteligente com matching de candidatos baseado em IA (DeepSeek).

**Target Users**: Recruiters, HR Managers, Hiring Teams

---

## User Stories

### US1: Complete Design System (Priority: P1)

**As a** developer  
**I want** a complete design system with reusable UI components  
**So that** the application has consistent styling and faster development

**Acceptance Criteria**:
- All design tokens (colors, spacing, typography) are defined in Tailwind config
- Core UI components exist: Button, Input, Card, Badge, Modal, Select, Textarea
- Dark mode support is functional
- All components have proper TypeScript types
- Components are exported from centralized index files

**Files**: `src/components/ui/*.tsx`, `tailwind.config.ts`, `src/app/globals.css`

---

### US2: Firebase Authentication (Priority: P1)

**As a** recruiter  
**I want** to log in using my Google account  
**So that** I can securely access the recruitment system

**Acceptance Criteria**:
- Google OAuth login button on `/login` page
- Session persists across browser refreshes
- User data is stored in Firestore after first login
- Logout functionality works correctly
- Protected routes redirect to login when unauthenticated

**Files**: `src/lib/firebase.ts`, `src/lib/auth.ts`, `src/contexts/AuthContext.tsx`, `src/app/api/auth/**/*.ts`

---

### US3: Job Management CRUD (Priority: P1)

**As a** recruiter  
**I want** to create, view, edit, and delete job postings  
**So that** I can manage open positions for my organization

**Acceptance Criteria**:
- View list of all jobs on `/jobs` page with status indicators
- Create new job via form at `/jobs/new`
- Edit existing job at `/jobs/[id]`
- Delete job with confirmation dialog
- Job status can be: draft, active, closed
- Jobs display: title, department, location, type, description

**Files**: `src/app/(dashboard)/jobs/**/*.tsx`, `src/app/api/jobs/**/*.ts`, `src/components/jobs/*.tsx`, `src/types/job.ts`

---

### US4: AI Job Description Generation (Priority: P2)

**As a** recruiter  
**I want** AI to generate job descriptions based on title and requirements  
**So that** I can create compelling job postings faster

**Acceptance Criteria**:
- "Generate with AI" button in job creation form
- Input fields for job title and key requirements
- DeepSeek API generates description and competencies
- Generated content is editable before saving
- Loading state shown during generation
- Error handling for API failures

**Files**: `src/app/api/ai/generate-description/route.ts`, `src/services/deepseek.ts`, `src/components/jobs/JobForm.tsx`

---

### US5: Candidate Management (Priority: P2)

**As a** recruiter  
**I want** to view and manage all candidates across jobs  
**So that** I can track applicants through the hiring pipeline

**Acceptance Criteria**:
- View all candidates on `/candidates` page
- Filter candidates by job, status, or match score
- Update candidate status: new, reviewing, interview, offer, rejected
- Add notes to candidate profiles
- View candidate details including CV
- Delete candidates

**Files**: `src/app/(dashboard)/candidates/**/*.tsx`, `src/app/api/candidates/**/*.ts`, `src/components/candidates/*.tsx`, `src/types/candidate.ts`

---

### US6: CV Upload and Storage (Priority: P2)

**As a** recruiter  
**I want** to upload candidate CVs (PDF) to the system  
**So that** candidate documents are stored and accessible

**Acceptance Criteria**:
- Upload CV via drag-and-drop or file picker
- CV stored in Firebase Storage
- CV URL saved to candidate record
- PDF text extracted and stored for AI analysis
- File size validation (max 5MB)
- Only PDF files accepted

**Files**: `src/app/api/candidates/upload/route.ts`, `src/services/pdf.ts`, `src/components/candidates/CVUploader.tsx`

---

### US7: AI CV Analysis and Match Score (Priority: P3)

**As a** recruiter  
**I want** AI to analyze CVs and calculate match scores against job requirements  
**So that** I can quickly identify the best candidates

**Acceptance Criteria**:
- Automatic analysis when CV is uploaded
- Match score (0-100%) calculated based on job requirements
- Match highlights showing key strengths/weaknesses
- Candidates ranked by match score on job detail page
- Re-analysis available when job requirements change
- DeepSeek API integration for analysis

**Files**: `src/app/api/candidates/analyze/route.ts`, `src/services/deepseek.ts`

---

### US8: Dashboard Analytics (Priority: P3)

**As a** recruiter  
**I want** to see an overview dashboard with key metrics  
**So that** I can understand the current state of recruitment

**Acceptance Criteria**:
- Total active jobs count
- Total candidates count
- Candidates by status breakdown
- Recent activity feed
- Quick links to common actions
- Responsive layout for mobile

**Files**: `src/app/(dashboard)/dashboard/page.tsx`

---

### US9: OpenClaw LinkedIn Integration (Priority: P4)

**As a** recruiter  
**I want** to discover potential candidates from LinkedIn  
**So that** I can proactively reach out to qualified professionals

**Acceptance Criteria**:
- LinkedIn profile URL input
- Basic profile data scraped and stored
- Potential candidates listed separately from applicants
- Ability to convert to candidate when they apply

**Files**: `src/app/api/scraper/**/*.ts`, `src/types/candidate.ts`

---

## Non-Functional Requirements

- **Performance**: Page loads < 2 seconds
- **Security**: All routes protected, role-based access
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile**: Responsive design for tablet/mobile

---

## Out of Scope

- Email notifications
- Calendar integration
- Multi-tenant organizations
- Billing/payments
