import { createContext, useEffect, useState, type ReactNode } from "react";
import api from "../api/axios";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Load logged-in user on page refresh
  const loadUser = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await api.get("users/profile/");
      setUser(res.data);
    } catch (err: any) {
      if (err.response?.status !== 401) {
        console.error("Profile verification failed:", err);
      }
      localStorage.removeItem("access");
      delete api.defaults.headers.common["Authorization"];
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const res = await api.post("login/", { email, password });
    console.log("Login Response Data:", res.data); // STEP 1: Check response
    
    const token = res.data.access || res.data.token; // STEP 2: Support both keys
    localStorage.setItem("refresh", res.data.refresh);

    if (token) {
      localStorage.setItem("access", token);
      // Update axios headers immediately for subsequent calls
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    await loadUser();
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
