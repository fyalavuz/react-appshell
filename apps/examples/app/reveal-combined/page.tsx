"use client";

import {
  AppShell,
  Header,
  Content,
  Footer,
  FooterItem,
  HeaderNav,
  HeaderNavItem,
  MotionProvider,
} from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import { Home, Search, Library, PlusCircle, User, SlidersHorizontal, Github, Bell, Settings } from "lucide-react";
import { PhotoGallery } from "../_shared/photo-gallery";

export default function RevealCombinedPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-all"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-black flex items-center justify-center">
                <div className="size-4 rounded-full bg-white animate-pulse" />
              </div>
              <span className="text-lg font-bold tracking-tight">Combined</span>
            </div>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Feed" active href="#" />
              <HeaderNavItem label="Explore" href="#" />
              <HeaderNavItem label="Trending" href="#" />
              <HeaderNavItem label="Projects" href="#" />
            </HeaderNav>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Notifications"
              >
                <Bell className="size-5" />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Settings"
              >
                <Settings className="size-5" />
              </button>
              <div className="h-6 w-px bg-border mx-1" />
              <button
                type="button"
                className="size-8 rounded-full bg-accent flex items-center justify-center overflow-hidden"
              >
                <User className="size-5 text-muted-foreground" />
              </button>
            </div>
          }
          title="Dynamic Interaction"
          subtitle="Header reveals on scroll up, Footer auto-hides on scroll down"
          searchContent={
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search everything..."
                  className="w-full rounded-xl border border-input bg-muted/50 py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-ring/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                />
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer"
              >
                <SlidersHorizontal className="size-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          }
        />

        <Content className="pb-24">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="mb-8 p-6 rounded-2xl bg-accent/50 border border-border">
              <h2 className="text-xl font-bold mb-2">Scroll to see the behavior</h2>
              <p className="text-muted-foreground text-sm">
                When you scroll down, the header stays at the top (static behavior for its primary row) but the sub-rows disappear.
                The footer will hide completely to maximize content space.
                Scroll up even a little bit to reveal the full header and footer again.
              </p>
            </div>
            <PhotoGallery />
          </div>
        </Content>

        <Footer variant="tab-bar" behavior="auto-hide">
          <FooterItem icon={<Home className="size-5" />} label="Home" active />
          <FooterItem icon={<Search className="size-5" />} label="Search" />
          <FooterItem icon={<PlusCircle className="size-5" />} label="Create" />
          <FooterItem icon={<Library className="size-5" />} label="Library" />
          <FooterItem icon={<User className="size-5" />} label="Profile" badge={3} />
        </Footer>
      </AppShell>

      {/* Floating behavior indicator */}
      <div className="fixed bottom-20 left-4 z-40 hidden sm:block">
        <div className="flex flex-col gap-1.5 rounded-2xl bg-background/80 backdrop-blur-md p-3 border border-border shadow-xl">
          <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
            HEADER: reveal-all
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            FOOTER: auto-hide
          </div>
        </div>
      </div>
    </MotionProvider>
  );
}
