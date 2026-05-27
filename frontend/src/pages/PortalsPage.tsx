import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PortalsPage() {
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;
  const logout = auth?.logout || (() => {});
  // Use logout when signing out
  const handleLogout = () => {
    logout();
  };

  const modules = [
    {
      title: "Campus Administration",
      role: "admin",
      desc: "Oversee facilities, manage users, and ensure compliance across the institution.",
      color: "bg-sky-700 text-white",
      path: "/admin",
    },
    {
      title: "Staff Service Portal",
      role: "staff",
      desc: "Submit and track maintenance requests, and view departmental asset information.",
      color: "bg-[#f37021] text-white",
      path: "/staff/dashboard",
    },
    {
      title: "Maintenance Team Portal",
      role: "technician",
      desc: "Manage assigned tasks, update repair statuses, and document completed work.",
      color: "bg-sky-600 text-white",
      path: "/technician/dashboard",
    },
    {
      title: "Facilities Analytics",
      role: "admin",
      desc: "Gain insights into operational performance, resource utilization, and asset lifecycle.",
      color: "bg-sky-800 text-white", 
      path: "/admin/analytics",
    },
  ].filter((mod) => 
    {
      const userRole = user?.role?.toLowerCase();
      const moduleRole = mod.role?.toLowerCase();
      return userRole === "admin" || userRole === moduleRole;
    }
  );

  return (
    <div className="min-h-screen bg-sky-50/30 font-sans antialiased text-slate-900">
      <header className="sticky top-0 z-50 border-b-4 border-[#f37021] bg-sky-50 shadow-2xl">
        <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f37021] text-2xl font-black text-white shadow-inner">
              P
            </div> {/* Consider replacing 'P' with an actual institution logo */}
            <span className="text-2xl font-extrabold uppercase italic tracking-tighter text-sky-900"> {/* Updated branding */}
              Pwani <span className="text-[#f37021]">University</span> <span className="text-xs lowercase not-italic tracking-normal text-sky-600 opacity-70">maint</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-widest text-sky-900 md:flex">
            <Link to="/" className="transition-colors hover:text-orange-400"> {/* Home link is good */}
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
                <button // Using the existing handleLogout
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
                  className="rounded-xl border border-sky-200 bg-sky-100 px-6 py-3 text-sky-900 shadow-lg transition-all active:scale-95 hover:bg-sky-200"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <section className="bg-sky-100 px-6 py-24 text-sky-900">
        <div className="mx-auto max-w-6xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400"> {/* Updated section title */}
            Institutional Services
          </span>
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight md:text-6xl"> {/* Updated main heading */}
            Smart <span className="text-sky-600">Maintenance</span> Portals
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-sky-800"> {/* Refined description */}
            Streamlining facilities management for Pwani University. Access your specialized workspace to manage requests, track tasks, and monitor institutional resources.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"> {/* Updated sub-heading */}
            <div>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#f37021]"> {/* Updated sub-heading */}
                Available Workspaces
              </span>
              <h2 className="mt-3 text-4xl font-black text-sky-950"> {/* Updated call to action */}
                Select your role to continue
              </h2>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-sky-900 transition hover:text-[#f37021]"
            >
              ← Back to Landing Page
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {modules.map((mod, i) => (
              <Link
                to={mod.path}
                key={mod.title}
                className="group rounded-[2.5rem] border border-sky-100 bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-sky-300 hover:shadow-2xl"
              >
                <div
                  className={`mb-8 flex h-12 w-12 items-center justify-center rounded-2xl font-black shadow-lg transition-transform group-hover:scale-110 ${mod.color}`}
                >
                  0{i + 1}
                </div>
                <h3 className="mb-3 text-2xl font-black tracking-tight text-sky-950">
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
