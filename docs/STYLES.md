# Styles: Design Theme "Chalk"

## Theme Files

- [src/shared/ui/theme/palette.css](../src/shared/ui/theme/palette.css) — CSS variables
- [src/shared/ui/theme/fonts.css](../src/shared/ui/theme/fonts.css) — font imports

Font: **Inter** (`--font-sans`), imported via Google Fonts.

---

## CSS Variables

```css
/* Backgrounds */
--color-bg: #f4f4f6;          /* page background */
--color-surface: #ffffff;      /* card / panel surface */
--color-border: #e2e2e8;       /* borders, dividers */

/* Text */
--color-text: #18181b;         /* primary text */
--color-text-muted: #71717a;   /* secondary / label text */

/* Overlays */
--color-overlay-hover: #18181b0d;   /* ~5%  — ghost button hover bg */
--color-overlay-active: #18181b1a;  /* ~10% — ghost button active bg */

/* Semantic colors (raw) */
--color-accent: #6d4aff;   /* violet — primary action */
--color-accept: #16a34a;   /* green  — confirm / success */
--color-cancel: #a1a1aa;   /* gray   — neutral / cancel */
--color-delete: #dc2626;   /* red    — destructive */
--color-alter:  #2563eb;   /* blue   — alternative action */

/* Button tints: bg + text-on-bg pairs */
--color-accent-tint: #ede9ff;  --color-accent-on: #4f28e0;
--color-accept-tint: #dcfce7;  --color-accept-on: #15803d;
--color-cancel-tint: #f4f4f5;  --color-cancel-on: #52525b;
--color-delete-tint: #fee2e2;  --color-delete-on: #b91c1c;
--color-alter-tint:  #dbeafe;  --color-alter-on:  #1d4ed8;
```

---

## CSS Modules Rule

Always use CSS variables from palette — **never hardcode colors**.

```css
.myElement {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    color: var(--color-text);
}
```

---

## Button Component

Source: [src/shared/ui/atoms/Button/Button.tsx](../src/shared/ui/atoms/Button/Button.tsx)

### Variants

```tsx
<Button variant="default | accept | cancel | alter | delete | ghost" onClick={handler}>
    Label
</Button>
```

| Variant   | Background              | Text color              | Use case              |
|-----------|-------------------------|-------------------------|-----------------------|
| `default` | `--color-accent-tint`   | `--color-accent-on`     | Primary action        |
| `accept`  | `--color-accept-tint`   | `--color-accept-on`     | Confirm / success     |
| `cancel`  | `--color-cancel-tint`   | `--color-cancel-on`     | Neutral / dismiss     |
| `alter`   | `--color-alter-tint`    | `--color-alter-on`      | Alternative action    |
| `delete`  | `--color-delete-tint`   | `--color-delete-on`     | Destructive           |
| `ghost`   | transparent             | inherits                | Inline / menu items   |

### Base Styles

```
border-radius: 6px
font-size: 13px
font-weight: 500
letter-spacing: 0.04em
text-transform: uppercase
```

### Interaction

```
transition: opacity 0.15s ease, transform 0.1s ease
hover  → opacity: 0.8
active → scale(0.97)
```

`ghost` variant: transparent bg, full-width block, uses `--color-overlay-hover` / `--color-overlay-active` on hover/active.

---

## Code Style

From [.eslintrc.cjs](../.eslintrc.cjs):

| Rule            | Value         |
|-----------------|---------------|
| Quotes          | Double        |
| Semicolons      | Required      |
| Tab Width       | 4 spaces      |
| Print Width     | 100 chars     |
| Trailing Commas | Always        |
| Line Endings    | LF            |
| `any` type      | Warning only  |

---

## Component Structure Convention

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
├── index.ts           # Public exports
├── types.ts           # (if needed)
└── readme.md          # (optional)
```
