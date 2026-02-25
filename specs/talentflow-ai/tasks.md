---

description: "Task list for TalentFlow AI implementation"
---

# Tasks: TalentFlow AI

**Input**: Design documents from `/specs/talentflow-ai/`
**Prerequisites**: plan.md (required), spec.md (required)

**Tests**: Not explicitly requested - test tasks omitted.

**Organization**: Tasks grouped by user story for independent implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1-US9)
- Exact file paths included

## Path Conventions

- Single Next.js project: `src/app/`, `src/components/`, `src/lib/`, `src/services/`, `src/types/`

---

## Phase 1: Setup (Verify & Fix)

**Purpose**: Ensure project foundation is solid

- [ ] T001 Verify all environment variables are configured in `.env` from `.env.example`
- [ ] T002 Verify Firebase project is accessible and rules are configured for Firestore and Storage
- [ ] T003 [P] Run `npm run build` to verify no TypeScript errors in talentflow-ai/
- [ ] T004 [P] Run `npm run lint` to verify no ESLint errors in talentflow-ai/

---

## Phase 2: Foundational (Complete Core Infrastructure)

**Purpose**: Core infrastructure that MUST be complete before user stories

**CRITICAL**: No user story work until this phase is complete

- [ ] T005 Add Modal component in talentflow-ai/src/components/ui/Modal.tsx
- [ ] T006 [P] Add Select component in talentflow-ai/src/components/ui/Select.tsx
- [ ] T007 [P] Add Textarea component in talentflow-ai/src/components/ui/Textarea.tsx
- [ ] T008 Update ui index to export Modal, Select, Textarea in talentflow-ai/src/components/ui/index.ts
- [ ] T009 [P] Configure Tailwind dark mode and design tokens in talentflow-ai/tailwind.config.ts
- [ ] T010 [P] Add dark mode CSS variables in talentflow-ai/src/app/globals.css

**Checkpoint**: Foundation ready - user story implementation can begin

---

## Phase 3: User Story 1 - Complete Design System (Priority: P1)

**Goal**: Full design system with all required UI components

**Independent Test**: All components render in Storybook or isolated test page with dark/light mode toggle

### Implementation for US1

- [ ] T011 [US1] Add loading spinner variant to Button in talentflow-ai/src/components/ui/Button.tsx
- [ ] T012 [P] [US1] Add error/success states to Input in talentflow-ai/src/components/ui/Input.tsx
- [ ] T013 [P] [US1] Add hover/focus variants to Card in talentflow-ai/src/components/ui/Card.tsx
- [ ] T014 [P] [US1] Add status color variants to Badge in talentflow-ai/src/components/ui/Badge.tsx
- [ ] T015 [US1] Create component showcase page at talentflow-ai/src/app/(dashboard)/design-system/page.tsx (temporary, delete after review)
- [ ] T016 [US1] Verify all components have proper TypeScript prop interfaces

**Checkpoint**: Design system complete - all UI components ready for use

---

## Phase 4: User Story 2 - Firebase Authentication (Priority: P1)

**Goal**: Secure Google OAuth authentication with session persistence

**Independent Test**: Login with Google, refresh page, verify session persists, logout, verify redirect to login

### Implementation for US2

- [ ] T017 [US2] Verify Google Auth provider is enabled in Firebase Console
- [ ] T018 [US2] Complete Google OAuth handler in talentflow-ai/src/app/api/auth/google/route.ts
- [ ] T019 [US2] Verify session creation logic in talentflow-ai/src/lib/useSession.ts
- [ ] T020 [US2] Update login page with Google button in talentflow-ai/src/app/(auth)/login/page.tsx
- [ ] T021 [US2] Verify middleware protects dashboard routes in talentflow-ai/src/middleware.ts
- [ ] T022 [US2] Add logout functionality to Header in talentflow-ai/src/components/layout/Header.tsx
- [ ] T023 [US2] Verify user document creation in Firestore after first login

**Checkpoint**: Authentication working - users can login/logout with Google

---

## Phase 5: User Story 3 - Job Management CRUD (Priority: P1)

**Goal**: Full CRUD for job postings with proper UI

**Independent Test**: Create job, view in list, edit job, delete job - all operations work

### Implementation for US3

- [ ] T024 [P] [US3] Verify Job type definition in talentflow-ai/src/types/job.ts
- [ ] T025 [US3] Complete GET /api/jobs endpoint in talentflow-ai/src/app/api/jobs/route.ts
- [ ] T026 [US3] Complete POST /api/jobs endpoint in talentflow-ai/src/app/api/jobs/route.ts
- [ ] T027 [US3] Complete GET /api/jobs/[id] endpoint in talentflow-ai/src/app/api/jobs/[id]/route.ts
- [ ] T028 [US3] Complete PUT /api/jobs/[id] endpoint in talentflow-ai/src/app/api/jobs/[id]/route.ts
- [ ] T029 [US3] Complete DELETE /api/jobs/[id] endpoint in talentflow-ai/src/app/api/jobs/[id]/route.ts
- [ ] T030 [US3] Polish job list page in talentflow-ai/src/app/(dashboard)/jobs/page.tsx
- [ ] T031 [US3] Complete job creation form in talentflow-ai/src/app/(dashboard)/jobs/new/page.tsx
- [ ] T032 [US3] Complete job detail/edit page in talentflow-ai/src/app/(dashboard)/jobs/[id]/page.tsx
- [ ] T033 [US3] Update JobCard component with all fields in talentflow-ai/src/components/jobs/JobCard.tsx
- [ ] T034 [US3] Update JobForm component with all fields in talentflow-ai/src/components/jobs/JobForm.tsx
- [ ] T035 [US3] Add delete confirmation modal to job detail page

