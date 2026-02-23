"use client";

import { useState } from "react";
import { HeaderSection, HeaderBehavior } from "@/components/header-section";
import { Search, ChevronDown } from "lucide-react";

const behaviors: { value: HeaderBehavior; label: string; description: string }[] = [
  { value: "static", label: "Static", description: "Nothing sticks. The entire header scrolls away with the page content." },
  { value: "fixed", label: "Fixed (Sticky)", description: "Entire header stays pinned to top at all times." },
  { value: "reveal-all", label: "Reveal All", description: "Header hides on scroll down, full header slides back on scroll up." },
  { value: "reveal-nav", label: "Reveal Nav", description: "Header hides on scroll down, only nav bar slides back on scroll up." },
  { value: "reveal-context", label: "Reveal Context", description: "Header hides on scroll down, only the title/context row slides back on scroll up." },
  { value: "reveal-search", label: "Reveal Search", description: "Header hides on scroll down, only the search bar slides back on scroll up." },
];

function ControlPanel({
  behavior,
  setBehavior,
  theme,
  setTheme,
}: {
  behavior: HeaderBehavior;
  setBehavior: (b: HeaderBehavior) => void;
  theme: "light" | "primary" | "dark";
  setTheme: (t: "light" | "primary" | "dark") => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-3 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="text-sm font-semibold text-foreground">
          Header Controls
        </span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-border pt-4">
          <h2 className="text-xs font-semibold mb-2 uppercase tracking-wider text-muted-foreground">
            Behavior
          </h2>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {behaviors.map((b) => (
              <button
                key={b.value}
                onClick={() => setBehavior(b.value)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium border transition-colors ${
                  behavior === b.value
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent border-border text-muted-foreground hover:border-foreground/40"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            {behaviors.find((b) => b.value === behavior)?.description}
          </p>

          <h2 className="text-xs font-semibold mb-2 uppercase tracking-wider text-muted-foreground">
            Theme
          </h2>
          <div className="flex gap-1.5">
            {(["light", "primary", "dark"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium border capitalize transition-colors ${
                  theme === t
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent border-border text-muted-foreground hover:border-foreground/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DemoPage() {
  const [behavior, setBehavior] = useState<HeaderBehavior>("reveal-nav");
  const [theme, setTheme] = useState<"light" | "primary" | "dark">("light");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-[400vh] bg-background text-foreground">
      <HeaderSection
        behavior={behavior}
        theme={theme}
        logo={
          <span className="text-lg font-bold tracking-tight font-sans">Acme Co.</span>
        }
        actions={
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-foreground/70">Dashboard</span>
            <span className="hidden sm:inline text-sm text-foreground/70">Settings</span>
            <div className="size-8 rounded-full bg-muted border border-border" />
          </div>
        }
        title="Project Overview"
        subtitle="Manage your projects and track progress"
        searchContent={
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search projects..."
              className="w-full rounded-lg border border-border bg-muted/50 py-2 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </div>
        }
        mobileMenuProps={{
          isOpen: mobileOpen,
          onToggle: () => setMobileOpen((o) => !o),
          children: (
            <nav className="flex flex-col gap-1 text-sm">
              <a href="#" className="py-2.5 px-1 border-b border-border text-foreground">Dashboard</a>
              <a href="#" className="py-2.5 px-1 border-b border-border text-foreground">Projects</a>
              <a href="#" className="py-2.5 px-1 border-b border-border text-foreground">Settings</a>
              <a href="#" className="py-2.5 px-1 text-foreground">Log Out</a>
            </nav>
          ),
        }}
      />

      <main className="mx-auto max-w-3xl px-4 py-6">
        {/* Controls - inline, first item in the content area */}
        <ControlPanel
          behavior={behavior}
          setBehavior={setBehavior}
          theme={theme}
          setTheme={setTheme}
        />

        <p className="text-sm text-muted-foreground text-center py-6">
          Scroll down to test the header behavior, then scroll back up.
        </p>

        <div className="space-y-4">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-lg bg-muted" />
                <div>
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="h-3 w-20 rounded bg-muted mt-1.5" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-5/6 rounded bg-muted" />
                <div className="h-3 w-4/6 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
