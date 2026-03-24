# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite CMS frontend application for Korean language learning (klang-cms_front). The codebase follows **Feature-Sliced Design (FSD)** architecture with strict layer separation.

## Common Commands

```bash
# Development
npm run dev              # Start development server

# Building
npm run build            # Build for production
npm run serve            # Preview production build

# API Types
npm run generate:api     # Generate TypeScript types from OpenAPI spec at http://localhost:3000/api-json
```

Note: There are no lint or test commands configured yet.

## Architecture: Feature-Sliced Design (FSD)

Full spec: [docs/ARCH.md](docs/ARCH.md)

Layers (high → low): `app` → `pages` → `widgets` → `features` → `entities` → `shared`

Path aliases: `app`, `pages`, `widgets`, `features`, `entities`, `shared`

## API Integration

Full spec: [docs/API.md](docs/API.md)

- Types generated via `npm run generate:api` → [src/shared/api/typesApi.d.ts](src/shared/api/typesApi.d.ts)
- Fetch wrappers: `fetchData`, `fetchPostData`, `fetchPatchData` in [src/shared/api/api.ts](src/shared/api/api.ts)
- Env: `VITE_API_URL`

## Code Style & Component Structure

Full rules: [docs/STYLES.md](docs/STYLES.md)

Summary: double quotes, semicolons, 4-space tabs, 100-char width, trailing commas, LF.

## Design Theme: Chalk

Full spec: [docs/STYLES.md](docs/STYLES.md)

Key rules:
- Always use CSS variables from palette — **never hardcode colors**
- Button variants: `default | accept | cancel | alter | delete | ghost`
- Font: **Inter** (`--font-sans`)

## Notes

- The application is in early development (v1.0.0)
- No test suite is currently configured
- Backend must be running on localhost:3000 for API type generation
- Comments in code are sometimes in Russian
