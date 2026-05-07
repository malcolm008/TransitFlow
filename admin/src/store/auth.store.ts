import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  updateUser: (partial: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setAuth: (user, accessToken) =>
        set((state) => {
          state.user = user;
          state.accessToken = accessToken;
          state.isAuthenticated = true;
        }),

      clearAuth: () =>
        set((state) => {
          state.user = null;
          state.accessToken = null;
          state.isAuthenticated = false;
        }),

      updateUser: (partial) =>
        set((state) => {
          if (state.user) Object.assign(state.user, partial);
        }),
    })),
    {
      name: "transitflow-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);