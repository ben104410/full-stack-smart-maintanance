import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LandingPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const user = auth?.user ?? null;
  const logout = auth?.logout || (() => {});

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const platformLinks = [
    { label: "Core Capabilities", href: "/core-capabilities" },
    { label: "Institutional Portals", href: "/portals" },
    { label: "System Workflows", href: "/core-capabilities" },
    { label: "Leave Feedback", href: "/feedback" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Institutional Support", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] font-sans antialiased text-slate-900 selection:bg-orange-100">
      <header className="sticky top-0 z-50 border-b-4 border-[#f37021] bg-[#002147] shadow-2xl">
        <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f37021] text-3xl font-black text-white shadow-inner">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold uppercase italic leading-none tracking-tighter text-white group-hover:text-orange-100 transition-colors">
                Pwani <span className="text-[#f37021]">Maint</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
                University Portal
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-widest text-blue-100 md:flex">
            <Link to="/core-capabilities" className="transition-colors hover:text-orange-400">
              Core Capabilities
            </Link>
            <Link to="/portals" className="transition-colors hover:text-orange-400">
              Portals
            </Link>
            <Link to="/core-capabilities" className="transition-colors hover:text-orange-400">
              Workflows
            </Link>
            
            <div className="h-8 w-[1px] bg-white/20 mx-2" />

            <Link
              to="/portals"
              className="rounded-xl bg-[#f37021] px-5 py-2.5 text-white transition-all hover:bg-orange-600 shadow-lg"
            >
              Explore Portals
            </Link>
            {!user && (
              <Link
                to="/register"
                className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-white transition-all hover:bg-white/10"
              >
                Request Access
              </Link>
            )}

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
              </>
            )}
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#002147] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#f37021] opacity-20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f8fafc] to-transparent" />

        <div className="relative mx-auto max-w-[1440px] px-8 py-24 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="max-w-2xl">
              <span className="mb-8 inline-block rounded-lg border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
                Smart Facilities Operations
              </span>

              <h1 className="mb-8 text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
                Empowering Institutional <span className="text-[#f37021]">Operational Excellence</span>
              </h1>

              <p className="mb-10 max-w-xl text-lg font-medium leading-relaxed text-blue-100/80 md:text-xl">
                {user ? (
                  <>
                    Authenticated as{" "}
                    <span className="font-bold text-white underline decoration-[#f37021] underline-offset-4">
                      {user.username}
                    </span>
                    . Access your workspace, monitor requests, and manage operational
                    workflows from one secure platform.
                  </>
                ) : (
                  <>
                    Integrated asset tracking, automated maintenance requests, technician
                    coordination, and reporting in one reliable platform built for
                    institutional teams.
                  </>
                )}
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-3xl font-extrabold text-[#f37021]">24/7</div>
                  <p className="mt-2 text-sm text-blue-100/80">
                    Always-on visibility into requests, assets, and service activity.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-3xl font-extrabold text-[#f37021]">3 Roles</div>
                  <p className="mt-2 text-sm text-blue-100/80">
                    Dedicated workflows for administrators, staff, and technicians.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-3xl font-extrabold text-[#f37021]">1 Hub</div>
                  <p className="mt-2 text-sm text-blue-100/80">
                    Unified platform for reporting, coordination, and analytics.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-md md:p-8">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-100/60">
                      System Status
                    </p>
                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
                      Live Performance Matrix
                    </h3>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f37021] text-3xl font-black shadow-lg">
                    HQ
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-lg">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-bold">Asset Compliance</p>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                        Healthy
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">
                      Track inventory, QR-coded assets, and department ownership with
                      confidence.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-[#0b2d5a] p-5">
                      <p className="mb-2 text-sm text-blue-100/70">Open Requests</p>
                      <p className="text-4xl font-extrabold">128</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#0b2d5a] p-5">
                      <p className="mb-2 text-sm text-blue-100/70">Completion Rate</p>
                      <p className="text-4xl font-extrabold">94%</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-100/60">
                      Why teams choose this platform
                    </p>
                    <ul className="space-y-3 text-sm text-blue-50/90">
                      <li>
                        • Faster request handling with clear staff-to-technician
                        workflows
                      </li>
                      <li>
                        • Better accountability through status tracking and activity logs
                      </li>
                      <li>
                        • Smarter decision-making with analytics and lifecycle visibility
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-20 px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group rounded-[2rem] bg-white p-8 shadow-xl transition-all hover:-translate-y-2 border-b-4 border-slate-200 hover:border-[#f37021]">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <h4 className="text-xl font-bold text-[#002147]">Staff Portal</h4>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
              Lodge maintenance requests, track progress of institutional repairs, and manage departmental inventory.
            </p>
            <Link to="/login" className="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#f37021] group-hover:gap-3 transition-all">
              Access Portal <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="group rounded-[2rem] bg-white p-8 shadow-xl transition-all hover:-translate-y-2 border-b-4 border-slate-200 hover:border-[#f37021]">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-[#f37021]">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
            </div>
            <h4 className="text-xl font-bold text-[#002147]">Technician Hub</h4>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
              Receive real-time job assignments, update repair statuses, and document service logs on the go.
            </p>
            <Link to="/portals" className="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#f37021] group-hover:gap-3 transition-all">
              Access Portal <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="group rounded-[2rem] bg-white p-8 shadow-xl transition-all hover:-translate-y-2 border-b-4 border-slate-200 hover:border-[#f37021]">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#002147]">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h4 className="text-xl font-bold text-[#002147]">Admin Core</h4>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
              Global oversight of university assets, audit logging, technician coordination, and operational analytics.
            </p>
            <Link to="/portals" className="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#f37021] group-hover:gap-3 transition-all">
              Access Portal <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-slate-900 px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#f37021]">
              Workflow
            </span>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              A clear service lifecycle from request to resolution
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
            {[
              {
                t: "Report",
                d: "Staff identify issues, submit requests, and attach supporting information for faster assessment.",
              },
              {
                t: "Coordinate",
                d: "Administrators review, prioritize, and assign work while monitoring workloads and timelines.",
              },
              {
                t: "Resolve",
                d: "Technicians complete tasks, upload proof of work, and close service loops with full visibility.",
              },
            ].map((step, i) => (
              <div
                key={step.t}
                className="relative rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <div className="mb-4 text-6xl font-black opacity-10">{i + 1}</div>
                <h3 className="mb-4 text-2xl font-black">{step.t}</h3>
                <p className="leading-relaxed text-slate-300">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-gradient-to-r from-[#002147] to-[#0b2d5a] px-8 py-12 text-white shadow-2xl md:px-12 md:py-16 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#f37021]">
                Get Started
              </span>
              <h2 className="mt-4 mb-4 text-3xl font-black md:text-4xl">
                Bring structure and visibility to your maintenance operations
              </h2>
              <p className="text-lg leading-relaxed text-blue-100/80">
                Use one centralized platform to manage assets, service requests,
                accountability, and reporting across your institution.
              </p>
            </div>

            <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
              <Link
                to={user ? "/profile" : "/login"}
                className="w-full rounded-2xl bg-[#f37021] px-8 py-4 text-center font-black transition-all hover:bg-[#d65a10] sm:w-auto"
              >
                {user ? "Go to Profile" : "Sign In"}
              </Link>
              <Link
                to="/register"
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-center font-black transition-all hover:bg-white/15 sm:w-auto"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

    <footer className="border-t-2 border-[#f37021] bg-[#001529] py-6 text-white">
      <div className="mx-auto max-w-[1440px] px-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-8">
          {/* Left Side Group: Branding & Platform */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
            <div className="max-w-[240px]">
              <div className="mb-3 flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f37021] text-2xl font-black text-white shadow-lg">
                P
              </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black uppercase italic leading-none tracking-tight">
                  Pwani <span className="text-[#f37021]">Maint</span>
                </span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-blue-400">
                    Estate Management
                  </span>
                </div>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-400">
                Unified ecosystem for institutional asset tracking and maintenance orchestration at Pwani University.
              </p>
              </div>

            <div>
              <h3 className="mb-3 text-[9px] font-black uppercase tracking-[0.3em] text-[#f37021]">
                Platform
              </h3>
              <div className="space-y-1.5">
                {platformLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-[11px] font-medium text-slate-300 transition hover:text-[#f37021]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Group: Institutional & Location */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
            <div>
              <h3 className="mb-3 text-[9px] font-black uppercase tracking-[0.3em] text-[#f37021]">
                Institutional
              </h3>
              <div className="space-y-1.5">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-[11px] font-medium text-slate-300 transition hover:text-[#f37021]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-[9px] font-black uppercase tracking-[0.3em] text-[#f37021]">
                Location
              </h3>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Estate Management Dept, Block B<br />
                Main Campus - Kilifi, Kenya.
              </p>
              <p className="mt-1 text-[11px] font-bold text-blue-400">
                support@pwani-maint.local
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/5 pt-5 text-[9px] font-bold uppercase tracking-widest text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Pwani University . Institutional Excellence .</p>
          <p>v2.4.0-Stable</p>
        </div>
      </div>
    </footer>
    </div>
  );
}
