import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, ClipboardList, BarChart3, History, ShieldCheck, FilePlus } from "lucide-react";

const navLinks = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/assets", label: "Assets", icon: ClipboardList },
  { to: "/admin/requests", label: "Requests", icon: FilePlus },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/logs", label: "Logs", icon: History },
];

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-gradient-blue-soft py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3 text-slate-900">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Admin Support Portal</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Operations Control Center</h1>
              <p className="max-w-2xl text-sm sm:text-base text-slate-600">Monitor requests, manage assets, and coordinate maintenance with a responsive dashboard designed for administrative teams.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Live Updates</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">Realtime metrics</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Team Access</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">Admin, staff, tech</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Mobile Friendly</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">Optimized for desktop & phone</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-10 pt-6 sm:px-6 lg:flex-row lg:items-start lg:gap-8">
        <aside className="w-full shrink-0 rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-slate-200/80 lg:max-w-[280px]">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Admin Navigation</p>
            <h2 className="mt-3 text-xl font-bold text-slate-900">Portal Tools</h2>
          </div>
          <nav className="space-y-3">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-400 hover:bg-orange-50 hover:text-slate-900"
                >
                  <Icon size={18} className="text-orange-500" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="w-full rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200/80 lg:min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
