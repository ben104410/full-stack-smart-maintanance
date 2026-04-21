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

  const footerLinks = [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Contact Support", href: "mailto:support@pwani-maint.local" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 selection:bg-orange-100">
      <header className="sticky top-0 z-50 border-b-4 border-[#f37021] bg-[#002147] shadow-2xl">
        <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f37021] text-2xl font-black text-white shadow-inner">
              P
            </div>
            <span className="text-2xl font-black uppercase italic tracking-tighter text-white">
              Pwani <span className="text-[#f37021]">Maint</span>
            </span>
          </div>

          <nav className="hidden items-center gap-10 text-xs font-black uppercase tracking-widest text-blue-100 md:flex">
            <a href="#features" className="transition-colors hover:text-orange-400">
              Features
            </a>
            <Link to="/portals" className="transition-colors hover:text-orange-400">
              Portals
            </Link>
            <a href="#workflow" className="transition-colors hover:text-orange-400">
              Workflow
            </a>
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

      <section className="relative overflow-hidden bg-[#002147] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#f37021] opacity-20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f8fafc] to-transparent" />

        <div className="relative mx-auto max-w-[1440px] px-8 py-24 lg:py-32">
          <div className="mb-10 flex justify-end">
            <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row sm:justify-end">
              <Link
                to="/portals"
                className="w-full rounded-2xl bg-[#f37021] px-8 py-4 text-center text-sm font-black uppercase tracking-wider text-white shadow-[0_20px_40px_rgba(243,112,33,0.4)] transition-all hover:-translate-y-1 hover:bg-[#d65a10] sm:w-auto"
              >
                Explore Portals
              </Link>
              <Link
                to={user ? "/profile" : "/register"}
                className="w-full rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-center text-sm font-black uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/10 sm:w-auto"
              >
                {user ? "Manage Profile" : "Request Access"}
              </Link>
            </div>
          </div>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="max-w-2xl">
              <span className="mb-8 inline-block rounded-lg border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
                Smart Facilities Operations
              </span>

              <h1 className="mb-8 text-5xl font-black leading-[0.95] tracking-tighter md:text-7xl">
                Professional asset and maintenance management for modern institutions
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
                    Centralize asset tracking, maintenance requests, technician
                    coordination, and reporting in one reliable platform built for
                    institutional teams.
                  </>
                )}
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-3xl font-black text-[#f37021]">24/7</div>
                  <p className="mt-2 text-sm text-blue-100/80">
                    Always-on visibility into requests, assets, and service activity.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-3xl font-black text-[#f37021]">3 Roles</div>
                  <p className="mt-2 text-sm text-blue-100/80">
                    Dedicated workflows for administrators, staff, and technicians.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-3xl font-black text-[#f37021]">1 Hub</div>
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
                      Operations Overview
                    </p>
                    <h3 className="mt-2 text-2xl font-black">
                      Maintenance Command Center
                    </h3>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f37021] text-2xl font-black shadow-lg">
                    PM
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-lg">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-black">Asset Compliance</p>
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
                      <p className="text-4xl font-black">128</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#0b2d5a] p-5">
                      <p className="mb-2 text-sm text-blue-100/70">Completion Rate</p>
                      <p className="text-4xl font-black">94%</p>
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

      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#f37021]">
              Core Capabilities
            </span>
            <h2 className="mt-4 mb-4 text-4xl font-black text-[#002147] md:text-5xl">
              Built for efficient service delivery
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-slate-600">
              Everything your institution needs to manage assets, coordinate
              maintenance activity, and maintain operational accountability at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-3 text-xl font-black text-[#002147]">
                Asset Management
              </h3>
              <p className="leading-relaxed text-slate-600">
                Track university assets including computers, lab equipment, furniture,
                and other resources with ownership details, images, and QR code
                identification.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-3 text-xl font-black text-[#002147]">
                Maintenance Requests
              </h3>
              <p className="leading-relaxed text-slate-600">
                Staff can submit maintenance issues quickly, include supporting photos,
                and follow progress while administrators assign the right response
                teams.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-3 text-xl font-black text-[#002147]">
                Technician Workflow
              </h3>
              <p className="leading-relaxed text-slate-600">
                Technicians receive assigned jobs, update statuses, attach proof of
                work, and document service notes for complete maintenance traceability.
              </p>
            </div>
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

      <footer className="border-t border-blue-900 bg-blue-950 pt-14 pb-10 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 grid gap-10 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f37021] text-xl font-black text-white shadow-inner">
                  P
                </div>
                <span className="text-xl font-black uppercase tracking-tight text-white">
                  Pwani <span className="text-[#f37021]">Maint</span>
                </span>
              </div>
              <p className="max-w-sm leading-relaxed text-slate-300">
                Professional asset and maintenance management for institutional teams
                focused on control, accountability, and service excellence.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-slate-400">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a href="#features" className="block text-slate-200 transition hover:text-orange-400">
                  Features
                </a>
                <Link to="/portals" className="block text-slate-200 transition hover:text-orange-400">
                  Portals
                </Link>
                <a href="#workflow" className="block text-slate-200 transition hover:text-orange-400">
                  Workflow
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-slate-400">
                Legal
              </h3>
              <div className="space-y-3">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-slate-200 transition hover:text-orange-400"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Pwani University Asset & Maintenance Management.</p>
            <p>Developed for institutional excellence and professional service delivery.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