**Checkpoint**: Job CRUD fully functional - recruiters can manage jobs

---

## Phase 6: User Story 4 - AI Job Description Generation (Priority: P2)

**Goal**: DeepSeek-powered job description generation

**Independent Test**: Click "Generate with AI", enter title/requirements, verify description is generated and editable

### Implementation for US4

- [ ] T036 [US4] Verify DeepSeek service configuration in talentflow-ai/src/services/deepseek.ts
- [ ] T037 [US4] Complete generate-description API route in talentflow-ai/src/app/api/ai/generate-description/route.ts
- [ ] T038 [US4] Add AI generate button to JobForm in talentflow-ai/src/components/jobs/JobForm.tsx
- [ ] T039 [US4] Add loading state during AI generation in JobForm
- [ ] T040 [US4] Add error handling for AI API failures with user-friendly message
- [ ] T041 [US4] Populate description and competencies fields from AI response

**Checkpoint**: AI job description generation working

---

## Phase 7: User Story 5 - Candidate Management (Priority: P2)

**Goal**: Full candidate management with filtering and status updates

**Independent Test**: View candidates, filter by status, update status, add notes, delete candidate

### Implementation for US5

- [ ] T042 [P] [US5] Verify Candidate type definition in talentflow-ai/src/types/candidate.ts
- [ ] T043 [US5] Complete GET /api/candidates endpoint with filtering in talentflow-ai/src/app/api/candidates/route.ts
- [ ] T044 [US5] Complete POST /api/candidates endpoint in talentflow-ai/src/app/api/candidates/route.ts
- [ ] T045 [US5] Complete GET /api/candidates/[id] endpoint in talentflow-ai/src/app/api/candidates/[id]/route.ts
- [ ] T046 [US5] Complete PUT /api/candidates/[id] endpoint in talentflow-ai/src/app/api/candidates/[id]/route.ts
- [ ] T047 [US5] Complete DELETE /api/candidates/[id] endpoint in talentflow-ai/src/app/api/candidates/[id]/route.ts
- [ ] T048 [US5] Update candidates list page with filters in talentflow-ai/src/app/(dashboard)/candidates/page.tsx
- [ ] T049 [US5] Update CandidateCard with status badge in talentflow-ai/src/components/candidates/CandidateCard.tsx
- [ ] T050 [US5] Add status update dropdown to CandidateCard
- [ ] T051 [US5] Add notes field and edit capability to candidate view

**Checkpoint**: Candidate management fully functional

---

## Phase 8: User Story 6 - CV Upload and Storage (Priority: P2)

**Goal**: PDF CV upload with Firebase Storage and text extraction

**Independent Test**: Upload PDF, verify file in Storage, verify text extracted, view CV URL

### Implementation for US6

- [ ] T052 [US6] Verify Firebase Storage rules allow authenticated uploads
- [ ] T053 [US6] Complete CV upload API route in talentflow-ai/src/app/api/candidates/upload/route.ts
- [ ] T054 [US6] Complete PDF text extraction service in talentflow-ai/src/services/pdf.ts
- [ ] T055 [US6] Update CVUploader component in talentflow-ai/src/components/candidates/CVUploader.tsx
- [ ] T056 [US6] Add file size validation (max 5MB) and PDF-only restriction
- [ ] T057 [US6] Add upload progress indicator to CVUploader
- [ ] T058 [US6] Store cvUrl and cvText in candidate document after upload

**Checkpoint**: CV upload working with text extraction

---

## Phase 9: User Story 7 - AI CV Analysis and Match Score (Priority: P3)

**Goal**: DeepSeek-powered CV analysis with match score calculation

**Independent Test**: Upload CV, verify match score calculated, view highlights, verify ranking on job page

### Implementation for US7

- [ ] T059 [US7] Add analyze CV function to DeepSeek service in talentflow-ai/src/services/deepseek.ts
- [ ] T060 [US7] Complete analyze API route in talentflow-ai/src/app/api/candidates/analyze/route.ts
- [ ] T061 [US7] Trigger analysis after CV upload in upload route
- [ ] T062 [US7] Store matchScore and matchHighlights in candidate document
- [ ] T063 [US7] Display match score badge on CandidateCard in talentflow-ai/src/components/candidates/CandidateCard.tsx
- [ ] T064 [US7] Add match highlights section to candidate detail view
- [ ] T065 [US7] Sort candidates by match score on job detail page
- [ ] T066 [US7] Add re-analyze button when job requirements change

