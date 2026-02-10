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

The codebase is organized into FSD layers with strict import rules (higher layers can import from lower layers only):

```
src/
├── app/           # Application initialization, routing, global styles
├── pages/         # Page components (route-level)
├── widgets/       # Complex UI blocks (Layout, LessonEditor)
├── features/      # User interactions and business logic (pageController)
├── entities/      # Business entities (lesson, phone)
└── shared/        # Reusable utilities, UI kit, API client
    ├── ui/        # UI components organized by atomic design
    │   ├── atoms/      # Basic components (Button, TextField, Title)
    │   ├── molecules/  # Composite components (ListBox, TreeView)
    │   └── organisms/  # Complex components (SelectorButtonListbox)
    ├── api/       # API client and generated types
    └── ui-kit/    # Test UI components
```

### Import Aliases

Path aliases are configured for cleaner imports:
- `app` → `src/app/*`
- `pages` → `src/pages/*`
- `widgets` → `src/widgets/*`
- `features` → `src/features/*`
- `entities` → `src/entities/*`
- `shared` → `src/shared/*`

Example: `import { lessonApi } from "entities/lesson"`

### FSD Layer Rules

1. **Entities** contain business logic and API calls (e.g., [entities/lesson/api.ts](src/entities/lesson/api.ts))
2. **Features** orchestrate entity operations (e.g., [features/lesson/pageController.ts](src/features/lesson/pageController.ts))
3. **Widgets** compose features and entities into complex UI blocks
4. **Pages** assemble widgets and features into complete pages
5. Each layer exports through `index.ts` files for clean public API

## API Integration

### Type Generation

API types are auto-generated from OpenAPI specification:
- Source: Backend OpenAPI endpoint (http://localhost:3000/api-json)
- Output: [src/shared/api/typesApi.d.ts](src/shared/api/typesApi.d.ts)
- Generated types are referenced via `paths` type from typesApi

Example from [entities/lesson/api.ts](src/entities/lesson/api.ts):
```typescript
const findOneEndpoint = "/lesson/get/{id}";
type TFindOneResponse =
    paths[typeof findOneEndpoint]["get"]["responses"]["200"]["content"]["application/json"];
```

### API Client

Located in [shared/api/api.ts](src/shared/api/api.ts):
- `fetchData<T>(endpoint, method)` - Generic fetch wrapper
- `fetchPostData<T>(endpoint, body)` - POST requests
- Base URL configured via `import.meta.env.VITE_API_URL`

### Environment Variables

Access via Vite's `import.meta.env`:
- `VITE_API_URL` - Backend API base URL
- `VITE_TEST` - Test variable example

## Code Style

### ESLint + Prettier Configuration

From [.eslintrc.cjs](.eslintrc.cjs):
- **Quotes**: Double quotes (enforced)
- **Semicolons**: Required
- **Tab Width**: 4 spaces
- **Print Width**: 100 characters
- **Trailing Commas**: Always
- **Line Endings**: LF
- TypeScript `any` type: Warning only

### Component Structure

UI components follow this pattern:
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
├── index.ts           # Public exports
├── types.ts          # (if needed)
└── readme.md         # (optional)
```

## Routing

Routing is configured in [app/App.tsx](src/app/App.tsx) using react-router v7:
- `/` - HomePage
- `/lesson` - LessonPage (list)
- `/lesson/:id` - LessonIdPage (detail)
- `/about` - AboutPage
- `/api-docs` - SwaggerDoc
- `*` - NotFoundPage (404)

## Key Patterns

### Entity API Pattern

Entities expose typed API methods that map to OpenAPI endpoints:
```typescript
export const lessonApi = {
    getOne: async (path: { id: string }) => /* ... */,
    create: async (body: TCreateRequestBody) => /* ... */,
    update: async (body: TUpdateRequestBody) => /* ... */,
    delete: async (path: { id: string }) => /* ... */,
}
```

### Feature Controllers

Features orchestrate entity operations with business logic:
```typescript
export const pageController = {
    save: async (lessonId, text, pageNumber) => lessonApi.pageCreate({...}),
    update: async (lessonId, id, text, pageNumber) => lessonApi.pageUpdate({...}),
    delete: async (id) => lessonApi.pageDelete({id}),
}
```

## Notes

- The application is in early development (v1.0.0)
- No test suite is currently configured
- Backend must be running on localhost:3000 for API type generation
- Comments in code are sometimes in Russian
