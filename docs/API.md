# API

## Overview

```
src/shared/
├── api/
│   ├── api.ts          # fetch wrappers
│   ├── typesApi.d.ts   # auto-generated OpenAPI types — do not edit
│   └── index.ts        # public re-exports
└── lib/
    ├── auth.ts         # token helpers
    └── url.ts          # trimPathParam
```

---

## Authentication

All endpoints require a Bearer token, attached automatically by the fetch wrappers via `getAccessToken()`.

```
Authorization: Bearer <accessToken>
```

Refresh token is stored server-side in an **httpOnly cookie** — not accessible from JS.
All fetch wrappers send `credentials: "include"` so the cookie is forwarded automatically.

**Token helpers** (`src/shared/lib/auth.ts`):

| Function | Description |
|---|---|
| `getAccessToken()` | Returns `accessToken` from `localStorage` or `null` |
| `isAuthenticated()` | Token exists **and** not expired (JWT `exp` via `atob`) |
| `saveTokens(accessToken)` | Saves access token to `localStorage` |
| `clearTokens()` | Removes access token from `localStorage` |

**Public endpoints** (no token required):

| Endpoint | Description |
|---|---|
| `POST /cms/workers/auth/sign-in` | Sign in, returns `accessToken` in body + refresh in cookie |
| `POST /cms/workers/auth/refresh` | Issue new `accessToken` using httpOnly refresh cookie |

All other endpoints are protected. Expired or missing token → `ProtectedRoute` redirects to `/sign-in`.

---

## Generating types

```bash
npm run generate:api
```

Requires backend on `http://localhost:3000`. Output: `src/shared/api/typesApi.d.ts`. Do not edit manually.

---

## Fetch wrappers

```typescript
import { fetchData, fetchPostData, fetchPatchData } from "shared/api";

fetchData<T>(endpoint, method?)      // GET / DELETE / POST without body
fetchPostData<T>(endpoint, body)     // POST with body
fetchPatchData<T>(endpoint, body)    // PATCH with body
```

All wrappers:
- Prepend `VITE_API_URL`
- Attach `Content-Type: application/json`
- Attach `Authorization: Bearer <token>` if present in `localStorage`
- Send `credentials: "include"` (httpOnly cookie forwarding)
- Throw on non-2xx

---

## Typing endpoints

Always derive types from `paths` — never write manually.

```typescript
import { paths } from "shared/api";

const baseEndpoint = "/cms/lessons/{id}";

// Response
type TResponse =
    paths[typeof baseEndpoint]["get"]["responses"]["200"]["content"]["application/json"];

// Path param
type TRequestPath =
    paths[typeof baseEndpoint]["get"]["parameters"]["path"];

// Request body (POST / PATCH)
type TRequestBody =
    paths[typeof baseEndpoint]["patch"]["requestBody"]["content"]["application/json"];
```

For path parameters use `trimPathParam` from `shared/lib/url`:

```typescript
import { trimPathParam } from "shared/lib/url";

// "/cms/lessons/{id}" + id → "/cms/lessons/abc-123"
fetchData(`${trimPathParam(baseEndpoint, "{id}")}${path.id}`)
```

PATCH endpoints take both path and body:

```typescript
fetchPatchData(`${trimPathParam(baseEndpoint, "{id}")}${path.id}`, body)
```

---

## Entity API pattern

```typescript
// entities/lesson/api.ts
import { paths, fetchData, fetchPostData, fetchPatchData } from "shared/api";
import { trimPathParam } from "shared/lib/url";

const baseEndpoint = "/cms/lessons/{id}";
const createEndpoint = "/cms/lessons";

export const lessonApi = {
    getOne:  async (path) => fetchData(`${trimPathParam(baseEndpoint, "{id}")}${path.id}`),
    create:  async (body) => fetchPostData(createEndpoint, body),
    update:  async (path, body) => fetchPatchData(`${trimPathParam(baseEndpoint, "{id}")}${path.id}`, body),
    delete:  async (path) => fetchData(`${trimPathParam(baseEndpoint, "{id}")}${path.id}`, "DELETE"),
};
```

Import via entity index:

```typescript
import { lessonApi, type TLessonResponse } from "entities/lesson";
```

---

## Entities

| Entity | Api object | Endpoints |
|---|---|---|
| `entities/lesson` | `lessonApi` | `GET /cms/lessons/{id}`, `POST /cms/lessons`, `PATCH /cms/lessons/{id}`, `DELETE /cms/lessons/{id}` |
| `entities/page` | `pageApi` | `POST /cms/pages`, `PATCH /cms/pages/{id}`, `DELETE /cms/pages/{id}` |
| `entities/section` | `sectionApi` | `GET /cms/sections`, `GET /cms/sections/{id}`, `POST /cms/sections`, `PATCH /cms/sections/{id}`, `DELETE /cms/sections/{id}` |
| `entities/worker` | `workerApi` | `POST /cms/workers/auth/sign-in`, `POST /cms/workers/auth/refresh`, `POST /cms/workers` |

---

## Features

| Feature | File | Description |
|---|---|---|
| `pageController` | `features/lesson/pageController.ts` | Orchestrates page CRUD via `pageApi` |

**`pageController` API:**

```typescript
import { pageController } from "features/lesson";

pageController.save(lessonId, text, pageNumber)          // → pageApi.create
pageController.update(lessonId, id, text, pageNumber)    // → pageApi.update({ id }, { id, lessonId, text, pageNumber })
pageController.delete(id)                                // → pageApi.delete({ id })
pageController.cancel(pageDefault)                       // returns pageDefault as-is
```

---

## Endpoints reference

All paths relative to `VITE_API_URL`.

### Section

| Method | Path | Auth | Entity method | Description |
|---|---|---|---|---|
| GET | `/cms/sections` | Yes | `sectionApi.findAll` | Get all sections with lessons |
| POST | `/cms/sections` | Yes | `sectionApi.create` | Create section |
| GET | `/cms/sections/{id}` | Yes | `sectionApi.findOne` | Get one section |
| PATCH | `/cms/sections/{id}` | Yes | `sectionApi.update` | Update section |
| DELETE | `/cms/sections/{id}` | Yes | `sectionApi.delete` | Delete section |

### Lesson

| Method | Path | Auth | Entity method | Description |
|---|---|---|---|---|
| POST | `/cms/lessons` | Yes | `lessonApi.create` | Create lesson |
| GET | `/cms/lessons/{id}` | Yes | `lessonApi.getOne` | Get lesson with pages |
| PATCH | `/cms/lessons/{id}` | Yes | `lessonApi.update` | Update lesson |
| DELETE | `/cms/lessons/{id}` | Yes | `lessonApi.delete` | Delete lesson |

### Page

| Method | Path | Auth | Entity method | Description |
|---|---|---|---|---|
| POST | `/cms/pages` | Yes | `pageApi.create` | Create page |
| PATCH | `/cms/pages/{id}` | Yes | `pageApi.update` | Update page |
| DELETE | `/cms/pages/{id}` | Yes | `pageApi.delete` | Delete page |

### Worker

| Method | Path | Auth | Entity method | Description |
|---|---|---|---|---|
| POST | `/cms/workers/auth/sign-in` | No | `workerApi.signIn` | Sign in → `accessToken` + httpOnly refresh cookie |
| POST | `/cms/workers/auth/refresh` | No | `workerApi.refresh` | Refresh access token via httpOnly cookie |
| POST | `/cms/workers` | Yes | `workerApi.create` | Create worker (`admin` or `editor`) |

---

## Environment variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend base URL, e.g. `http://localhost:3000` |
