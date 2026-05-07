import {
  LayoutDashboard,
  Bus,
  MapPin,
  Users,
  UserCheck,
  BarChart3,
  Bell,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { BusStatus, StudentStatus, RouteType, UserRole } from "@/types";

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  group?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    group: "overview",
  },
  {
    label: "Fleet",
    href: "/dashboard/fleet",
    icon: Bus,
    group: "operations",
  },
  {
    label: "Routes",
    href: "/dashboard/routes",
    icon: MapPin,
    group: "operations",
  },
  {
    label: "Students",
    href: "/dashboard/students",
    icon: Users,
    group: "operations",
  },
  {
    label: "Drivers",
    href: "/dashboard/drivers",
    icon: UserCheck,
    group: "operations",
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
    group: "analytics",
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    group: "analytics",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    group: "system",
  },
];

// ─── Status Configs ──────────────────────────────────────────────────────────

export const BUS_STATUS_CONFIG: Record<
  BusStatus,
  { label: string; color: string; bg: string; dot: string }
> = {
  active: {
    label: "Active",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    dot: "bg-emerald-400",
  },
  in_transit: {
    label: "In Transit",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    dot: "bg-blue-400",
  },
  offline: {
    label: "Offline",
    color: "text-gray-400",
    bg: "bg-gray-400/10",
    dot: "bg-gray-400",
  },
  maintenance: {
    label: "Maintenance",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    dot: "bg-amber-400",
  },
  delayed: {
    label: "Delayed",
    color: "text-red-400",
    bg: "bg-red-400/10",
    dot: "bg-red-400",
  },
};

export const STUDENT_STATUS_CONFIG: Record<
  StudentStatus,
  { label: string; color: string; bg: string }
> = {
  boarded: { label: "Boarded", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  dropped: { label: "Dropped Off", color: "text-blue-400", bg: "bg-blue-400/10" },
  absent: { label: "Absent", color: "text-red-400", bg: "bg-red-400/10" },
  not_checked_in: { label: "Not Checked In", color: "text-gray-400", bg: "bg-gray-400/10" },
};

export const ROUTE_TYPE_CONFIG: Record<
  RouteType,
  { label: string; color: string }
> = {
  morning_pickup: { label: "Morning Pickup", color: "text-amber-400" },
  afternoon_dropoff: { label: "Afternoon Drop-off", color: "text-blue-400" },
  evening_shuttle: { label: "Evening Shuttle", color: "text-purple-400" },
  circular: { label: "Circular", color: "text-teal-400" },
};

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin",
  school_admin: "School Admin",
  dispatcher: "Dispatcher",
  driver: "Driver",
  parent: "Parent",
  student: "Student",
};

// ─── Misc ────────────────────────────────────────────────────────────────────

export const GPS_UPDATE_INTERVAL_MS = 4000; // 4 seconds
export const DEFAULT_MAP_CENTER = { lat: -1.286389, lng: 36.817223 }; // Nairobi
export const DEFAULT_MAP_ZOOM = 12;