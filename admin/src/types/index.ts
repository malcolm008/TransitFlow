// ─── Entity Types ────────────────────────────────────────────────────────────

export type UserRole =
  | "super_admin"
  | "school_admin"
  | "dispatcher"
  | "driver"
  | "parent"
  | "student";

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  schoolId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── School ──────────────────────────────────────────────────────────────────

export interface School {
  id: string;
  name: string;
  logo?: string;
  address: string;
  city: string;
  country: string;
  subscriptionPlan: "free" | "basic" | "pro" | "enterprise";
  branches: Branch[];
  createdAt: string;
}

export interface Branch {
  id: string;
  schoolId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

// ─── Bus ─────────────────────────────────────────────────────────────────────

export type BusStatus =
  | "active"
  | "in_transit"
  | "offline"
  | "maintenance"
  | "delayed";

export interface Bus {
  id: string;
  schoolId: string;
  plateNumber: string;
  model: string;
  capacity: number;
  status: BusStatus;
  driverId?: string;
  routeId?: string;
  lastSeen?: string;
  createdAt: string;
}

// ─── Driver ──────────────────────────────────────────────────────────────────

export interface Driver {
  id: string;
  userId: string;
  schoolId: string;
  licenseNumber: string;
  licenseExpiry: string;
  verified: boolean;
  busId?: string;
  routeId?: string;
  rating?: number;
  totalTrips: number;
  user: Pick<User, "id" | "firstName" | "lastName" | "email" | "phone" | "avatar">;
}

// ─── Route ───────────────────────────────────────────────────────────────────

export type RouteType =
  | "morning_pickup"
  | "afternoon_dropoff"
  | "evening_shuttle"
  | "circular";

export interface Route {
  id: string;
  schoolId: string;
  name: string;
  type: RouteType;
  busId?: string;
  stops: Stop[];
  totalDistance?: number;
  estimatedDuration?: number;
  isActive: boolean;
  schedule: RouteSchedule[];
  createdAt: string;
}

export interface RouteSchedule {
  dayOfWeek: number; // 0-6
  departureTime: string; // "HH:mm"
}

// ─── Stop ────────────────────────────────────────────────────────────────────

export interface Stop {
  id: string;
  routeId: string;
  name: string;
  lat: number;
  lng: number;
  order: number;
  arrivalWindowStart?: string; // "HH:mm"
  arrivalWindowEnd?: string;
  studentCount: number;
}

// ─── Student ─────────────────────────────────────────────────────────────────

export type StudentStatus =
  | "boarded"
  | "dropped"
  | "absent"
  | "not_checked_in";

export interface Student {
  id: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  grade?: string;
  photo?: string;
  parentId: string;
  routeId?: string;
  stopId?: string;
  status: StudentStatus;
  rfidTag?: string;
  qrCode?: string;
}

// ─── Realtime ────────────────────────────────────────────────────────────────

export interface BusLocation {
  busId: string;
  lat: number;
  lng: number;
  speed: number;
  heading: number;
  updatedAt: string;
}

export interface BusRealtimeStatus {
  online: boolean;
  routeId?: string;
  driverId?: string;
  location?: BusLocation;
}

// ─── Attendance ──────────────────────────────────────────────────────────────

export type AttendanceEvent =
  | "boarded"
  | "dropped_off"
  | "absent"
  | "late_pickup";

export interface AttendanceRecord {
  id: string;
  studentId: string;
  busId: string;
  routeId: string;
  event: AttendanceEvent;
  timestamp: string;
  recordedBy: string; // driverId
  method: "manual" | "qr" | "rfid" | "face";
}

// ─── Notifications ───────────────────────────────────────────────────────────

export type NotificationType =
  | "bus_approaching"
  | "student_boarded"
  | "student_dropped"
  | "route_delayed"
  | "emergency"
  | "announcement";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  recipientId: string;
  read: boolean;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalBuses: number;
  activeBuses: number;
  totalStudents: number;
  boardedToday: number;
  activeRoutes: number;
  delayedRoutes: number;
  driversOnline: number;
}

// ─── API Response ────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}