import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PortalsPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const user = auth?.user ?? null;
  const logout = auth?.logout || (() => {});

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const modules = [
    {
      title: "Admin Core",
      role: "admin",
      desc: "Global orchestration, audit logs, compliance monitoring, and user administration.",
      color: "bg-[#002147] text-white",
      path: "/admin",
    },
    {
      title: "Staff Node",
      role: "staff",
      desc: "Request intake, departmental coordination, and day-to-day asset visibility.",
      color: "bg-[#f37021] text-white",
      path: "/staff/dashboard",
    },
    {
      title: "Tech Desk",
      role: "technician",
      desc: "Assigned task execution, repair updates, and proof-of-work tracking.",
      color: "bg-[#002147] text-white",
      path: "/technician/dashboard",
    },
    {
      title: "Analytics Hub",
      role: "admin",
      desc: "Performance metrics, lifecycle insights, and operational intelligence.",
      color: "bg-[#002147] text-white", // Changed to primary dark blue
      path: "/admin/analytics",
    },
  ].filter((mod) => !mod.role || user?.role === mod.role || user?.role === "admin");

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900">
      <header className="sticky top-0 z-50 border-b-4 border-[#f37021] bg-[#002147] shadow-2xl">
        <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f37021] text-2xl font-black text-white shadow-inner">
              P
            </div>
            <span className="text-2xl font-extrabold uppercase italic tracking-tighter text-white">
              Pwani <span className="text-[#f37021]">Maint</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-widest text-blue-100 md:flex">
            <Link to="/" className="transition-colors hover:text-orange-400">
              Home
            </Link>
            <Link to="/portals" className="text-orange-400">
              Portals
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="transition-colors hover:text-orange-400">
                  Profile Hub
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-white shadow-lg transition-all active:scale-95 hover:bg-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="transition-colors hover:text-orange-400">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-white shadow-lg transition-all active:scale-95 hover:bg-white/20"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <section className="bg-[#002147] px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
            Service Access
          </span>
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight md:text-6xl">
            Integrated Service Portals
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-blue-100/80">
            Access the right workspace for your role and manage maintenance operations,
            reporting, task execution, and institutional oversight from a dedicated portal.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#f37021]">
                Available Workspaces
              </span>
              <h2 className="mt-3 text-4xl font-black text-[#002147]">
                Choose a portal and continue
              </h2>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#002147] transition hover:text-[#f37021]"
            >
              ← Back to Landing Page
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {modules.map((mod, i) => (
              <Link
                to={mod.path}
                key={mod.title}
                className="group rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-orange-200 hover:shadow-2xl"
              >
                <div
                  className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl font-black shadow-lg transition-transform group-hover:scale-110 ${mod.color}`}
                >
                  0{i + 1}
                </div>
                <h3 className="mb-3 text-2xl font-black tracking-tight text-[#002147]">
                  {mod.title}
                </h3>
                <p className="mb-8 text-sm font-medium leading-relaxed text-slate-500">
                  {mod.desc}
                </p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-500 transition-all group-hover:translate-x-2">
                  Access Portal →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
