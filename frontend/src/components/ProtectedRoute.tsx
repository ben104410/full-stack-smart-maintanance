import { type ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const loading = auth?.loading ?? true;

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-slate-900 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-sky-500/20 animate-ping" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-slate-900 text-xl font-black text-white shadow-lg shadow-sky-500/20">
              P
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-extrabold tracking-tight text-slate-800">
              Pwani<span className="text-sky-600">Maint</span>
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-widest animate-pulse">
              Authenticating session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/portals" replace />;
  }

  return <>{children}</>;
}
