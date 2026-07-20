import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    let token = localStorage.getItem("nexamart_jwt");
    if (!token) {
      try {
        const res = await fetch("/api/auth/token");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.token) {
            const newToken = String(data.token);
            token = newToken;
            localStorage.setItem("nexamart_jwt", newToken);
          }
        }
      } catch (error) {
        console.error("JWT fetch error", error);
      }
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (typeof window !== "undefined") {
        localStorage.removeItem("nexamart_jwt");
        try {
          const res = await fetch("/api/auth/token");
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.token) {
              const newToken = String(data.token);
              localStorage.setItem("nexamart_jwt", newToken);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return api(originalRequest);
            }
          }
        } catch (e) {
          console.error("Token retry failed", e);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
