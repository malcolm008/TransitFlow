import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format } from "date-fns";

// ─── Tailwind Merge Helper ────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Date Formatting ──────────────────────────────────────────────────────────

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), "MMM d, yyyy · HH:mm");
}

export function formatTime(date: string | Date): string {
  return format(new Date(date), "HH:mm");
}

// ─── Strings ─────────────────────────────────────────────────────────────────

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

export function truncate(str: string, maxLength: number): string {
  return str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;
}

// ─── Numbers ─────────────────────────────────────────────────────────────────

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${meters}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function formatSpeed(kph: number): string {
  return `${Math.round(kph)} km/h`;
}

// ─── Capacity ────────────────────────────────────────────────────────────────

export function getCapacityColor(current: number, max: number): string {
  const pct = current / max;
  if (pct >= 0.9) return "text-red-400";
  if (pct >= 0.7) return "text-amber-400";
  return "text-emerald-400";
}