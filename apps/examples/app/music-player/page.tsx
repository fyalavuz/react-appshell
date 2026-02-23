"use client";

import { useState } from "react";
import { AppShell, Header, Content, Footer } from "@appshell/react";
import { Play, Pause, SkipBack, SkipForward, Settings } from "lucide-react";

const playlists = [
  {
    name: "Chill Vibes",
    description: "Relax and unwind with mellow beats",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    name: "Workout Mix",
    description: "High energy tracks to keep you moving",
    gradient: "from-orange-500 to-red-600",
  },
  {
    name: "Focus Flow",
    description: "Deep concentration ambient sounds",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    name: "Late Night",
    description: "Smooth sounds for after midnight",
    gradient: "from-violet-500 to-fuchsia-600",
  },
  {
    name: "Road Trip",
    description: "Sing-along classics for the highway",
    gradient: "from-emerald-500 to-teal-600",
  },
];

const tracks = [
  { title: "Midnight Dreams", artist: "Luna Wave", duration: "3:42", gradient: "from-indigo-500 to-purple-600" },
  { title: "Electric Pulse", artist: "Neon Circuit", duration: "4:10", gradient: "from-yellow-500 to-orange-500" },
  { title: "Ocean Breeze", artist: "Coastal Drift", duration: "3:28", gradient: "from-cyan-500 to-blue-600" },
  { title: "City Lights", artist: "Metro Sound", duration: "3:55", gradient: "from-pink-500 to-rose-600" },
  { title: "Starfall", artist: "Nova Echo", duration: "4:33", gradient: "from-violet-500 to-fuchsia-600" },
  { title: "Wildfire", artist: "Desert Storm", duration: "3:17", gradient: "from-red-500 to-orange-600" },
  { title: "Crystal Clear", artist: "Ice Garden", duration: "3:50", gradient: "from-teal-500 to-cyan-600" },
  { title: "Velvet Touch", artist: "Silk Road", duration: "4:05", gradient: "from-rose-500 to-pink-600" },
  { title: "Thunder Road", artist: "Steel Horizon", duration: "3:38", gradient: "from-slate-500 to-gray-600" },
  { title: "Golden Hour", artist: "Amber Glow", duration: "3:22", gradient: "from-amber-500 to-yellow-600" },
  { title: "Deep Blue", artist: "Ocean Floor", duration: "4:18", gradient: "from-blue-500 to-indigo-600" },
  { title: "Solar Flare", artist: "Cosmic Dust", duration: "3:45", gradient: "from-orange-500 to-red-600" },
  { title: "Rain Dance", artist: "Monsoon", duration: "3:10", gradient: "from-emerald-500 to-teal-600" },
  { title: "Night Drive", artist: "Chrome Valley", duration: "4:27", gradient: "from-gray-500 to-zinc-600" },
  { title: "First Light", artist: "Dawn Patrol", duration: "3:33", gradient: "from-sky-500 to-blue-600" },
];

export default function MusicPlayerExample() {
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  return (
    <div className="dark">
      <AppShell safeArea>
        <Header
          behavior="reveal-all"
          theme="dark"
          logo={
            <span className="text-lg font-bold tracking-tight">MusicApp</span>
          }
          actions={
            <button
              aria-label="Settings"
              className="p-2 rounded-md hover:bg-accent transition-colors"
            >
              <Settings className="size-5" />
            </button>
          }
        />

        <Content className="pb-16 bg-background">
          <div className="mx-auto max-w-lg px-4 py-4 space-y-6">
            {/* Made For You */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-1">
                Made For You
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                Playlists curated for your taste
              </p>
              <div className="overflow-x-auto flex gap-3 pb-2 -mx-4 px-4">
                {playlists.map((playlist) => (
                  <button
                    key={playlist.name}
                    className="shrink-0 w-36 text-left group"
                  >
                    <div
                      className={`w-36 h-36 rounded-lg bg-gradient-to-br ${playlist.gradient} mb-2 transition-opacity group-hover:opacity-80`}
                    />
                    <div className="font-medium text-sm text-foreground truncate">
                      {playlist.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {playlist.description}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Recently Played */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-1">
                Recently Played
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Your listening history
              </p>
              <div className="space-y-1">
                {tracks.map((track, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTrack(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                      i === currentTrack
                        ? "bg-accent text-foreground"
                        : "text-foreground hover:bg-accent/50"
                    }`}
                  >
                    <span className="text-sm font-medium text-muted-foreground w-6 text-right shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={`size-10 rounded-md bg-gradient-to-br ${track.gradient} shrink-0`}
                    />
                    <div className="min-w-0 flex-1">
                      <div
                        className={`text-sm font-medium truncate ${
                          i === currentTrack
                            ? "text-green-400"
                            : "text-foreground"
                        }`}
                      >
                        {track.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {track.artist}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {track.duration}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </Content>

        <Footer
          variant="mini"
          className="bg-background/95 border-border"
        >
          {/* Progress bar at the very top of the footer */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-muted">
            <div className="h-full w-[35%] bg-green-500" />
          </div>

          <div className="flex w-full items-center gap-3">
            <div
              className={`size-8 rounded bg-gradient-to-br ${tracks[currentTrack].gradient} shrink-0`}
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-foreground truncate">
                {tracks[currentTrack].title}
              </div>
              <div className="text-[10px] text-muted-foreground truncate">
                {tracks[currentTrack].artist}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                aria-label="Previous track"
                onClick={() =>
                  setCurrentTrack((prev) =>
                    prev > 0 ? prev - 1 : tracks.length - 1
                  )
                }
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <SkipBack className="size-4" />
              </button>
              <button
                onClick={() => setPlaying(!playing)}
                aria-label={playing ? "Pause" : "Play"}
                className="flex items-center justify-center size-7 rounded-full bg-foreground text-background"
              >
                {playing ? (
                  <Pause className="size-3.5" />
                ) : (
                  <Play className="size-3.5 ml-0.5" />
                )}
              </button>
              <button
                aria-label="Next track"
                onClick={() =>
                  setCurrentTrack((prev) =>
                    prev < tracks.length - 1 ? prev + 1 : 0
                  )
                }
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <SkipForward className="size-4" />
              </button>
            </div>
          </div>
        </Footer>
      </AppShell>
    </div>
  );
}
