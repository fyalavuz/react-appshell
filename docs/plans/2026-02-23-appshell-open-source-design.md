# AppShell Open Source Design

**Date:** 2026-02-23
**Status:** Approved

## Overview

AppShell is an open-source React component library providing mobile-first app shell primitives: Header, Footer (TabBar / Floating / Mini), SafeArea, and Content wrapper. Built with Tailwind CSS v4 and Framer Motion. Distributed as both an npm package (`@appshell/react`) and shadcn-style copy-paste CLI.

## Monorepo Structure

```
appshell/
├── packages/
│   └── react/                    ← @appshell/react (npm package)
│       ├── src/
│       │   ├── index.ts          ← public API barrel export
│       │   ├── AppShell.tsx      ← Wrapper: Header + Content + Footer + SafeArea
│       │   ├── Header.tsx        ← 6 scroll behaviors, 3 themes, mobile menu
│       │   ├── Footer.tsx        ← TabBar | Floating | Mini variants
│       │   ├── SafeArea.tsx      ← env(safe-area-inset-*) wrapper
│       │   ├── Content.tsx       ← Scrollable content area
│       │   ├── context.ts        ← AppShellContext (visibility state)
│       │   ├── hooks/
│       │   │   ├── use-scroll-direction.ts
│       │   │   ├── use-safe-area.ts
│       │   │   └── use-app-shell.ts
│       │   ├── types.ts
│       │   └── cn.ts
│       ├── __tests__/            ← Vitest unit tests
│       ├── tsup.config.ts        ← ESM + CJS build
│       └── package.json
├── apps/
│   ├── docs/                     ← Fumadocs (GitHub Pages)
│   │   ├── content/docs/         ← MDX pages
│   │   └── next.config.mjs       ← static export
│   └── examples/                 ← Fullscreen demo apps
│       └── app/
│           ├── social-app/
│           ├── ecommerce/
│           ├── messaging/
│           ├── music-player/
│           └── dashboard/
├── e2e/                          ← Playwright E2E tests
├── turbo.json
├── .github/workflows/
│   ├── ci.yml
│   ├── docs.yml
│   └── release.yml
├── LICENSE (MIT)
├── README.md
└── CONTRIBUTING.md
```

**Tooling:** Turborepo, pnpm workspaces, tsup (build), Vitest (unit), Playwright (E2E).

## Component API

### AppShell

```tsx
<AppShell safeArea={true}>
  <AppShell.Header behavior="reveal-nav" theme="light" ... />
  <AppShell.Content>{children}</AppShell.Content>
  <AppShell.Footer variant="tab-bar" behavior="auto-hide">
    <AppShell.Footer.Item icon={<Home />} label="Home" active />
  </AppShell.Footer>
</AppShell>
```

### Header

Preserved from existing HeaderSection with additions:
- **Behaviors:** static, fixed, reveal-all, reveal-nav, reveal-context, reveal-search
- **Themes:** light, primary, dark (extensible via CSS vars)
- **Props:** logo, actions, title, subtitle, searchContent, mobileMenu, onVisibilityChange
- **Animation:** Framer Motion for overlay transitions

### Footer Variants

**Tab Bar** (`variant="tab-bar"`):
- iOS/Android bottom tab navigation
- `behavior`: static | auto-hide | scroll-hide
- Badge support, active state animation
- Safe area bottom inset respected

**Floating** (`variant="floating"`):
- Floating pill-shape (FAB or pill bar)
- `position`: center | right | left
- Custom children content

**Mini** (`variant="mini"`):
- Compact toolbar (~48px) like Spotify now-playing
- Always visible or auto-hide
- Custom children

### SafeArea

```tsx
<SafeArea edges={["top", "bottom"]}>{children}</SafeArea>
```

Uses CSS `env(safe-area-inset-*)`. Edges prop selects which sides to pad.

### Shared Context

```ts
const { headerVisible, footerVisible, scrollDirection, safeAreaInsets } = useAppShell();
```

## Documentation Site (Fumadocs)

Pages:
- `/` — Landing (hero, features, install command)
- `/docs/getting-started` — Installation, Tailwind config
- `/docs/components/header` — API, props, behavior demos
- `/docs/components/footer` — Variants, behaviors
- `/docs/components/safe-area` — Usage
- `/docs/components/app-shell` — Full wrapper
- `/docs/hooks` — useAppShell, useScrollDirection, useSafeArea
- `/docs/theming` — CSS vars, dark mode
- `/docs/examples` — Links to fullscreen demos

Each page: live preview (iframe embed), props table, code snippets, variant picker.

## Fullscreen Examples

| Example | Header | Footer | Key Feature |
|---------|--------|--------|-------------|
| Social App | reveal-nav + search | tab-bar, auto-hide | Instagram/Twitter |
| E-commerce | fixed, title+search | floating (cart) | Shopify mobile |
| Messaging | static, context | mini (input bar) | WhatsApp |
| Music Player | reveal-all | mini (now playing) | Spotify |
| Dashboard | fixed | tab-bar, static | Admin panel |

All examples: fullscreen (100dvh), mobile-first, dark mode toggle, skeleton content.

## Test Strategy

### Unit (Vitest + RTL)

All components: every variant, every behavior mode, edge cases (no props, empty children, SSR).
Coverage in `packages/react/__tests__/`.

### E2E (Playwright)

Real scroll, viewport resize, mobile breakpoints on examples app.
Coverage in `e2e/`.

### CI/CD

- **ci.yml:** lint → test → build → e2e (every PR)
- **docs.yml:** build docs → deploy GH Pages (main push)
- **release.yml:** build → npm publish → GH Release (tag push)

## Distribution

1. **npm:** `pnpm add @appshell/react` — standard import
2. **CLI (shadcn-style):** `npx appshell add header` — copies source into project

Peer deps: react, react-dom, tailwindcss, framer-motion.
