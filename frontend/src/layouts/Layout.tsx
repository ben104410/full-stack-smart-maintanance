import { useContext } from "react";
import type { ReactNode } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LayoutDashboard, Users, ClipboardList, BarChart3, History, Wrench, FilePlus, LogOut, ShieldCheck, User as UserIcon } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth?.user;

  const handleLogout = () => {
    auth?.logout();
    navigate("/login");
  };

  const navItemClass = (path: string) => `
    flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 font-medium
    ${location.pathname === path 
      ? "bg-orange-600 text-white shadow-lg shadow-orange-900/20" 
      : "text-slate-400 hover:bg-slate-800 hover:text-white"}
  `;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white flex-col border-r border-slate-200">
        <div className="p-6">
          <Link to="/portals" className="flex items-center gap-2 group">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-600 text-xl font-black text-white shadow-inner group-hover:scale-105 transition-transform">
              P
            </div>
            <span className="text-xl font-black uppercase italic tracking-tighter">
              Pwani <span className="text-orange-500">Maint</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <div className="pb-4 mb-4 border-b border-slate-800/50">
            <p className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Main Menu</p>
            
            {user?.role === 'admin' && (
              <>
                <button onClick={() => navigate("/admin")} className={navItemClass("/admin")}>
                  <LayoutDashboard size={18} /> Overview
                </button>
                <button onClick={() => navigate("/admin/users")} className={navItemClass("/admin/users")}>
                  <Users size={18} /> User Management
                </button>
                <button onClick={() => navigate("/admin/requests")} className={navItemClass("/admin/requests")}>
                  <ClipboardList size={18} /> All Requests
                </button>
                <button onClick={() => navigate("/admin/analytics")} className={navItemClass("/admin/analytics")}>
                  <BarChart3 size={18} /> Analytics
                </button>
                <button onClick={() => navigate("/admin/logs")} className={navItemClass("/admin/logs")}>
                  <History size={18} /> Activity Logs
                </button>
              </>
            )}

            {(user?.role === 'technician' || user?.role === 'admin') && (
              <button onClick={() => navigate("/technician/dashboard")} className={navItemClass("/technician/dashboard")}>
                <Wrench size={18} /> My Tasks
              </button>
            )}

            {(user?.role === 'staff' || user?.role === 'admin') && (
              <button onClick={() => navigate("/staff/dashboard")} className={navItemClass("/staff/dashboard")}>
                <FilePlus size={18} /> Support Portal
              </button>
            )}
          </div>
        </nav>

        {/* User Profile Summary */}
        <div className="p-4 border-t border-slate-200 bg-white/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-orange-500">
              <UserIcon size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.username}</p>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{user?.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm font-bold">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile top nav (visible on small screens) */}
      <div className="lg:hidden bg-white border-b">
        <div className="app-container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-orange-600 text-white font-black">P</div>
            <div className="text-sm font-bold">Pwani Maint</div>
          </div>
          <nav className="flex gap-3 text-sm overflow-x-auto">
            <Link to="/portals" className="px-3 py-2 rounded-md hover:bg-slate-100">Portals</Link>
            <Link to="/profile" className="px-3 py-2 rounded-md hover:bg-slate-100">Profile</Link>
            <Link to="/feedback" className="px-3 py-2 rounded-md hover:bg-slate-100">Feedback</Link>
          </nav>
        </div>
      </div>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto">
        <header className="hidden lg:flex h-20 bg-white border-b border-slate-200 items-center justify-between sticky top-0 z-10">
          <div className="app-container flex items-center justify-between">
            <div className="flex items-center gap-4">
               <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Operational</span>
            </div>
            {user?.role === 'admin' && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                <ShieldCheck size={14} className="text-slate-500" />
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">Admin Access Level</span>
              </div>
            )}
          </div>
        </header>
        <div className="app-container py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
