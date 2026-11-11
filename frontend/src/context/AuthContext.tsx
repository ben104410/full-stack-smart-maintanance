import { createContext, useEffect, useState, type ReactNode } from "react";
import api from "../api/axios";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: string;
  phone?: string;
  department?: string;
  profile_picture?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
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
    } catch {
      localStorage.removeItem("access");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const init = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        if (!ignore) setLoading(false);
        return;
      }

      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await api.get("users/profile/");
        if (!ignore) {
          setUser(res.data);
        }
      } catch {
        if (!ignore) {
          localStorage.removeItem("access");
          delete api.defaults.headers.common["Authorization"];
          setUser(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void init();
    return () => {
      ignore = true;
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const res = await api.post("login/", { email, password });
    
    const token = res.data.access || res.data.token;
    if (res.data.refresh) {
      localStorage.setItem("refresh", res.data.refresh);
    }

    if (token) {
      localStorage.setItem("access", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    if (res.data.user) {
      setUser(res.data.user);
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
