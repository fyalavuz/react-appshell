"use client";

import { AppShell, Header, Content, HeaderNav, HeaderNavItem, MotionProvider } from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import { Github, Moon, BookOpen, Code2, Layers, Zap, Shield, Palette, Terminal, Puzzle } from "lucide-react";

const accentColors = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-rose-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-pink-500",
];

const iconBgColors = [
  "bg-violet-100 text-violet-600",
  "bg-blue-100 text-blue-600",
  "bg-amber-100 text-amber-600",
  "bg-emerald-100 text-emerald-600",
  "bg-sky-100 text-sky-600",
  "bg-rose-100 text-rose-600",
  "bg-orange-100 text-orange-600",
  "bg-teal-100 text-teal-600",
  "bg-indigo-100 text-indigo-600",
  "bg-pink-100 text-pink-600",
];

const sections = [
  {
    icon: <BookOpen className="size-5" />,
    title: "Getting Started",
    content:
      "Install the package using your preferred package manager. AppShell provides a composable set of layout primitives designed for modern React applications. The library is fully tree-shakable, ships with zero dependencies on the core package, and supports both CSS and Framer Motion animation adapters out of the box.",
    code: "npm install @appshell/react",
  },
  {
    icon: <Layers className="size-5" />,
    title: "Layout Composition",
    content:
      "The AppShell component is the root container that orchestrates Header, Content, Footer, and Sidebar. It manages shared scroll state, visibility signals, and safe-area insets. Wrap your entire page in AppShell and compose child components declaratively. Each child component opts into the layout system automatically.",
    code: "<AppShell safeArea>\n  <Header behavior=\"fixed\" />\n  <Content>...</Content>\n  <Footer variant=\"tab-bar\" />\n</AppShell>",
  },
  {
    icon: <Zap className="size-5" />,
    title: "Header Behaviors",
    content:
      "The Header component supports six distinct scroll behaviors: static (scrolls with content), fixed (always visible), reveal-all (reveals entire header on scroll up), reveal-nav (reveals only the nav row), reveal-context (reveals title and subtitle), and reveal-search (reveals the search bar). Each behavior is designed for specific UX patterns.",
    code: '<Header behavior="reveal-nav" theme="light" />',
  },
  {
    icon: <Shield className="size-5" />,
    title: "Theme System",
    content:
      "Headers support three built-in themes: light, primary, and dark. The light theme uses a white background with dark text, suitable for most content-focused applications. The primary theme applies your brand color as the background, ideal for dashboards. The dark theme provides a slate-900 background for media-rich interfaces.",
    code: '<Header theme="primary" />',
  },
  {
    icon: <Code2 className="size-5" />,
    title: "Server Components Compatible",
    content:
      "While AppShell components are client components by necessity (they manage scroll state and animations), they are designed to wrap Server Component children seamlessly. Your page content, data fetching, and business logic can remain as RSC. Only the shell itself needs the client boundary.",
    code: "// page.tsx (Server Component)\nexport default function Page() {\n  const data = await getData();\n  return <ClientShell data={data} />;\n}",
  },
  {
    icon: <Palette className="size-5" />,
    title: "Animation Adapters",
    content:
      "AppShell ships with a pluggable animation system. The default CSS adapter uses CSS transitions for zero-dependency animations. For richer spring-based motion, swap in the Framer Motion adapter. Both adapters implement the same MotionAdapter interface, making them interchangeable without changing component code.",
    code: "import { framerMotionAdapter } from \"@appshell/react/motion-framer\";\n\n<MotionProvider adapter={framerMotionAdapter}>\n  <AppShell>...</AppShell>\n</MotionProvider>",
  },
  {
    icon: <Terminal className="size-5" />,
    title: "Footer Variants",
    content:
      "The Footer component supports three visual variants: tab-bar (full-width mobile navigation), floating (centered pill shape), and mini (compact single-row). Combined with the auto-hide behavior, you can create footers that gracefully disappear when scrolling down and reappear on scroll up, preserving content space.",
    code: '<Footer variant="floating" behavior="auto-hide">\n  <FooterItem icon={<Home />} label="Home" active />\n  <FooterItem icon={<Search />} label="Search" />\n</Footer>',
  },
  {
    icon: <Puzzle className="size-5" />,
    title: "Sidebar Navigation",
    content:
      "The Sidebar component provides an overlay drawer with left or right positioning. It includes built-in backdrop dimming, swipe-to-close gestures, and focus trapping. Use NavGroup and NavItem components inside the sidebar for organized, accessible navigation with collapsible sections and active state indicators.",
    code: '<Sidebar open={open} onClose={() => setOpen(false)} side="left">\n  <NavGroup title="Main">\n    <NavItem label="Dashboard" icon={<Home />} active />\n  </NavGroup>\n</Sidebar>',
  },
  {
    icon: <Zap className="size-5" />,
    title: "Performance Considerations",
    content:
      "AppShell is optimized for performance. All components use React.memo to prevent unnecessary re-renders. Scroll event handlers are passive and debounced. The resize observer for header measurement uses a single instance. CSS animations use transform and opacity exclusively for GPU-accelerated compositing.",
    code: "// All components are memoized\nexport const Header = memo(function Header(props) {\n  // ...\n});",
  },
  {
    icon: <Shield className="size-5" />,
    title: "Accessibility",
    content:
      "Every component follows WAI-ARIA best practices. The mobile menu panel uses proper expand/collapse semantics with aria-label and aria-expanded attributes. Focus is managed when the sidebar opens and closes. The header overlay is marked aria-hidden to prevent duplicate landmark announcements for screen readers.",
    code: '<button\n  aria-label={open ? "Close menu" : "Open menu"}\n  aria-expanded={open}\n>\n  {open ? <CloseIcon /> : <MenuIcon />}\n</button>',
  },
];

