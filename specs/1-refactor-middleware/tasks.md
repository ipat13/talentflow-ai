---

description: "Task list for middleware refactoring implementation"

---

# Tasks: Refatoração de Middleware

**Input**: Design documents from `/specs/1-refactor-middleware/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md

**Tests**: Not requested in spec - verification via manual testing and lint

**Organization**: Tasks are grouped by user story to enable independent implementation and testing

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Project Already Exists)

**Purpose**: This is an existing project with working middleware - no setup required

---

## Phase 2: Foundational (Working Auth Already Exists)

**Purpose**: This is a refactoring task - existing authentication infrastructure is already in place

---

## Phase 3: User Story 1 - Melhoria na Estrutura do Código (Priority: P1) 🎯 MVP

**Goal**: Refatorar o middleware para ter estrutura limpa e manutenível com funções pequenas

**Independent Test**: Acessar /dashboard sem login → redireciona para /login; Acessar /login com login → redireciona para /dashboard

### Implementation for User Story 1

- [ ] T001 [P] [US1] Analisar código atual do middleware em talentflow-ai/src/middleware.ts
- [ ] T002 [P] [US1] Criar utilitário de rotas em talentflow-ai/src/middleware/routes.ts para extrair lógica de rotas
- [ ] T003 [P] [US1] Criar handler de autenticação em talentflow-ai/src/middleware/auth-handler.ts
- [ ] T004 [US1] Refatorar middleware principal em talentflow-ai/src/middleware.ts usando os novos utilitários
- [ ] T005 [US1] Executar npm run lint para verificar código
- [ ] T006 [US1] Testar fluxos de autenticação manualmente

**Checkpoint**: Middleware refatorado com estrutura limpa - funcionalidades existentes preservadas

---

## Phase 4: User Story 2 - Extensibilidade para Novas Funcionalidades (Priority: P2)

**Goal**: Adicionar padrão Chain of Responsibility para permitir novas verificações sem modificar código existente

**Independent Test**: Adicionar nova verificação de middleware (ex: rate limiting) sem alterar código existente

### Implementation for User Story 2

- [ ] T007 [P] [US2] Criar interface de middleware em talentflow-ai/src/middleware/types.ts
- [ ] T008 [P] [US2] Criar executor de middleware chain em talentflow-ai/src/middleware/chain.ts
- [ ] T009 [US2] Implementar handler de proteção de rotas como middleware separado
- [ ] T010 [US2] Implementar handler de redirect auth como middleware separado
- [ ] T011 [US2] Atualizar middleware principal para usar a chain
- [ ] T012 [US2] Documentar como adicionar novo middleware
- [ ] T013 [US2] Testar que nova funcionalidade pode ser adicionada sem modificar código existente

**Checkpoint**: Sistema extensível para novas funcionalidades de middleware

---

## Phase 5: User Story 3 - Tratamento de Casos Edge (Priority: P3)

**Goal**: Tratar cookies ausentes/malformados e evitar redirecionamentos circulares

**Independent Test**: Enviar requisições com dados incompletos e verificar comportamento apropriado

### Implementation for User Story 3

- [ ] T014 [P] [US3] Criar validador de sessão em talentflow-ai/src/middleware/session-validator.ts
- [ ] T015 [P] [US3] Implementar verificação de cookie vazio/malformado
- [ ] T016 [US3] Adicionar proteção contra redirect loop
- [ ] T017 [US3] Testar edge cases: cookie vazio, cookie malformado, redirect loop

**Checkpoint**: Edge cases tratados adequadamente

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T018 [P] Executar npm run lint e corrigir warnings
- [ ] T019 Verificar compatibilidade com quickstart.md
- [ ] T020 Atualizar documentação do middleware se necessário

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1-2**: Não aplicável (projeto já existe)
- **User Stories (Phase 3+)**: Podem proceder sequencialmente ou em paralelo
- **Polish (Phase 6)**: Depende de todas as user stories completas

### User Story Dependencies

- **User Story 1 (P1)**: Pode começar imediatamente - Refatoração base
- **User Story 2 (P2)**: Depende de US1 - Adiciona extensibilidade sobre a estrutura nova
- **User Story 3 (P3)**: Pode começar após US1 - Adiciona tratamento de edge cases

### Within Each User Story

- Análise antes de implementação
- Utilitários/Types antes de handlers
- Handlers antes de integração na chain
- Teste manual após cada story

### Parallel Opportunities

- T001, T002, T003 podem ser feitas em paralelo (análise e utilitários)
- T007, T008 podem ser feitas em paralelo (estrutura de chain)
- T014, T015 podem ser feitas em paralelo (validador de sessão)
- Diferentes developers podem trabalhar em user stories diferentes em paralelo

---

## Parallel Example: User Story 1

```bash
# Analisar código atual e criar utilitários em paralelo:
Task: "Analisar código atual do middleware em talentflow-ai/src/middleware.ts"
Task: "Criar utilitário de rotas em talentflow-ai/src/middleware/routes.ts"
Task: "Criar handler de autenticação em talentflow-ai/src/middleware/auth-handler.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Phase 3: User Story 1
2. **PARAR e VALIDAR**: Testar que autenticação ainda funciona
3. Deploy/demo se pronto

### Incremental Delivery

1. Completar User Story 1 → Testar → Deploy (MVP!)
2. Completar User Story 2 → Testar → Deploy
3. Completar User Story 3 → Testar → Deploy
4. Cada story adiciona valor sem quebrar stories anteriores

### Parallel Team Strategy

Com múltiplos developers:

1. Developer A: User Story 1 (estrutura base)
2. Developer B: User Story 2 (extensibilidade) - pode começar após T004
3. Developer C: User Story 3 (edge cases) - pode começar após T004

---

## Notes

- [P] tasks = diferentes ficheiros, sem dependências
- [Story] label mapeia task para user story específica
- Cada user story deve ser completável e testável independentemente
- Testes manuais após cada story
- Commit após cada task ou grupo lógico
- Parar em qualquer checkpoint para validar story independentemente
- Evitar: tasks vagas, conflitos no mesmo ficheiro, dependências cross-story que quebram independência
