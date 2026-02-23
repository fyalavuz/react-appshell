"use client";

import { useState } from "react";
import { AppShell, Header, Content, Footer } from "@appshell/react";
import { ShoppingCart, Search, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Linen Relaxed Blazer",
    price: 149,
    rating: 4.5,
    reviews: 234,
    gradient: "bg-gradient-to-br from-amber-200 to-orange-300",
    colors: ["#c4a882", "#2c2c2c", "#e8ddd3"],
    tag: "Best Seller" as const,
  },
  {
    id: 2,
    name: "Cropped Wide-Leg Trousers",
    price: 89,
    rating: 4.0,
    reviews: 187,
    gradient: "bg-gradient-to-br from-stone-300 to-zinc-400",
    colors: ["#1a1a1a", "#d4c5b0"],
    tag: "New" as const,
  },
  {
    id: 3,
    name: "Silk Camisole Top",
    price: 59,
    rating: 4.5,
    reviews: 312,
    gradient: "bg-gradient-to-br from-rose-200 to-pink-300",
    colors: ["#e8c4c4", "#1a1a1a", "#f5f0eb"],
    tag: null,
  },
  {
    id: 4,
    name: "Oversized Wool Coat",
    price: 189,
    rating: 5.0,
    reviews: 156,
    gradient: "bg-gradient-to-br from-slate-400 to-gray-600",
    colors: ["#3d3d3d", "#8b7d6b"],
    tag: "Best Seller" as const,
  },
  {
    id: 5,
    name: "Ribbed Knit Cardigan",
    price: 79,
    rating: 4.0,
    reviews: 98,
    gradient: "bg-gradient-to-br from-emerald-200 to-teal-300",
    colors: ["#6b8f71", "#f5f0eb", "#2c2c2c"],
    tag: null,
  },
  {
    id: 6,
    name: "High-Rise Slim Jeans",
    price: 98,
    rating: 4.5,
    reviews: 421,
    gradient: "bg-gradient-to-br from-blue-300 to-indigo-400",
    colors: ["#3b5998", "#1a1a1a"],
    tag: "Sale" as const,
  },
  {
    id: 7,
    name: "Cotton Poplin Shirt",
    price: 65,
    rating: 4.0,
    reviews: 276,
    gradient: "bg-gradient-to-br from-sky-200 to-cyan-300",
    colors: ["#f5f5f5", "#a8c8e0", "#1a1a1a"],
    tag: "New" as const,
  },
  {
    id: 8,
    name: "Leather Crossbody Bag",
    price: 129,
    rating: 4.5,
    reviews: 189,
    gradient: "bg-gradient-to-br from-yellow-200 to-amber-400",
    colors: ["#8b6914", "#1a1a1a", "#c4a882"],
    tag: null,
  },
  {
    id: 9,
    name: "Pleated Midi Skirt",
    price: 75,
    rating: 3.5,
    reviews: 143,
    gradient: "bg-gradient-to-br from-violet-200 to-purple-300",
    colors: ["#7c5cbf", "#1a1a1a"],
    tag: null,
  },
  {
    id: 10,
    name: "Cashmere Crewneck Sweater",
    price: 165,
    rating: 5.0,
    reviews: 208,
    gradient: "bg-gradient-to-br from-red-200 to-rose-400",
    colors: ["#c45c5c", "#f5f0eb", "#2c2c2c"],
    tag: "Best Seller" as const,
  },
  {
    id: 11,
    name: "Quilted Puffer Vest",
    price: 119,
    rating: 4.0,
    reviews: 87,
    gradient: "bg-gradient-to-br from-lime-200 to-green-400",
    colors: ["#4a6741", "#1a1a1a"],
    tag: "Sale" as const,
  },
  {
    id: 12,
    name: "Woven Straw Sun Hat",
    price: 45,
    rating: 4.5,
    reviews: 64,
    gradient: "bg-gradient-to-br from-orange-200 to-yellow-300",
    colors: ["#d4a76a", "#f5f0eb"],
    tag: "New" as const,
  },
];

const categories = ["All", "Tops", "Bottoms", "Outerwear", "Accessories", "Sale"];

function tagColor(tag: string) {
  switch (tag) {
    case "Best Seller":
      return "bg-amber-500 text-white";
    case "New":
      return "bg-emerald-500 text-white";
    case "Sale":
      return "bg-destructive text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i < Math.floor(rating);
          const half = !filled && i < rating;
          return (
            <Star
              key={i}
              className={`size-3 ${
                filled || half
                  ? "fill-amber-400 text-amber-400"
                  : "fill-none text-muted-foreground/40"
              }`}
            />
          );
        })}
      </div>
      <span className="text-xs text-muted-foreground">({reviews})</span>
    </div>
  );
}

export default function EcommerceExample() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <AppShell safeArea>
      <Header
        behavior="fixed"
        theme="light"
        logo={
          <span className="text-lg font-bold tracking-tight">ShopNow</span>
        }
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
          <button
            aria-label="Cart (3 items)"
            className="relative p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <ShoppingCart className="size-5" />
            <span
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white"
            >
              3
            </span>
          </button>
        }
      />

      <Content className="pb-24">
        <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-1.5 text-sm whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-xl border bg-card overflow-hidden"
              >
                {/* Image placeholder */}
                <div className={`relative aspect-square ${product.gradient}`}>
                  {product.tag && (
                    <span
                      className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${tagColor(product.tag)}`}
                    >
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Product info */}
                <div className="p-3 space-y-1.5">
                  <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-1">
                    {product.name}
                  </h3>

                  <StarRating rating={product.rating} reviews={product.reviews} />

                  <p className="text-sm font-bold text-foreground">
                    ${product.price}
                  </p>

                  {/* Color swatches */}
                  <div className="flex items-center gap-1.5 pt-0.5">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="size-4 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                        aria-label={`Color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Content>

      <Footer variant="floating" position="right">
        <button aria-label="Add to cart" className="relative flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-105 transition-transform">
          <ShoppingCart className="size-6" />
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[11px] font-bold text-white">
            3
          </span>
        </button>
      </Footer>
    </AppShell>
  );
}