export default function StaticHeaderPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="static"
          theme="primary"
          logo={
            <span className="text-lg font-bold tracking-tight">Docs</span>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem
                label="Guide"
                active
                className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 data-[active]:text-primary-foreground data-[active]:bg-white/10"
              />
              <HeaderNavItem
                label="API"
                className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"
              />
              <HeaderNavItem
                label="Examples"
                className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"
              />
              <HeaderNavItem
                label="Blog"
                className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"
              />
            </HeaderNav>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg p-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="size-5" />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 transition-colors"
                aria-label="Toggle dark mode"
              >
                <Moon className="size-5" />
              </button>
            </div>
          }
        />
        <Content className="pb-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-8">
            <div className="mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                AppShell Documentation
              </h1>
              <p className="mt-3 text-lg text-gray-500 leading-relaxed">
                A composable layout system for modern React applications.
                Build app shells with fixed, sticky, and reveal headers,
                animated footers, and slide-out sidebars.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/60 ring-inset">
                  v1.0.0
                </span>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200/60 ring-inset">
                  React 19+
                </span>
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-200/60 ring-inset">
                  TypeScript
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {sections.map((section, i) => (
                <section
                  key={i}
                  className="group relative rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  {/* Left colored accent bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentColors[i]} rounded-l-2xl`} />

                  <div className="p-6 pl-7">
                    <div className="flex items-start gap-4">
                      <div className={`flex items-center justify-center size-10 rounded-xl ${iconBgColors[i]} shrink-0`}>
                        {section.icon}
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {section.title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mx-7 border-t border-gray-100" />

                  <div className="mx-7 my-4 rounded-xl bg-gray-950 p-4 overflow-x-auto">
                    <pre className="text-[13px] font-mono text-gray-300 leading-relaxed">
                      <code>{section.code}</code>
                    </pre>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Content>

        {/* Floating variant indicator */}
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1.5 text-[11px] font-mono text-white/80 shadow-lg">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          behavior=&quot;static&quot; theme=&quot;primary&quot;
        </div>
      </AppShell>
    </MotionProvider>
  );
}
