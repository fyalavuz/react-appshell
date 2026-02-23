import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Music,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";

const examples = [
  {
    slug: "social-app",
    title: "Social App",
    desc: "Instagram/Twitter style with reveal-nav header and auto-hide tab bar",
    gradient: "from-pink-500 to-orange-400",
    icon: <Heart className="size-5" />,
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    desc: "Shopify style with fixed header and floating cart button",
    gradient: "from-blue-500 to-cyan-400",
    icon: <ShoppingBag className="size-5" />,
  },
  {
    slug: "messaging",
    title: "Messaging",
    desc: "WhatsApp style with static header and mini input bar",
    gradient: "from-green-500 to-emerald-400",
    icon: <MessageCircle className="size-5" />,
  },
  {
    slug: "music-player",
    title: "Music Player",
    desc: "Spotify style with reveal-all header and mini now-playing bar",
    gradient: "from-purple-500 to-violet-400",
    icon: <Music className="size-5" />,
  },
  {
    slug: "dashboard",
    title: "Dashboard",
    desc: "Admin panel with fixed header and static tab bar",
    gradient: "from-slate-600 to-zinc-500",
    icon: <LayoutDashboard className="size-5" />,
  },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-lg px-4 py-12">
        <h1 className="text-3xl font-bold">AppShell Examples</h1>
        <p className="text-muted-foreground">
          Fullscreen demos of every variant combination.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          {examples.map((ex) => (
            <Link
              key={ex.slug}
              href={`/${ex.slug}`}
              className="group flex items-center gap-4 rounded-xl border p-4 hover:bg-accent transition-colors"
            >
              <div
                className={`flex items-center justify-center size-12 rounded-lg bg-gradient-to-br ${ex.gradient} text-white shrink-0`}
              >
                {ex.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold">{ex.title}</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {ex.desc}
                </p>
              </div>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
