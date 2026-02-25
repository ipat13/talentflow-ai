# Data Model: Refatoração de Middleware

**Feature**: 1-refactor-middleware  
**Date**: 2026-02-25

## Overview

Esta é uma refatoração de código existente. Não há novas entidades de dados ou mudanças no modelo de dados.

## Existing Entities (para referência)

### SessionCookie
- **Tipo**: Cookie de autenticação
- **Nome**: `session`
- **Validação**: Presença do cookie indica sessão ativa
- **Notas**: Gerido pelo Firebase Auth

### ProtectedRoutes
- **Tipo**: Array de strings
- **Valor**: `["/dashboard", "/jobs", "/candidates"]`
- **Uso**: Rotas que requerem autenticação

### AuthRoutes
- **Tipo**: Array de strings  
- **Valor**: `["/login"]`
- **Uso**: Rotas acessíveis apenas para não autenticados

## No New Entities

Esta refatoração não adiciona, remove ou modifica entidades. Mantém o mesmo contrato de dados.
