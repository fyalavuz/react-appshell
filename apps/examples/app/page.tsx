import Link from "next/link";

const examples = [
  { slug: "social-app", title: "Social App", desc: "Instagram/Twitter style with reveal-nav header and auto-hide tab bar" },
  { slug: "ecommerce", title: "E-commerce", desc: "Shopify style with fixed header and floating cart button" },
  { slug: "messaging", title: "Messaging", desc: "WhatsApp style with static header and mini input bar" },
  { slug: "music-player", title: "Music Player", desc: "Spotify style with reveal-all header and mini now-playing bar" },
  { slug: "dashboard", title: "Dashboard", desc: "Admin panel with fixed header and static tab bar" },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">AppShell Examples</h1>
        <p className="text-muted-foreground mb-8">Fullscreen demos of every variant combination.</p>
        <div className="space-y-3">
          {examples.map((ex) => (
            <Link
              key={ex.slug}
              href={`/${ex.slug}`}
              className="block rounded-xl border bg-card p-5 hover:bg-accent transition-colors"
            >
              <h2 className="font-semibold">{ex.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{ex.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
