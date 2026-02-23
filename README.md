# @appshell/react

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![npm](https://img.shields.io/npm/v/@appshell/react)](https://www.npmjs.com/package/@appshell/react)

Mobile-first app shell components for React. Build native-feeling headers, footers, tab bars, and safe-area layouts with scroll-aware behaviors and smooth animations.

## Install

```bash
pnpm add @appshell/react
```

Peer dependencies: `react`, `react-dom`, `framer-motion`, `tailwindcss` (v4+).

## Quick Start

```tsx
import { AppShell, Header, Content, Footer, FooterItem } from "@appshell/react";
import { Home, Search, User } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="reveal-nav"
        theme="light"
        logo={<span className="font-bold">MyApp</span>}
      />
      <Content>
        <main className="p-4">Your content here</main>
      </Content>
      <Footer variant="tab-bar" behavior="auto-hide">
        <FooterItem icon={<Home />} label="Home" active />
        <FooterItem icon={<Search />} label="Search" />
        <FooterItem icon={<User />} label="Profile" />
      </Footer>
    </AppShell>
  );
}
```

## Features

- **Header** with 5 scroll behaviors: `fixed`, `static`, `reveal-all`, `reveal-nav`, `reveal-context`, `reveal-search`
- **Footer** with 3 variants: `tab-bar`, `floating`, `mini`
- **Auto-hide** footer behavior tied to scroll direction
- **SafeArea** for mobile notch/gesture-bar insets
- **Dark, light, and primary** header themes
- **Mobile menu** support with animated drawer
- **Framer Motion** powered animations
- **Tailwind CSS v4** styling with full customization
- **SSR-safe** with `"use client"` directives
- **Fully typed** with exported TypeScript types

## Components

| Component | Description |
|-----------|-------------|
| `AppShell` | Root wrapper with optional SafeArea |
| `Header` | Scroll-aware header with nav, context, and search rows |
| `Content` | Main content area |
| `Footer` | Tab bar, floating button, or mini bar |
| `FooterItem` | Individual tab inside a tab-bar footer |
| `SafeArea` | Mobile safe-area inset handler |

## Documentation

Visit the [documentation site](https://appshell.dev) for full API reference, guides, and interactive examples.

## Examples

See the `apps/examples` directory for 5 fullscreen demos:

- **Social App** -- reveal-nav header + auto-hide tab bar
- **E-commerce** -- fixed header + floating cart button
- **Messaging** -- static header + mini input bar
- **Dashboard** -- fixed dark header + static tab bar + mobile menu
- **Music Player** -- reveal-all header + mini now-playing bar

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## License

[MIT](./LICENSE)
