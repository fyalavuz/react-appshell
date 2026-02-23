"use client";

import { useState } from "react";
import { AppShell, Header, Content, Footer, FooterItem } from "@appshell/react";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";

export default function SocialAppExample() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <AppShell safeArea>
      <Header
        behavior="reveal-nav"
        theme="light"
        logo={<span className="text-lg font-bold tracking-tight">socialapp</span>}
        actions={
          <div className="flex items-center gap-3">
            <Heart className="size-5" />
            <div className="size-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-400" />
          </div>
        }
        searchContent={
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg border border-border bg-muted/50 py-2 px-4 text-sm outline-none placeholder:text-muted-foreground"
          />
        }
      />

      <Content className="pb-20">
        <div className="mx-auto max-w-lg px-4 py-4 space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="rounded-xl border bg-card overflow-hidden">
              <div className="flex items-center gap-3 p-4">
                <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                <div>
                  <div className="h-3.5 w-24 rounded bg-muted" />
                  <div className="h-2.5 w-16 rounded bg-muted mt-1" />
                </div>
              </div>
              <div className="aspect-square bg-muted" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-3/4 rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </Content>

      <Footer variant="tab-bar" behavior="auto-hide">
        <FooterItem icon={<Home className="size-5" />} label="Home" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
        <FooterItem icon={<Search className="size-5" />} label="Explore" active={activeTab === "explore"} onClick={() => setActiveTab("explore")} />
        <FooterItem icon={<PlusSquare className="size-5" />} label="Create" active={activeTab === "create"} onClick={() => setActiveTab("create")} />
        <FooterItem icon={<Heart className="size-5" />} label="Activity" active={activeTab === "activity"} onClick={() => setActiveTab("activity")} />
        <FooterItem icon={<User className="size-5" />} label="Profile" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
      </Footer>
    </AppShell>
  );
}
