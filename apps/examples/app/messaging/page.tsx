"use client";

import { AppShell, Header, Content, Footer } from "@appshell/react";
import { ArrowLeft, Send, Phone, MoreVertical, Paperclip } from "lucide-react";

const messages = [
  { id: 1, from: "them", text: "Hey! How are you doing?" },
  { id: 2, from: "me", text: "Hi Jane! I'm doing great, thanks for asking!" },
  { id: 3, from: "them", text: "Are you free this weekend? We should catch up." },
  { id: 4, from: "me", text: "Absolutely! Saturday works for me. Coffee?" },
  { id: 5, from: "them", text: "Perfect! Let's meet at that new cafe downtown." },
  { id: 6, from: "me", text: "Sounds great! What time?" },
  { id: 7, from: "them", text: "How about 2pm?" },
  { id: 8, from: "me", text: "2pm works perfectly. See you there!" },
  { id: 9, from: "them", text: "Looking forward to it!" },
  { id: 10, from: "me", text: "Me too! It's been too long." },
  { id: 11, from: "them", text: "I know, right? Last time was like 3 months ago." },
  { id: 12, from: "me", text: "Time flies! We should make this a regular thing." },
  { id: 13, from: "them", text: "Definitely! Maybe once a month?" },
  { id: 14, from: "me", text: "That sounds perfect. Let's do it." },
  { id: 15, from: "them", text: "By the way, have you tried the new place on 5th?" },
  { id: 16, from: "me", text: "Not yet! Is it good?" },
  { id: 17, from: "them", text: "Amazing pastries. You'll love it." },
  { id: 18, from: "me", text: "Ok I'm sold. Let's go there on Saturday instead!" },
  { id: 19, from: "them", text: "Deal! I'll send you the location." },
  { id: 20, from: "me", text: "Great, can't wait!" },
];

export default function MessagingExample() {
  return (
    <AppShell safeArea>
      <Header
        behavior="static"
        theme="primary"
        logo={
          <div className="flex items-center gap-3">
            <button aria-label="Go back" className="p-1 rounded-md hover:bg-white/10 transition-colors">
              <ArrowLeft className="size-5" />
            </button>
            <div className="relative">
              <div className="size-9 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                JS
              </div>
              <div className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-400 border-2 border-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">Jane Smith</div>
              <div className="text-xs opacity-80">Online</div>
            </div>
          </div>
        }
        actions={
          <div className="flex items-center gap-1">
            <button aria-label="Call" className="p-2 rounded-md hover:bg-white/10 transition-colors">
              <Phone className="size-5" />
            </button>
            <button aria-label="More options" className="p-2 rounded-md hover:bg-white/10 transition-colors">
              <MoreVertical className="size-5" />
            </button>
          </div>
        }
      />

      <Content className="pb-16">
        <div className="mx-auto max-w-lg px-4 py-4 space-y-3">
          <div className="flex justify-center my-4">
            <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">Today</span>
          </div>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.from === "me"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}
              >
                {msg.text}
                <div
                  className={`text-[10px] mt-1 ${
                    msg.from === "me" ? "text-primary-foreground/60" : "text-muted-foreground"
                  }`}
                >
                  {`${10 + Math.floor(msg.id / 3)}:${String(15 + (msg.id * 7) % 45).padStart(2, "0")}`}
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <div className="size-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                <div className="size-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                <div className="size-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        </div>
      </Content>

      <Footer variant="mini">
        <div className="flex w-full items-center gap-2">
          <button aria-label="Attach file" className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
            <Paperclip className="size-5" />
          </button>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Type a message..."
              aria-label="Type a message"
              className="w-full rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button aria-label="Send message" className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground shrink-0">
            <Send className="size-4" />
          </button>
        </div>
      </Footer>
    </AppShell>
  );
}
