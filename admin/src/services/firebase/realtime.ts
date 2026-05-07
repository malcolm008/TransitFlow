import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getDatabase, ref, onValue, off, type Database } from "firebase/database";
import type { BusRealtimeStatus } from "@/types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// ─── Singleton Init ───────────────────────────────────────────────────────────

let app: FirebaseApp;
let db: Database;

export function getFirebaseDB(): Database {
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getDatabase(app);
  }
  return db;
}

// ─── Realtime Helpers ─────────────────────────────────────────────────────────

/**
 * Subscribe to a bus's realtime status for a given school.
 * Returns unsubscribe function.
 */
export function subscribeToBusStatus(
  schoolId: string,
  busId: string,
  callback: (status: BusRealtimeStatus) => void
): () => void {
  const database = getFirebaseDB();
  const busRef = ref(database, `schools/${schoolId}/buses/${busId}`);

  onValue(busRef, (snapshot) => {
    const data = snapshot.val();
    if (data) callback(data as BusRealtimeStatus);
  });

  return () => off(busRef);
}

/**
 * Subscribe to all buses for a school.
 */
export function subscribeToSchoolBuses(
  schoolId: string,
  callback: (buses: Record<string, BusRealtimeStatus>) => void
): () => void {
  const database = getFirebaseDB();
  const busesRef = ref(database, `schools/${schoolId}/buses`);

  onValue(busesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) callback(data as Record<string, BusRealtimeStatus>);
  });

  return () => off(busesRef);
}