import { useContext, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  History,
  Wrench,
  FilePlus,
  LogOut,
  ShieldCheck,
  User as UserIcon,
  Menu,
  Bell,
  Boxes,
  Home,
  ChevronRight,
  ExternalLink,
  X
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth?.user;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setIsSidebarOpen(false);
  }

  const handleLogout = () => {
    auth?.logout();
    navigate("/login");
  };

  const navigateFromSidebar = (path: string) => {
    setIsSidebarOpen(false);
    navigate(path);
  };

  const navItemClass = (path: string, exact: boolean = false) => {
    const isActive = exact ? location.pathname === path : location.pathname.startsWith(path);
    return `
      group flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl transition-all duration-150 text-xs font-semibold
      ${isActive
        ? "bg-sky-600 text-white shadow-sm shadow-sky-600/30"
        : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"}
    `;
  };

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === "/admin") return "Overview";
    if (path.startsWith("/admin/requests")) return "Maintenance Requests";
    if (path.startsWith("/admin/assets")) return "Asset Registry";
    if (path.startsWith("/admin/users")) return "User Management";
    if (path.startsWith("/admin/analytics")) return "Facilities Analytics";
    if (path.startsWith("/admin/logs")) return "Activity Logs";
    if (path.startsWith("/technician")) return "Technician Workspace";
    if (path.startsWith("/staff")) return "Service Support Portal";
    if (path.startsWith("/profile")) return "Profile Settings";
    return "Dashboard";
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden animate-fade-in"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col border-r border-slate-800/80 bg-slate-900 text-white transition-transform duration-200 ease-in-out md:static md:z-auto md:translate-x-0 shadow-2xl md:shadow-none`}
      >
        {/* Brand Banner */}
        <div className="flex items-center justify-between border-b border-slate-800/80 p-5 px-6">
          <Link to="/portals" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 text-lg font-black text-white shadow-md shadow-sky-500/20">
              P
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white">
                Pwani<span className="text-sky-400">Maint</span>
              </span>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                Facilities OS
              </p>
            </div>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Menus */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
          {/* Main Workspace Navigation */}
          {user?.role === "admin" && (
            <div className="space-y-1">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Administration
              </p>
              <button
                onClick={() => navigateFromSidebar("/admin")}
                className={navItemClass("/admin", true)}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard size={16} />
                  <span>Overview</span>
                </div>
              </button>
              <button
                onClick={() => navigateFromSidebar("/admin/requests")}
                className={navItemClass("/admin/requests")}
              >
                <div className="flex items-center gap-3">
                  <ClipboardList size={16} />
                  <span>All Requests</span>
                </div>
              </button>
              <button
                onClick={() => navigateFromSidebar("/admin/assets")}
                className={navItemClass("/admin/assets")}
              >
                <div className="flex items-center gap-3">
                  <Boxes size={16} />
                  <span>Asset Registry</span>
                </div>
              </button>
              <button
                onClick={() => navigateFromSidebar("/admin/users")}
                className={navItemClass("/admin/users")}
              >
                <div className="flex items-center gap-3">
                  <Users size={16} />
                  <span>User Directory</span>
                </div>
              </button>
              <button
                onClick={() => navigateFromSidebar("/admin/analytics")}
                className={navItemClass("/admin/analytics")}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 size={16} />
                  <span>Facilities Analytics</span>
                </div>
              </button>
              <button
                onClick={() => navigateFromSidebar("/admin/logs")}
                className={navItemClass("/admin/logs")}
              >
                <div className="flex items-center gap-3">
                  <History size={16} />
                  <span>Audit Logs</span>
                </div>
              </button>
            </div>
          )}

          {/* Operations & Dispatch */}
          <div className="space-y-1">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Operations &amp; Service
            </p>

            {(user?.role === "technician" || user?.role === "admin") && (
              <button
                onClick={() => navigateFromSidebar("/technician/dashboard")}
                className={navItemClass("/technician")}
              >
                <div className="flex items-center gap-3">
                  <Wrench size={16} />
                  <span>Technician Tasks</span>
                </div>
              </button>
            )}

            {(user?.role === "staff" || user?.role === "student" || user?.role === "admin") && (
              <button
                onClick={() => navigateFromSidebar("/staff/dashboard")}
                className={navItemClass("/staff")}
              >
                <div className="flex items-center gap-3">
                  <FilePlus size={16} />
                  <span>Support Portal</span>
                </div>
              </button>
            )}
          </div>

          {/* Quick Institutional Portals */}
          <div className="space-y-1">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Quick Shortcuts
            </p>
            <button
              onClick={() => navigateFromSidebar("/portals")}
              className="flex w-full items-center justify-between rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <Home size={15} />
                <span>Portals Directory</span>
              </div>
              <ChevronRight size={14} className="text-slate-600" />
            </button>
            <Link
              to="/"
              className="flex w-full items-center justify-between rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <ExternalLink size={15} />
                <span>Campus Landing Page</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* User Card & Logout */}
        <div className="border-t border-slate-800/80 bg-slate-950/40 p-4">
          <div className="mb-3 flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-xs font-bold text-sky-400 border border-slate-700">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-bold text-white">{user?.username}</p>
              <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-sky-400">
                {user?.role}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60">
            <button
              onClick={() => navigateFromSidebar("/profile")}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-[11px] font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <UserIcon size={12} /> Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-rose-900/40 bg-rose-950/20 px-3 py-1.5 text-[11px] font-bold text-rose-400 hover:bg-rose-900/40 transition"
            >
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="min-w-0 flex-1 flex flex-col overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 md:hidden"
              aria-label="Open navigation"
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline-block">
                Workspace /
              </span>
              <span className="text-xs font-extrabold text-slate-800">
                {getBreadcrumb()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                System Active
              </span>
            </div>

            {user?.role === "admin" && (
              <div className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 md:flex">
                <ShieldCheck size={13} className="text-sky-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  Admin Privileges
                </span>
              </div>
            )}

            <button
              className="relative rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
              aria-label="Notifications"
            >
              <Bell size={16} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sky-500 ring-2 ring-white" />
            </button>
          </div>
        </header>

        {/* Page Inner Container */}
        <div className="flex-1 p-5 sm:p-8 md:p-10 mx-auto w-full max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
