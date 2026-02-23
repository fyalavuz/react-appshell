"use client";

import { useState } from "react";
import { AppShell, Header, Content, Footer, FooterItem } from "@appshell/react";
import {
  Home,
  Search,
  Bell,
  Mail,
  User,
  MessageCircle,
  Repeat2,
  Heart,
  Share,
} from "lucide-react";

const posts = [
  {
    id: 1,
    user: "Sarah Chen",
    handle: "@sarahchen",
    avatar: "SC",
    avatarGradient: "from-pink-500 to-rose-400",
    time: "2m",
    text: "Just shipped the new design system at work. 14 components, full dark mode support, and it only took us 3 months. The team is incredible.",
    likes: 847,
    replies: 42,
    reposts: 128,
    hasImage: true,
    imageGradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 2,
    user: "Marcus Rivera",
    handle: "@marcusdev",
    avatar: "MR",
    avatarGradient: "from-blue-500 to-cyan-400",
    time: "15m",
    text: "Hot take: most \"senior\" engineers I interview can't explain how a Promise works under the hood.",
    likes: 2341,
    replies: 587,
    reposts: 312,
    hasImage: false,
    imageGradient: "",
  },
  {
    id: 3,
    user: "Priya Patel",
    handle: "@priyacodes",
    avatar: "PP",
    avatarGradient: "from-emerald-500 to-teal-400",
    time: "1h",
    text: "Made mass today and a stranger complimented my dog. That's it. That's the tweet. Best Monday ever.",
    likes: 1205,
    replies: 89,
    reposts: 45,
    hasImage: true,
    imageGradient: "from-amber-400 to-orange-500",
  },
  {
    id: 4,
    user: "Alex Thompson",
    handle: "@alexthompson",
    avatar: "AT",
    avatarGradient: "from-orange-500 to-red-400",
    time: "2h",
    text: "Reminder: your REST API doesn't need to be RESTful. Sometimes a simple RPC-style endpoint is the right call. Stop overcomplicating things.",
    likes: 672,
    replies: 234,
    reposts: 89,
    hasImage: false,
    imageGradient: "",
  },
  {
    id: 5,
    user: "Jordan Lee",
    handle: "@jordanlee",
    avatar: "JL",
    avatarGradient: "from-purple-500 to-indigo-400",
    time: "3h",
    text: "Our startup just closed Series A! $12M to build the future of developer tooling. We're hiring across the board -- DMs open.",
    likes: 4210,
    replies: 156,
    reposts: 892,
    hasImage: true,
    imageGradient: "from-blue-600 to-purple-600",
  },
  {
    id: 6,
    user: "Nina Kowalski",
    handle: "@ninadesigns",
    avatar: "NK",
    avatarGradient: "from-rose-500 to-pink-400",
    time: "4h",
    text: "Spent the weekend redesigning my portfolio. Went with a brutalist aesthetic this time. Thoughts?",
    likes: 389,
    replies: 67,
    reposts: 23,
    hasImage: true,
    imageGradient: "from-gray-800 to-gray-600",
  },
  {
    id: 7,
    user: "David Kim",
    handle: "@dkim_writes",
    avatar: "DK",
    avatarGradient: "from-sky-500 to-blue-400",
    time: "5h",
    text: "TypeScript tip: use `satisfies` instead of type annotations when you want inference AND type checking. Game changer for config objects.",
    likes: 1893,
    replies: 104,
    reposts: 467,
    hasImage: false,
    imageGradient: "",
  },
  {
    id: 8,
    user: "Elena Garcia",
    handle: "@elenagarcia",
    avatar: "EG",
    avatarGradient: "from-yellow-500 to-amber-400",
    time: "6h",
    text: "Cooked a five-course meal for friends tonight. The risotto was a disaster but the tiramisu saved the evening. Cooking is just debugging with better smells.",
    likes: 2567,
    replies: 198,
    reposts: 134,
    hasImage: true,
    imageGradient: "from-yellow-400 to-red-400",
  },
  {
    id: 9,
    user: "Ryan Foster",
    handle: "@ryanfoster",
    avatar: "RF",
    avatarGradient: "from-teal-500 to-emerald-400",
    time: "8h",
    text: "Does anyone else feel like every new JS framework is just React with extra steps?",
    likes: 5421,
    replies: 823,
    reposts: 612,
    hasImage: false,
    imageGradient: "",
  },
  {
    id: 10,
    user: "Maya Williams",
    handle: "@mayawilliams",
    avatar: "MW",
    avatarGradient: "from-indigo-500 to-violet-400",
    time: "12h",
    text: "Finished my first marathon today. 4 hours 23 minutes. Slow? Maybe. But I ran 26.2 miles and nobody can take that away from me.",
    likes: 8934,
    replies: 412,
    reposts: 1567,
    hasImage: true,
    imageGradient: "from-emerald-400 to-cyan-500",
  },
];

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export default function SocialAppExample() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <AppShell safeArea>
      <Header
        behavior="reveal-nav"
        theme="light"
        logo={
          <span className="text-lg font-bold tracking-tight">socialapp</span>
        }
        actions={
          <div className="flex items-center gap-3">
            <button
              aria-label="Notifications"
              className="relative rounded-full p-1.5 transition-colors hover:bg-muted"
            >
              <Bell className="size-5" />
            </button>
            <div className="size-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-400" />
          </div>
        }
        searchContent={
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search posts, people, tags..."
              aria-label="Search posts"
              className="w-full rounded-lg border border-border bg-muted/50 py-2 pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        }
      />

      <Content className="pb-20">
        <div className="mx-auto max-w-lg space-y-4 px-4 py-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-border bg-background p-4"
            >
              {/* Author row */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${post.avatarGradient}`}
                >
                  <span className="text-xs font-bold text-white">
                    {post.avatar}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-semibold text-foreground">
                      {post.user}
                    </span>
                    <span className="truncate text-sm text-muted-foreground">
                      {post.handle}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {post.time}
                  </span>
                </div>
              </div>

              {/* Post text */}
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                {post.text}
              </p>

              {/* Optional image placeholder */}
              {post.hasImage && (
                <div
                  className={`mt-3 aspect-video rounded-lg bg-gradient-to-br ${post.imageGradient}`}
                />
              )}

              {/* Interaction row */}
              <div className="mt-3 flex items-center justify-between text-muted-foreground">
                <button className="flex items-center gap-1.5 rounded-full p-1.5 text-xs transition-colors hover:text-blue-500">
                  <MessageCircle className="size-4" />
                  <span>{formatCount(post.replies)}</span>
                </button>
                <button className="flex items-center gap-1.5 rounded-full p-1.5 text-xs transition-colors hover:text-green-500">
                  <Repeat2 className="size-4" />
                  <span>{formatCount(post.reposts)}</span>
                </button>
                <button className="flex items-center gap-1.5 rounded-full p-1.5 text-xs transition-colors hover:text-rose-500">
                  <Heart className="size-4" />
                  <span>{formatCount(post.likes)}</span>
                </button>
                <button className="rounded-full p-1.5 transition-colors hover:text-blue-500">
                  <Share className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </Content>

      <Footer variant="tab-bar" behavior="auto-hide">
        <FooterItem
          icon={<Home className="size-5" />}
          label="Home"
          active={activeTab === "home"}
          onClick={() => setActiveTab("home")}
        />
        <FooterItem
          icon={<Search className="size-5" />}
          label="Search"
          active={activeTab === "search"}
          onClick={() => setActiveTab("search")}
        />
        <FooterItem
          icon={<Bell className="size-5" />}
          label="Notifications"
          badge={3}
          active={activeTab === "notifications"}
          onClick={() => setActiveTab("notifications")}
        />
        <FooterItem
          icon={<Mail className="size-5" />}
          label="Messages"
          badge={12}
          active={activeTab === "messages"}
          onClick={() => setActiveTab("messages")}
        />
        <FooterItem
          icon={<User className="size-5" />}
          label="Profile"
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
      </Footer>
    </AppShell>
  );
}
