"use client";

import { AppShell, Header, Content, Footer } from "@appshell/react";
import { ShoppingCart, Search } from "lucide-react";

export default function EcommerceExample() {
  return (
    <AppShell safeArea>
      <Header
        behavior="fixed"
        theme="light"
        logo={<span className="text-lg font-bold tracking-tight">ShopNow</span>}
        title="New Arrivals"
        subtitle="Spring Collection"
        searchContent={
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full rounded-lg border border-border bg-muted/50 py-2 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        }
        actions={
          <button aria-label="Cart (3 items)" className="relative p-2 rounded-lg hover:bg-accent transition-colors">
            <ShoppingCart className="size-5" />
            <span aria-hidden="true" className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
              3
            </span>
          </button>
        }
      />

      <Content className="pb-24">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="rounded-xl border bg-card overflow-hidden">
                <div className="aspect-square bg-muted" />
                <div className="p-3 space-y-2">
                  <div className="h-3.5 w-3/4 rounded bg-muted" />
                  <div className="h-3 w-1/2 rounded bg-muted" />
                  <div className="flex items-center justify-between mt-2">
                    <div className="h-4 w-16 rounded bg-muted" />
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, j) => (
                        <div key={j} className="size-2.5 rounded-full bg-muted" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Content>

      <Footer variant="floating" position="right">
        <button aria-label="Add to cart" className="flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-105 transition-transform">
          <ShoppingCart className="size-6" />
        </button>
      </Footer>
    </AppShell>
  );
}
