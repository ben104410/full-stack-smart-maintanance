import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access") || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthEndpoint = originalRequest?.url?.includes("login") || originalRequest?.url?.includes("register") || originalRequest?.url?.includes("token/refresh");

    if (error.response && error.response.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          const res = await axios.post(`${baseURL}token/refresh/`, { refresh: refreshToken });
          const newAccessToken = res.data.access;
          if (newAccessToken) {
            localStorage.setItem("access", newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        } catch (refreshErr) {
          localStorage.removeItem("access");
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
        }
      } else {
        localStorage.removeItem("access");
        localStorage.removeItem("token");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
