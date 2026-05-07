"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const currentPage = NAV_ITEMS.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/dashboard" && pathname.startsWith(item.href))
  );

  return (
    <header
      className={cn(
        "flex items-center justify-between px-6 h-[var(--header-height)]",
        "bg-card border-b border-border shrink-0"
      )}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <h1 className="font-display text-xl font-700 tracking-wide text-foreground">
          {currentPage?.label ?? "Dashboard"}
        </h1>
        {/* Live badge if relevant page */}
        {(pathname === "/dashboard" || pathname === "/dashboard/fleet") && (
          <span className="live-badge">
            <span className="status-dot bg-primary animate-pulse-dot" />
            Live
          </span>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground bg-muted hover:bg-accent rounded-md transition-colors border border-border">
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search…</span>
          <kbd className="hidden sm:inline text-2xs bg-background border border-border rounded px-1 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
}