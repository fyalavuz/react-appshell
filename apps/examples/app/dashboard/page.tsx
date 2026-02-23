"use client";

import { useState } from "react";
import { AppShell, Header, Content, Footer, FooterItem } from "@appshell/react";
import { LayoutDashboard, BarChart3, Users, Settings, Bell } from "lucide-react";

const stats = [
  { label: "Total Users", value: "12,847", change: "+12.5%" },
  { label: "Revenue", value: "$48,290", change: "+8.2%" },
  { label: "Active Sessions", value: "1,429", change: "+23.1%" },
  { label: "Conversion Rate", value: "3.24%", change: "-1.8%" },
];

export default function DashboardExample() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="dark">
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="dark"
          logo={<span className="text-lg font-bold tracking-tight">AdminPanel</span>}
          actions={
            <div className="flex items-center gap-2">
              <button aria-label="Notifications" className="relative p-2 rounded-md hover:bg-white/10 transition-colors">
                <Bell className="size-5" />
                <span aria-hidden="true" className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
              </button>
              <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
            </div>
          }
          mobileMenu={
            <nav className="flex flex-col gap-1">
              {["Dashboard", "Analytics", "Users", "Settings"].map((item) => (
                <button
                  key={item}
                  className="text-left px-3 py-2 rounded-md hover:bg-white/10 text-sm transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>
          }
        />

        <Content className="pb-20 bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-gray-800 bg-gray-800/50 p-4">
                  <div className="text-xs text-gray-400">{stat.label}</div>
                  <div className="text-xl font-bold text-white mt-1">{stat.value}</div>
                  <div
                    className={`text-xs mt-1 ${
                      stat.change.startsWith("+") ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {stat.change} from last month
                  </div>
                </div>
              ))}
            </div>

            {/* Chart placeholder */}
            <div className="rounded-xl border border-gray-800 bg-gray-800/50 p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Revenue Overview</h3>
              <div className="flex items-end gap-2 h-40">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-blue-500/60"
                    style={{ height: `${30 + Math.sin(i * 0.8) * 25 + Math.random() * 20}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                  (m) => (
                    <div key={m} className="text-[10px] text-gray-500">
                      {m}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Recent activity */}
            <div className="rounded-xl border border-gray-800 bg-gray-800/50 p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <div className="size-8 rounded-full bg-gray-700 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="h-3 w-48 max-w-full rounded bg-gray-700" />
                      <div className="h-2.5 w-24 rounded bg-gray-700/60 mt-1.5" />
                    </div>
                    <div className="h-2.5 w-12 rounded bg-gray-700/40 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Users table placeholder */}
            <div className="rounded-xl border border-gray-800 bg-gray-800/50 p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Top Users</h3>
              <div className="space-y-2">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-gray-800/50 px-4 py-3">
                    <div className="text-xs text-gray-500 w-6">{i + 1}</div>
                    <div className="size-8 rounded-full bg-gray-700 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="h-3 w-32 rounded bg-gray-700" />
                    </div>
                    <div className="h-3 w-16 rounded bg-gray-700/60" />
                    <div className="h-3 w-12 rounded bg-gray-700/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Content>

        <Footer variant="tab-bar" behavior="static" className="bg-gray-950/95 border-gray-800">
          <FooterItem
            icon={<LayoutDashboard className="size-5" />}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <FooterItem
            icon={<BarChart3 className="size-5" />}
            label="Analytics"
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
          />
          <FooterItem
            icon={<Users className="size-5" />}
            label="Users"
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
          />
          <FooterItem
            icon={<Settings className="size-5" />}
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </Footer>
      </AppShell>
    </div>
  );
}
