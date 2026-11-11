import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  ShieldCheck,
  FilePlus,
  Wrench,
  BarChart3,
  ArrowRight,
  LogOut,
  User as UserIcon,
  Sparkles,
  Boxes
} from "lucide-react";

export default function PortalsPage() {
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;
  const logout = auth?.logout || (() => {});

  const modules = [
    {
      title: "Campus Administration",
      role: "admin",
      badge: "Administration",
      desc: "Oversee university facilities, triage maintenance tickets, manage users, and inspect asset registers.",
      icon: ShieldCheck,
      path: "/admin",
      accent: "border-sky-500/30 hover:border-sky-500",
      iconBg: "bg-sky-50 text-sky-600",
    },
    {
      title: "All Maintenance Requests",
      role: "admin",
      badge: "Operations",
      desc: "Central registry of all reported issues across campus with technician dispatch and verification.",
      icon: Boxes,
      path: "/admin/requests",
      accent: "border-indigo-500/30 hover:border-indigo-500",
      iconBg: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Staff & Community Portal",
      role: "staff",
      badge: "Service Desk",
      desc: "Report facility issues, upload visual damage proof, and track ticket status in real time.",
      icon: FilePlus,
      path: "/staff/dashboard",
      accent: "border-teal-500/30 hover:border-teal-500",
      iconBg: "bg-teal-50 text-teal-600",
    },
    {
      title: "Community Service Desk",
      role: "student",
      badge: "Student Portal",
      desc: "Submit maintenance requests for hostels, lecture halls, campus sports facilities, and study labs.",
      icon: FilePlus,
      path: "/staff/dashboard",
      accent: "border-teal-500/30 hover:border-teal-500",
      iconBg: "bg-teal-50 text-teal-600",
    },
    {
      title: "Technician Field Workspace",
      role: "technician",
      badge: "Field Operations",
      desc: "Review assigned work orders, update task progress, and document completed repairs on campus.",
      icon: Wrench,
      path: "/technician/dashboard",
      accent: "border-amber-500/30 hover:border-amber-500",
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      title: "Facilities Analytics Hub",
      role: "admin",
      badge: "Intelligence",
      desc: "Live analytics on work order volume, resolution times, and technician productivity ranking.",
      icon: BarChart3,
      path: "/admin/analytics",
      accent: "border-emerald-500/30 hover:border-emerald-500",
      iconBg: "bg-emerald-50 text-emerald-600",
    },
  ].filter((mod) => 
    {
      const userRole = user?.role?.toLowerCase();
      const moduleRole = mod.role?.toLowerCase();
      return userRole === "admin" || userRole === moduleRole;
    }
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-slate-900 text-lg font-black text-white shadow-md shadow-sky-500/20">
              P
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900">
                Pwani<span className="text-sky-600">Maint</span>
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Portals Directory
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6 text-sm font-semibold">
            <Link to="/" className="text-slate-600 hover:text-slate-900 transition">
              Home
            </Link>
            <Link to="/feedback" className="hidden sm:inline-block text-slate-600 hover:text-slate-900 transition">
              Feedback
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <UserIcon size={14} /> {user.username}
                </Link>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg">
                  Sign In
                </Link>
                <Link to="/register" className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-sky-700">
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50/80 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-600">
            <Sparkles size={14} />
            <span>Dedicated Workspaces</span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Select your operational portal
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
            Authenticated access for Pwani University personnel. Workspaces are configured specifically for
            your role permissions.
          </p>

          {user && (
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Signed in as <strong className="text-slate-900">{user.username}</strong> ({user.role})</span>
            </div>
          )}
        </div>
      </section>

      {/* Modules Grid */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.title}
                to={mod.path}
                className={`group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated ${mod.accent}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${mod.iconBg}`}>
                      <Icon size={24} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {mod.badge}
                    </span>
                  </div>

                  <h2 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {mod.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
                    {mod.desc}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-bold text-sky-600">
                  <span>Enter Workspace</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
