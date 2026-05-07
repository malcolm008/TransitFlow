"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bus, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/constants";

const NAV_GROUPS: Record<string, string> = {
  overview: "Overview",
  operations: "Operations",
  analytics: "Analytics",
  system: "System",
};

export function Sidebar() {
  const pathname = usePathname();

  // Group nav items
  const grouped = NAV_ITEMS.reduce<Record<string, typeof NAV_ITEMS>>(
    (acc, item) => {
      const group = item.group ?? "other";
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    },
    {}
  );

  return (
    <aside className="flex flex-col w-[var(--sidebar-width)] h-full bg-card border-r border-border shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-[var(--header-height)] border-b border-border shrink-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 border border-primary/30">
          <Bus className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="font-display text-lg font-700 tracking-wide text-foreground leading-none">
            TransitFlow
          </p>
          <p className="text-2xs text-muted-foreground font-mono tracking-widest uppercase">
            Admin
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {Object.entries(grouped).map(([groupKey, items]) => (
          <div key={groupKey}>
            <p className="px-3 mb-1.5 text-2xs font-mono font-medium uppercase tracking-widest text-muted-foreground/60">
              {NAV_GROUPS[groupKey] ?? groupKey}
            </p>
            <ul className="space-y-0.5">
              {items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-150 group",
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "w-4 h-4 shrink-0 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                      <span className="flex-1 font-medium">{item.label}</span>
                      {item.badge !== undefined && (
                        <span className="text-2xs font-mono bg-primary text-primary-foreground rounded px-1.5 py-0.5">
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <ChevronRight className="w-3 h-3 text-primary/60" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent cursor-pointer transition-colors">
          <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-2xs font-mono font-semibold text-primary">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">Super Admin</p>
            <p className="text-2xs text-muted-foreground truncate">admin@transitflow.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
}