import { ReactNode, useContext } from "react";
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
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 text-white flex flex-col border-r border-slate-800">
        <div className="p-8">
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
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
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

      {/* Page content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10">
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
        </header>
        <div className="p-10 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
