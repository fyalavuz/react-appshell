"use client";

import { useState } from "react";
import { AppShell, Header, Content, Footer } from "@appshell/react";
import { Play, Pause, SkipBack, SkipForward, Settings } from "lucide-react";

const tracks = [
  { title: "Midnight Dreams", artist: "Luna Wave" },
  { title: "Electric Pulse", artist: "Neon Circuit" },
  { title: "Ocean Breeze", artist: "Coastal Drift" },
  { title: "City Lights", artist: "Metro Sound" },
  { title: "Starfall", artist: "Nova Echo" },
  { title: "Wildfire", artist: "Desert Storm" },
  { title: "Crystal Clear", artist: "Ice Garden" },
  { title: "Velvet Touch", artist: "Silk Road" },
  { title: "Thunder Road", artist: "Steel Horizon" },
  { title: "Golden Hour", artist: "Amber Glow" },
  { title: "Deep Blue", artist: "Ocean Floor" },
  { title: "Solar Flare", artist: "Cosmic Dust" },
  { title: "Rain Dance", artist: "Monsoon" },
  { title: "Night Drive", artist: "Chrome Valley" },
  { title: "First Light", artist: "Dawn Patrol" },
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
          logo={<span className="text-lg font-bold tracking-tight">MusicApp</span>}
          actions={
            <button aria-label="Settings" className="p-2 rounded-md hover:bg-white/10 transition-colors">
              <Settings className="size-5" />
            </button>
          }
        />

        <Content className="pb-16 bg-gray-900">
          <div className="mx-auto max-w-lg px-4 py-4">
            <h2 className="text-xl font-bold text-white mb-1">Recently Played</h2>
            <p className="text-sm text-gray-400 mb-4">Your listening history</p>
            <div className="space-y-1">
              {tracks.map((track, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTrack(i)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                    i === currentTrack
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-center size-10 rounded-md bg-white/10 text-sm font-medium text-gray-400 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="size-10 rounded-md bg-gradient-to-br from-purple-600 to-pink-500 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm font-medium truncate ${i === currentTrack ? "text-green-400" : ""}`}>
                      {track.title}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{track.artist}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {`${3 + (i % 2)}:${String(10 + (i * 13) % 50).padStart(2, "0")}`}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Content>

        <Footer variant="mini" className="bg-gray-950/95 border-gray-800">
          <div className="flex w-full items-center gap-3">
            <div className="size-8 rounded bg-gradient-to-br from-purple-600 to-pink-500 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-white truncate">
                {tracks[currentTrack].title}
              </div>
              <div className="text-[10px] text-gray-400 truncate">
                {tracks[currentTrack].artist}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button aria-label="Previous track" className="p-1.5 text-gray-300 hover:text-white transition-colors">
                <SkipBack className="size-4" />
              </button>
              <button
                onClick={() => setPlaying(!playing)}
                aria-label={playing ? "Pause" : "Play"}
                className="flex items-center justify-center size-7 rounded-full bg-white text-black"
              >
                {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5 ml-0.5" />}
              </button>
              <button aria-label="Next track" className="p-1.5 text-gray-300 hover:text-white transition-colors">
                <SkipForward className="size-4" />
              </button>
            </div>
          </div>
        </Footer>
      </AppShell>
    </div>
  );
}
