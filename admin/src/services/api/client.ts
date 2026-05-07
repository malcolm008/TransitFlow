import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api",
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor — attach JWT ────────────────────────────────────────
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Response Interceptor — handle 401 ───────────────────────────────────────
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      // TODO: refresh token flow
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);