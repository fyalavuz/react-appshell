"use client";

import { AppShell, Header, Content, HeaderNav, HeaderNavItem, MotionProvider } from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import { Search, Bell, User, Clock, ArrowRight, TrendingUp, Bookmark } from "lucide-react";

const articles = [
  {
    title: "Building Resilient Design Systems at Scale",
    excerpt:
      "How leading teams create component libraries that stand the test of time, from token architecture to versioning strategies.",
    date: "Feb 21, 2026",
    readTime: "8 min read",
    gradient: "from-violet-500 to-purple-600",
    shadowColor: "hover:shadow-violet-200/60",
    category: "Design Systems",
    trending: true,
  },
  {
    title: "The Rise of Server Components in Production",
    excerpt:
      "A deep dive into how React Server Components are reshaping data fetching patterns and reducing client-side bundle sizes.",
    date: "Feb 19, 2026",
    readTime: "12 min read",
    gradient: "from-blue-500 to-cyan-500",
    shadowColor: "hover:shadow-blue-200/60",
    category: "React",
    trending: false,
  },
  {
    title: "CSS Container Queries Changed Everything",
    excerpt:
      "Why container queries are the biggest leap in responsive design since media queries, and how to start using them today.",
    date: "Feb 17, 2026",
    readTime: "6 min read",
    gradient: "from-emerald-500 to-teal-500",
    shadowColor: "hover:shadow-emerald-200/60",
    category: "CSS",
    trending: true,
  },
  {
    title: "Rethinking State Management in 2026",
    excerpt:
      "From Redux to signals, the state management landscape has evolved dramatically. Here is what works and what to avoid.",
    date: "Feb 15, 2026",
    readTime: "10 min read",
    gradient: "from-orange-500 to-red-500",
    shadowColor: "hover:shadow-orange-200/60",
    category: "Architecture",
    trending: false,
  },
  {
    title: "Accessibility Beyond Compliance",
    excerpt:
      "Moving past checklists to truly inclusive experiences. Real strategies for building products that work for everyone.",
    date: "Feb 13, 2026",
    readTime: "7 min read",
    gradient: "from-pink-500 to-rose-500",
    shadowColor: "hover:shadow-pink-200/60",
    category: "Accessibility",
    trending: false,
  },
  {
    title: "Edge Computing and the Modern Frontend",
    excerpt:
      "How edge runtimes are transforming web performance, from middleware patterns to globally distributed rendering.",
    date: "Feb 11, 2026",
    readTime: "9 min read",
    gradient: "from-amber-500 to-yellow-500",
    shadowColor: "hover:shadow-amber-200/60",
    category: "Performance",
    trending: true,
  },
  {
    title: "Type Safety Across the Full Stack",
    excerpt:
      "Leveraging TypeScript from database schema to UI components. End-to-end type safety is no longer optional.",
    date: "Feb 9, 2026",
    readTime: "11 min read",
    gradient: "from-indigo-500 to-blue-600",
    shadowColor: "hover:shadow-indigo-200/60",
    category: "TypeScript",
    trending: false,
  },
  {
    title: "Micro-Frontends: Lessons from the Trenches",
    excerpt:
      "What we learned after two years of running micro-frontends in production. The wins, the pain, and the surprises.",
    date: "Feb 7, 2026",
    readTime: "14 min read",
    gradient: "from-fuchsia-500 to-purple-500",
    shadowColor: "hover:shadow-fuchsia-200/60",
    category: "Architecture",
    trending: false,
  },
  {
    title: "Animation Performance on the Modern Web",
    excerpt:
      "From layout thrashing to GPU compositing, a practical guide to achieving 60fps animations in complex interfaces.",
    date: "Feb 5, 2026",
    readTime: "8 min read",
    gradient: "from-sky-500 to-blue-500",
    shadowColor: "hover:shadow-sky-200/60",
    category: "Performance",
    trending: false,
  },
  {
    title: "The Future of Forms in React",
    excerpt:
      "Server Actions, progressive enhancement, and optimistic updates are redefining how we think about form handling.",
    date: "Feb 3, 2026",
    readTime: "6 min read",
    gradient: "from-lime-500 to-green-500",
    shadowColor: "hover:shadow-lime-200/60",
    category: "React",
    trending: false,
  },
];

export default function FixedHeaderPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="text-lg font-bold tracking-tight">AppShell</span>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Articles" active />
              <HeaderNavItem label="Tutorials" />
              <HeaderNavItem label="Podcasts" />
              <HeaderNavItem label="Newsletter" />
            </HeaderNav>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                aria-label="Search"
              >
                <Search className="size-5" />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="size-5" />
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
              </button>
              <button
                type="button"
                className="ml-1 flex items-center justify-center size-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white"
                aria-label="Profile"
              >
                <User className="size-4" />
              </button>
            </div>
          }
          title="Latest Articles"
          subtitle="Stay up to date with the latest news and insights"
          searchContent={
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, topics, authors..."
                className="w-full rounded-xl border border-gray-200/80 bg-gray-50/80 py-2.5 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100 transition-all"
              />
            </div>
          }
        />
        <Content className="pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-6">
            <div className="flex flex-col gap-5">
              {articles.map((article, i) => (
                <article
                  key={i}
                  className={`group flex flex-col sm:flex-row gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${article.shadowColor} hover:shadow-lg transition-all duration-300`}
                >
                  <div
                    className={`relative shrink-0 w-full sm:w-48 h-36 sm:h-auto rounded-xl bg-gradient-to-br ${article.gradient} overflow-hidden flex items-center justify-center`}
                  >
                    {/* Inner decorative elements */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-3 left-3 size-16 rounded-full border-2 border-white/40" />
                      <div className="absolute bottom-4 right-4 size-10 rounded-lg border-2 border-white/30 rotate-12" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-24 rounded-full border border-white/20" />
                    </div>
                    <span className="relative text-white/90 text-xs font-semibold uppercase tracking-widest">
                      {article.category}
                    </span>
                    {article.trending && (
                      <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-white">
                        <TrendingUp className="size-3" />
                        Trending
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 group-hover:text-violet-600 transition-colors leading-snug">
                        {article.title}
                      </h2>
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{article.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="p-1 text-gray-300 hover:text-violet-500 opacity-0 group-hover:opacity-100 transition-all"
                          aria-label="Bookmark"
                        >
                          <Bookmark className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-1 text-xs font-medium text-violet-600 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all"
                        >
                          Read more
                          <ArrowRight className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Content>

        {/* Floating variant indicator */}
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1.5 text-[11px] font-mono text-white/80 shadow-lg">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          behavior=&quot;fixed&quot; theme=&quot;light&quot;
        </div>
      </AppShell>
    </MotionProvider>
  );
}
