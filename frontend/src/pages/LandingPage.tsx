import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Menu,
  ShieldCheck,
  Users,
  Wrench,
  Boxes,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

const capabilities = [
  {
    icon: ClipboardList,
    title: 'Work Order Management',
    text: 'Capture maintenance requests with photos, severity rankings, and exact campus locations.',
    tag: 'Requests',
  },
  {
    icon: Boxes,
    title: 'Asset Lifecycle & QR',
    text: 'Track equipment condition, warranties, locations, and print QR codes for instant field inspection.',
    tag: 'Inventory',
  },
  {
    icon: Wrench,
    title: 'Technician Dispatch',
    text: 'Automate job assignment, enable live progress updates, and document service logs.',
    tag: 'Field Operations',
  },
  {
    icon: BarChart3,
    title: 'Executive Analytics',
    text: 'Understand failure patterns, technician completion rates, and equipment repair costs in real time.',
    tag: 'Intelligence',
  },
];

const portalCards = [
  {
    icon: Users,
    role: 'Staff & Students',
    title: 'Service Support Portal',
    desc: 'Log maintenance tickets for lecture halls, laboratories, hostels, and departmental offices.',
    link: '/staff/dashboard',
    color: 'from-sky-500 to-blue-600',
  },
  {
    icon: Wrench,
    role: 'Maintenance Crew',
    title: 'Technician Field Desk',
    desc: 'Receive assigned work orders, update repair statuses, and upload completion proof.',
    link: '/technician/dashboard',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    icon: ShieldCheck,
    role: 'Estate Management',
    title: 'Campus Administration',
    desc: 'Full oversight of facility operations, user authorization, asset registry, and system audit logs.',
    link: '/admin',
    color: 'from-slate-700 to-slate-900',
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Report Incident',
    desc: 'University staff or students capture issues with photos, priority levels, and exact room locations.',
  },
  {
    step: '02',
    title: 'Triage & Assign',
    desc: 'Facilities management reviews work orders and dispatches qualified technicians with single-click routing.',
  },
  {
    step: '03',
    title: 'Inspect & Resolve',
    desc: 'Technicians complete repairs on-site, record maintenance actions, and log verification history.',
  },
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
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
                Smart Campus Facility
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <Link to="/" className="text-sky-600 font-bold transition">
              Home
            </Link>
            <Link to="/core-capabilities" className="hover:text-slate-900 transition">
              Capabilities
            </Link>
            <Link to="/portals" className="hover:text-slate-900 transition">
              Workspaces
            </Link>
            <Link to="/contact" className="hover:text-slate-900 transition">
              Support
            </Link>
            <Link to="/feedback" className="hover:text-slate-900 transition">
              Feedback
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-700 hover:shadow-lg active:scale-95"
            >
              Get Started <ArrowRight size={15} />
            </Link>
          </div>

          <button
            className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <nav className="border-t border-slate-200 bg-white px-5 py-4 shadow-xl md:hidden">
            <div className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
              <Link to="/" className="rounded-lg px-3 py-2.5 hover:bg-slate-100" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/core-capabilities" className="rounded-lg px-3 py-2.5 hover:bg-slate-100" onClick={() => setIsMenuOpen(false)}>
                Capabilities
              </Link>
              <Link to="/portals" className="rounded-lg px-3 py-2.5 hover:bg-slate-100" onClick={() => setIsMenuOpen(false)}>
                Workspaces
              </Link>
              <Link to="/contact" className="rounded-lg px-3 py-2.5 hover:bg-slate-100" onClick={() => setIsMenuOpen(false)}>
                Support
              </Link>
              <Link to="/feedback" className="rounded-lg px-3 py-2.5 hover:bg-slate-100" onClick={() => setIsMenuOpen(false)}>
                Feedback
              </Link>
              <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
                <Link to="/login" className="rounded-xl border border-slate-200 py-2.5 text-center font-bold text-slate-700">
                  Sign In
                </Link>
                <Link to="/register" className="rounded-xl bg-sky-600 py-2.5 text-center font-bold text-white">
                  Create Account
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 pb-28 pt-20 text-white md:pb-36 md:pt-28">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold text-sky-300 shadow-inner">
                <Sparkles size={14} className="text-sky-400" />
                <span>Pwani University Intelligent Operations System</span>
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
                Modern facilities care, <br />
                <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent">
                  built for campus scale.
                </span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
                One unified platform for fault reporting, technician routing, asset tracking, and
                institutional compliance across all university departments.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-400 hover:shadow-sky-500/40 active:scale-95"
                >
                  Report an Issue <ArrowRight size={17} />
                </Link>
                <Link
                  to="/portals"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-7 py-3.5 text-base font-bold text-slate-200 backdrop-blur transition hover:bg-slate-700 hover:text-white"
                >
                  Access Workspaces
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-14 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-10 sm:grid-cols-4 text-left">
                <div>
                  <p className="text-2xl font-black text-white sm:text-3xl">100%</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">Digital Tracking</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-sky-400 sm:text-3xl">&lt; 2 Hrs</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">Average Triage Time</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-teal-400 sm:text-3xl">QR-Enabled</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">Asset Verification</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white sm:text-3xl">24 / 7</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">Operational Log</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workspaces Section */}
        <section className="relative mx-auto -mt-16 max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {portalCards.map((portal) => {
              const Icon = portal.icon;
              return (
                <div
                  key={portal.title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated"
                >
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-800 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                        <Icon size={24} />
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
                        {portal.role}
                      </span>
                    </div>

                    <h2 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {portal.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {portal.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <Link
                      to={portal.link}
                      className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 transition group-hover:gap-3"
                    >
                      Enter Portal <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Workflow Section */}
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
              Transparent Operations
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              How maintenance works at Pwani
            </h2>
            <p className="mt-4 text-base text-slate-500 sm:text-lg">
              Say goodbye to delayed emails and lost paper notes. Every request moves through a
              structured, verifiable lifecycle.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {workflowSteps.map((step) => (
              <div
                key={step.step}
                className="relative rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <span className="font-mono text-3xl font-black text-sky-500/40">
                  {step.step}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Capabilities Grid */}
        <section className="bg-slate-100/60 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                  Enterprise Capabilities
                </span>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Engineered for university estates
                </h2>
              </div>
              <Link
                to="/core-capabilities"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700"
              >
                Explore all system capabilities <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map(({ icon: Icon, title, text, tag }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 text-white sm:px-14 sm:py-20 shadow-elevated">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="relative max-w-2xl">
              <span className="inline-block rounded-full bg-sky-500/20 px-3.5 py-1 text-xs font-bold text-sky-300">
                Pwani University Community
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Notice an issue in a lecture hall or laboratory?
              </h2>
              <p className="mt-3 text-base text-slate-300">
                Submit a maintenance work order in less than two minutes. Attach photos and follow repair
                updates through to verified completion.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-sky-400"
                >
                  Report Incident Now <ArrowRight size={15} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-bold text-slate-200 transition hover:bg-slate-700"
                >
                  Sign In to Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-black text-white">
                P
              </div>
              <span className="text-sm font-extrabold text-slate-900">
                Pwani<span className="text-sky-600">Maint</span>
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Pwani University Estate &amp; Facilities Management. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs font-semibold text-slate-600">
            <Link to="/core-capabilities" className="hover:text-sky-600 transition">
              Capabilities
            </Link>
            <Link to="/portals" className="hover:text-sky-600 transition">
              Workspaces
            </Link>
            <Link to="/contact" className="hover:text-sky-600 transition">
              Support Desk
            </Link>
            <Link to="/feedback" className="hover:text-sky-600 transition">
              Give Feedback
            </Link>
            <Link to="/privacy" className="hover:text-sky-600 transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-sky-600 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
