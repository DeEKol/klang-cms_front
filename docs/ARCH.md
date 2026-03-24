# Architecture: Feature-Sliced Design (FSD)

## Layer Structure

Higher layers can import from lower layers only.

```
src/
├── app/           # Инициализация, роутинг, глобальные стили
├── pages/         # Страницы (route-level компоненты)
├── widgets/       # Сложные UI-блоки (Layout, LessonEditor)
├── features/      # Бизнес-логика, пользовательские взаимодействия
├── entities/      # Бизнес-сущности (lesson, section, page, worker)
└── shared/        # Переиспользуемые утилиты, UI kit, API-клиент
    ├── ui/
    │   ├── atoms/      # Базовые компоненты (Button, TextField, Title)
    │   ├── molecules/  # Составные компоненты (ListBox, TreeView)
    │   └── organisms/  # Сложные компоненты (SelectorButtonListbox)
    ├── api/            # API-клиент и сгенерированные типы
    ├── lib/            # Утилиты (auth.ts, url.ts)
    └── ui-kit/         # Тестовые UI-компоненты
```

---

## Import Aliases

```typescript
import { lessonApi } from "entities/lesson";
import { pageController } from "features/lesson";
import { Button } from "shared/ui/atoms/Button";
```

| Alias       | Path            |
|-------------|-----------------|
| `app`       | `src/app/*`     |
| `pages`     | `src/pages/*`   |
| `widgets`   | `src/widgets/*` |
| `features`  | `src/features/*`|
| `entities`  | `src/entities/*`|
| `shared`    | `src/shared/*`  |

---

## Layer Rules

### `entities/`
- Содержат бизнес-логику и API-вызовы
- Экспортируют `entityApi`, типы и модели через `index.ts`
- Текущие сущности: `lesson`, `section`, `page`, `worker`

### `features/`
- Оркестрируют операции над entities
- Содержат контроллеры и хуки с бизнес-логикой
- Пример: `features/lesson/pageController.ts`

### `widgets/`
- Компонуют features и entities в сложные UI-блоки
- Пример: `widgets/lesson/LessonEditor`

### `pages/`
- Собирают widgets и features в полные страницы
- Напрямую не содержат бизнес-логику

### `shared/`
- Не знает ни о каких вышестоящих слоях
- `shared/api` — fetch-обёртки и сгенерированные типы
- `shared/lib` — утилиты без UI (auth, url)
- `shared/ui` — чистые UI-компоненты без бизнес-логики

---

## Entity API Pattern

```typescript
const baseEndpoint = "/cms/lessons/{id}";
const createEndpoint = "/cms/lessons";

type TResponse = paths[typeof baseEndpoint]["get"]["responses"]["200"]["content"]["application/json"];

export const lessonApi = {
    getOne:  async (path: { id: string })              => fetchData(`${base}${path.id}`),
    create:  async (body: TCreateBody)                 => fetchPostData(createEndpoint, body),
    update:  async (path: { id: string }, body: TBody) => fetchPatchData(`${base}${path.id}`, body),
    delete:  async (path: { id: string })              => fetchData(`${base}${path.id}`, "DELETE"),
};
```

Path param substitution: `trimPathParam(endpoint, "{id}")` из `shared/lib/url.ts`.

---

## Feature Controller Pattern

```typescript
import { pageApi } from "entities/page";

export const pageController = {
    save:   async (lessonId, text, pageNumber) => pageApi.create({ lessonId, text, pageNumber }),
    update: async (lessonId, id, text, pageNumber) => pageApi.update({ id }, { id, lessonId, text, pageNumber }),
    delete: async (id) => pageApi.delete({ id }),
};
```

---

## Routing

Конфигурация: [src/app/App.tsx](../src/app/App.tsx) — react-router v7.

```
/sign-in          → SignInPage      (публичный)
/                 → HomePage        ┐
/lesson           → LessonPage      │ защищены
/lesson/:id       → LessonIdPage    │ ProtectedRoute
/about            → AboutPage       │
/api-docs         → SwaggerDoc      ┘
*                 → NotFoundPage
```

`ProtectedRoute` ([src/app/ProtectedRoute.tsx](../src/app/ProtectedRoute.tsx)):
- Если токен валиден → `<Outlet />`
- Если токен истёк → пробует refresh через httpOnly cookie
- Если refresh не удался → редирект на `/sign-in`

---

## API Integration

Типы генерируются из OpenAPI-спецификации:

```bash
npm run generate:api   # backend должен работать на localhost:3000
```

- Источник: `http://localhost:3000/api-json`
- Вывод: [src/shared/api/typesApi.d.ts](../src/shared/api/typesApi.d.ts)

Fetch-обёртки ([src/shared/api/api.ts](../src/shared/api/api.ts)):

| Функция           | Метод  | Тело |
|-------------------|--------|------|
| `fetchData`       | GET / DELETE / POST | нет |
| `fetchPostData`   | POST   | да   |
| `fetchPatchData`  | PATCH  | да   |

Все запросы: `credentials: "include"`, Bearer-токен из `localStorage`, автоматический retry на 401 через refresh.

---

## Auth Flow

1. Worker вводит логин/пароль → `POST /cms/workers/auth/sign-in`
2. Сервер возвращает `accessToken` (в теле) + `refreshToken` (httpOnly cookie)
3. `accessToken` хранится в `localStorage`, декодируется для проверки `exp`
4. При истёкшем токене: `POST /cms/workers/auth/refresh` с cookie → новый `accessToken`
5. Утилиты: [src/shared/lib/auth.ts](../src/shared/lib/auth.ts)
