import Link from "next/link";
import {
  ChevronRight,
  PanelTop,
  EyeOff,
  Palette,
  Rows3,
  Orbit,
  Minus,
  PanelLeft,
  Navigation,
  GripHorizontal,
  Smartphone,
  Layout,
  PanelBottom,
  Square,
} from "lucide-react";

const sections = [
  {
    title: "Header Variants",
    description: "Different header behaviors for various use cases",
    accent: "violet",
    dotColor: "bg-violet-500",
    glowColor: "group-hover:shadow-violet-500/20",
    items: [
      {
        slug: "fixed-header",
        title: "Fixed Header",
        desc: "Always visible, sticks to top on scroll",
        props: 'behavior="fixed"',
        gradient: "from-blue-500 to-cyan-400",
        icon: PanelTop,
      },
      {
        slug: "reveal-header",
        title: "Reveal Header",
        desc: "Hides on scroll down, reveals on scroll up",
        props: 'behavior="reveal-nav"',
        gradient: "from-violet-500 to-purple-400",
        icon: EyeOff,
      },
      {
        slug: "static-header",
        title: "Static Header",
        desc: "Scrolls with content, primary theme",
        props: 'behavior="static" theme="primary"',
        gradient: "from-emerald-500 to-teal-400",
        icon: Palette,
      },
    ],
  },
  {
    title: "Footer Variants",
    description: "Tab bars, floating buttons, and compact toolbars",
    accent: "rose",
    dotColor: "bg-rose-500",
    glowColor: "group-hover:shadow-rose-500/20",
    items: [
      {
        slug: "tab-bar",
        title: "Tab Bar",
        desc: "Mobile tab navigation with auto-hide and badges",
        props: 'variant="tab-bar" behavior="auto-hide"',
        gradient: "from-pink-500 to-rose-400",
        icon: Rows3,
      },
      {
        slug: "floating-footer",
        title: "Floating Footer",
        desc: "Floating action button with position control",
        props: 'variant="floating"',
        gradient: "from-orange-500 to-amber-400",
        icon: Orbit,
      },
      {
        slug: "mini-footer",
        title: "Mini Footer",
        desc: "Compact toolbar bar, great for inputs",
        props: 'variant="mini"',
        gradient: "from-sky-500 to-blue-400",
        icon: Minus,
      },
    ],
  },
  {
    title: "Navigation",
    description: "Sidebars, desktop navs, and scrollable tabs",
    accent: "cyan",
    dotColor: "bg-cyan-500",
    glowColor: "group-hover:shadow-cyan-500/20",
    items: [
      {
        slug: "sidebar",
        title: "Sidebar Drawer",
        desc: "Mobile drawer with NavGroup accordion",
        props: "Sidebar + NavGroup + NavItem",
        gradient: "from-fuchsia-500 to-pink-400",
        icon: PanelLeft,
      },
      {
        slug: "desktop-nav",
        title: "Desktop Nav",
        desc: "Header navigation with dropdown menus",
        props: "HeaderNav + HeaderNavItem",
        gradient: "from-indigo-500 to-violet-400",
        icon: Navigation,
      },
      {
        slug: "scroll-nav",
        title: "Scroll Nav",
        desc: "Horizontal scrollable tab navigation",
        props: "ScrollNav + ScrollNavItem",
        gradient: "from-teal-500 to-cyan-400",
        icon: GripHorizontal,
      },
    ],
  },
  {
    title: "Layout Patterns",
    description: "Complete layout compositions for common app types",
    accent: "amber",
    dotColor: "bg-amber-500",
    glowColor: "group-hover:shadow-amber-500/20",
    items: [
      {
        slug: "responsive",
        title: "Responsive",
        desc: "Desktop header nav, mobile tab bar + sidebar",
        props: "Full responsive pattern",
        gradient: "from-slate-600 to-zinc-500",
        icon: Smartphone,
      },
      {
        slug: "header-only",
        title: "Header Only",
        desc: "Minimal header, no footer",
        props: "Header + Content",
        gradient: "from-gray-500 to-slate-400",
        icon: Layout,
      },
      {
        slug: "footer-only",
        title: "Footer Only",
        desc: "Fullbleed content with bottom nav",
        props: "Footer + Content",
        gradient: "from-rose-500 to-pink-400",
        icon: PanelBottom,
      },
      {
        slug: "content-only",
        title: "Content Only",
        desc: "Bare minimal, no header or footer",
        props: "AppShell + Content",
        gradient: "from-amber-500 to-yellow-400",
        icon: Square,
      },
    ],
  },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-dvh bg-slate-950">
      {/* ── Background texture: dot pattern ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(255 255 255) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Hero Section ── */}
      <header className="relative overflow-hidden border-b border-white/5">
        {/* Gradient mesh orbs */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[128px]" />
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-600/15 blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-[96px]" />
          <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pb-14 pt-16 sm:pb-20 sm:pt-24">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-violet-300 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-violet-400 animate-pulse" />
              Open Source
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400 backdrop-blur-sm">
              v1.0
            </span>
          </div>

          <div className="flex items-start gap-5 mb-6">
            <div className="hidden sm:flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/25 ring-1 ring-white/10">
              <Layout className="size-7" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                AppShell{" "}
                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Examples
                </span>
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl text-balance leading-relaxed">
                Interactive demos of every component variant and layout pattern.
                Each example is a fullscreen page you can explore and interact
                with.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <span className="font-mono text-slate-400">13</span> examples
            </span>
            <span className="text-slate-700">/</span>
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <span className="font-mono text-slate-400">4</span> categories
            </span>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col gap-14">
          {sections.map((section) => (
            <section key={section.title}>
              {/* Section header */}
              <div className="mb-5 flex items-center gap-3">
                <span
                  className={`size-2.5 rounded-full ${section.dotColor} ring-4 ring-white/5`}
                />
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-white">
                    {section.title}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {section.description}
                  </p>
                </div>
              </div>

              {/* Cards grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className={`group relative flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.1] hover:bg-white/[0.05] hover:shadow-xl ${section.glowColor}`}
                  >
                    {/* Hover glow overlay */}
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex items-start justify-between mb-4">
                      <div
                        className={`flex items-center justify-center size-10 rounded-lg bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-black/20 ring-1 ring-white/10`}
                      >
                        <item.icon className="size-5" />
                      </div>
                      <ChevronRight className="size-4 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-slate-400" />
                    </div>

                    <h3 className="relative font-semibold text-slate-200 transition-colors duration-300 group-hover:text-white">
                      {item.title}
                    </h3>
                    <p className="relative mt-1.5 text-sm text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="relative mt-3">
                      <span className="inline-block rounded-md bg-slate-800/80 px-2.5 py-1 text-[11px] font-mono text-slate-400 ring-1 ring-white/[0.06]">
                        {item.props}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm ring-1 ring-white/10">
                <Layout className="size-4" />
              </div>
              <p className="text-sm text-slate-500">
                Built with{" "}
                <span className="font-semibold text-slate-300">
                  @appshell/react
                </span>
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-600">
                Open source component library for mobile-first app shells
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