**Checkpoint**: AI CV analysis and ranking working

---

## Phase 10: User Story 8 - Dashboard Analytics (Priority: P3)

**Goal**: Overview dashboard with key recruitment metrics

**Independent Test**: View dashboard, verify stats are accurate, quick links work

### Implementation for US8

- [ ] T067 [US8] Create dashboard stats API endpoint or use existing services
- [ ] T068 [US8] Update dashboard page in talentflow-ai/src/app/(dashboard)/dashboard/page.tsx
- [ ] T069 [US8] Add total active jobs count widget
- [ ] T070 [US8] Add total candidates count widget
- [ ] T071 [US8] Add candidates by status breakdown chart
- [ ] T072 [US8] Add recent activity section (latest candidates/jobs)
- [ ] T073 [US8] Add quick action buttons (create job, upload CV)
- [ ] T074 [US8] Verify responsive layout for mobile

**Checkpoint**: Dashboard showing live metrics

---

## Phase 11: User Story 9 - OpenClaw LinkedIn Integration (Priority: P4)

**Goal**: LinkedIn profile discovery and storage

**Independent Test**: Enter LinkedIn URL, verify profile scraped, view in potential candidates list

### Implementation for US9

- [ ] T075 [US9] Add PotentialCandidate type to talentflow-ai/src/types/candidate.ts
- [ ] T076 [US9] Create scraper API route in talentflow-ai/src/app/api/scraper/linkedin/route.ts
- [ ] T077 [US9] Create OpenClaw integration service in talentflow-ai/src/services/openclaw.ts
- [ ] T078 [US9] Add potential candidates section to job detail page
- [ ] T079 [US9] Add "Convert to Candidate" button for potential candidates
- [ ] T080 [US9] Add LinkedIn URL input to candidates page

**Checkpoint**: LinkedIn integration working

---

## Phase 12: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and deployment preparation

- [ ] T081 [P] Add error boundary component in talentflow-ai/src/components/ui/ErrorBoundary.tsx
- [ ] T082 [P] Add toast notification component in talentflow-ai/src/components/ui/Toast.tsx
- [ ] T083 [P] Add loading skeletons for all list pages
- [ ] T084 Verify all API routes return proper error codes and messages
- [ ] T085 [P] Add accessibility attributes (aria-labels, roles) to interactive elements
- [ ] T086 [P] Verify responsive design on mobile/tablet viewports
- [ ] T087 Remove temporary design-system page
- [ ] T088 Update README.md with setup instructions
- [ ] T089 Verify build passes with `npm run build`
- [ ] T090 Deploy to Vercel and verify production works

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phase 3-11)**: All depend on Foundational completion
- **Polish (Phase 12)**: Depends on desired user stories being complete

### User Story Dependencies

- **US1 (Design System)**: No dependencies - can start after Foundational
- **US2 (Auth)**: No dependencies - can start after Foundational
- **US3 (Jobs CRUD)**: No dependencies - can start after Foundational
- **US4 (AI Description)**: Depends on US3 (JobForm must exist)
- **US5 (Candidates)**: No dependencies - can start after Foundational
- **US6 (CV Upload)**: Depends on US5 (candidate must exist)
- **US7 (CV Analysis)**: Depends on US6 (CV must be uploaded)
- **US8 (Dashboard)**: Depends on US3, US5 (needs jobs and candidates data)
- **US9 (LinkedIn)**: No dependencies - can start after Foundational

### Parallel Opportunities

- US1, US2, US3, US5, US9 can all start in parallel after Foundational
- Within each US, tasks marked [P] can run in parallel
- Different user stories can be worked on by different developers

---

## Parallel Example: Foundational Phase

```bash
# Launch all parallel foundational tasks together:
Task: "Add Modal component in talentflow-ai/src/components/ui/Modal.tsx"
Task: "Add Select component in talentflow-ai/src/components/ui/Select.tsx"
Task: "Add Textarea component in talentflow-ai/src/components/ui/Textarea.tsx"
Task: "Configure Tailwind dark mode in talentflow-ai/tailwind.config.ts"
Task: "Add dark mode CSS variables in talentflow-ai/src/app/globals.css"
```

---

## Implementation Strategy

### MVP First (US1 + US2 + US3)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: US1 (Design System)
4. Complete Phase 4: US2 (Auth)
5. Complete Phase 5: US3 (Jobs CRUD)
6. **STOP and VALIDATE**: Test core job management flow
7. Deploy MVP

### Incremental Delivery

1. MVP → Auth + Jobs working
2. Add US4 → AI descriptions working
3. Add US5 + US6 → Candidates + CV upload working
4. Add US7 → AI matching working
5. Add US8 → Dashboard complete
6. Add US9 → LinkedIn integration complete

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to user story for traceability
- Each user story independently testable
- Commit after each task or logical group
- Stop at any checkpoint to validate independently
- File paths are absolute from repo root
