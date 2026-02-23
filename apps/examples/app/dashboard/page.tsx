"use client";

import { useState } from "react";
import { AppShell, Header, Content, Footer, FooterItem } from "@appshell/react";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Bell,
  ChevronRight,
} from "lucide-react";

const stats = [
  { label: "Total Users", value: "12,847", change: "+12.5%", up: true },
  { label: "Revenue", value: "$48,290", change: "+8.2%", up: true },
  { label: "Active Sessions", value: "1,429", change: "+23.1%", up: true },
  { label: "Conversion Rate", value: "3.24%", change: "-1.8%", up: false },
];

const chartData = [65, 78, 52, 90, 68, 45, 82, 95, 58, 88, 72, 94];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const activities = [
  {
    user: "Sarah Chen",
    initials: "SC",
    color: "bg-blue-500",
    action: "created a new project",
    target: "Q1 Dashboard",
    time: "2 min ago",
  },
  {
    user: "Mike Johnson",
    initials: "MJ",
    color: "bg-green-500",
    action: "deployed to",
    target: "production",
    time: "15 min ago",
  },
  {
    user: "Emma Wilson",
    initials: "EW",
    color: "bg-purple-500",
    action: "commented on",
    target: "PR #142",
    time: "32 min ago",
  },
  {
    user: "James Lee",
    initials: "JL",
    color: "bg-orange-500",
    action: "merged",
    target: "feature/auth",
    time: "1 hour ago",
  },
  {
    user: "Lisa Park",
    initials: "LP",
    color: "bg-pink-500",
    action: "updated settings for",
    target: "Team Alpha",
    time: "2 hours ago",
  },
  {
    user: "David Kim",
    initials: "DK",
    color: "bg-cyan-500",
    action: "invited",
    target: "3 new members",
    time: "3 hours ago",
  },
  {
    user: "Anna Costa",
    initials: "AC",
    color: "bg-amber-500",
    action: "archived",
    target: "Old Reports",
    time: "5 hours ago",
  },
  {
    user: "Tom Harris",
    initials: "TH",
    color: "bg-red-500",
    action: "resolved issue",
    target: "#287",
    time: "6 hours ago",
  },
];

const topUsers = [
  {
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "Admin",
    status: "Active" as const,
    contributions: 847,
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Developer",
    status: "Active" as const,
    contributions: 632,
  },
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "Designer",
    status: "Active" as const,
    contributions: 521,
  },
  {
    name: "James Lee",
    email: "james@example.com",
    role: "Developer",
    status: "Away" as const,
    contributions: 498,
  },
  {
    name: "Lisa Park",
    email: "lisa@example.com",
    role: "Manager",
    status: "Active" as const,
    contributions: 374,
  },
  {
    name: "David Kim",
    email: "david@example.com",
    role: "Developer",
    status: "Offline" as const,
    contributions: 291,
  },
];

const statusDot: Record<string, string> = {
  Active: "bg-green-500",
  Away: "bg-yellow-500",
  Offline: "bg-gray-500",
};

const chartMax = Math.max(...chartData);

export default function DashboardExample() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="dark">
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="dark"
          logo={
            <span className="text-lg font-bold tracking-tight">
              AdminPanel
            </span>
          }
          actions={
            <div className="flex items-center gap-3">
              <button
                aria-label="Notifications"
                className="relative rounded-full p-2 transition-colors hover:bg-white/10"
              >
                <Bell className="size-5" />
                <span
                  aria-hidden="true"
                  className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500"
                />
              </button>
              <div className="size-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
            </div>
          }
          mobileMenu={
            <nav className="flex flex-col gap-1">
              {["Dashboard", "Analytics", "Users", "Settings"].map((item) => (
                <button
                  key={item}
                  className="rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-white/10"
                >
                  {item}
                </button>
              ))}
            </nav>
          }
        />

        <Content className="bg-background pb-20">
          <div className="mx-auto max-w-7xl space-y-6 px-4 py-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                  <div className="mt-1 text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div
                    className={`mt-1 text-xs ${
                      stat.up ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {stat.change} from last month
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue Chart */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Revenue Overview
              </h3>
              <div className="flex h-40 items-end gap-1">
                {chartData.map((value, i) => (
                  <div
                    key={months[i]}
                    className="flex-1 rounded-t bg-primary transition-opacity hover:opacity-80"
                    style={{ height: `${(value / chartMax) * 100}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between">
                {months.map((m) => (
                  <span
                    key={m}
                    className="flex-1 text-center text-[10px] text-muted-foreground"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Recent Activity
                </h3>
                <button className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
                  View all
                  <ChevronRight className="size-3" />
                </button>
              </div>
              <div className="space-y-1">
                {activities.map((activity) => (
                  <div
                    key={activity.user + activity.time}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
                  >
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full ${activity.color}`}
                    >
                      <span className="text-xs font-bold text-white">
                        {activity.initials}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}{" "}
                        <span className="font-semibold">{activity.target}</span>
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Users Table */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Top Users
                </h3>
                <button className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
                  View all
                  <ChevronRight className="size-3" />
                </button>
              </div>
              <div className="space-y-2">
                {topUsers.map((user, i) => (
                  <div
                    key={user.email}
                    className="flex items-center gap-3 rounded-lg bg-muted/30 px-4 py-3 transition-colors hover:bg-muted/50"
                  >
                    <span className="w-6 text-xs text-muted-foreground">
                      {i + 1}
                    </span>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <span className="text-xs font-bold text-primary">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {user.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                    <span className="hidden rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground sm:inline-block">
                      {user.role}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`size-2 rounded-full ${statusDot[user.status]}`}
                      />
                      <span className="hidden text-xs text-muted-foreground sm:inline">
                        {user.status}
                      </span>
                    </div>
                    <span className="w-12 text-right text-sm font-medium text-foreground">
                      {user.contributions}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Content>

        <Footer
          variant="tab-bar"
          behavior="static"
          className="border-border bg-background"
        >
          <FooterItem
            icon={<LayoutDashboard className="size-5" />}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            className="text-muted-foreground"
          />
          <FooterItem
            icon={<BarChart3 className="size-5" />}
            label="Analytics"
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
            className="text-muted-foreground"
          />
          <FooterItem
            icon={<Users className="size-5" />}
            label="Users"
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
            className="text-muted-foreground"
          />
          <FooterItem
            icon={<Bell className="size-5" />}
            label="Alerts"
            badge={5}
            active={activeTab === "alerts"}
            onClick={() => setActiveTab("alerts")}
            className="text-muted-foreground"
          />
        </Footer>
      </AppShell>
    </div>
  );
}
