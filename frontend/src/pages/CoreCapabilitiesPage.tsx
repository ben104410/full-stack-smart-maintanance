import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  Wrench,
  Boxes,
  QrCode,
  TrendingUp,
  History,
  Sparkles
} from "lucide-react";

const capabilitiesList = [
  {
    icon: ClipboardList,
    title: "Fault Reporting & Work Orders",
    desc: "Single-point ticketing for reporting physical defects, broken electrical fittings, plumbing failures, or equipment malfunctions with image uploads and room locations.",
    badge: "Reporting",
  },
  {
    icon: Boxes,
    title: "Asset Lifecycle & Registry",
    desc: "Comprehensive database cataloging campus assets (projectors, lab equipment, HVAC, furniture) with condition status (Working, Under Repair, Damaged, Retired).",
    badge: "Inventory",
  },
  {
    icon: QrCode,
    title: "Dynamic QR Identification",
    desc: "Auto-generated scannable QR codes for each physical asset, linking maintenance teams directly to the unit's maintenance history and warranty specs.",
    badge: "Hardware Sync",
  },
  {
    icon: Wrench,
    title: "Technician Dispatch & Triage",
    desc: "Assign qualified technicians to open work orders. Technicians update job phases in real time (Pending, In Progress, Completed) from any mobile device.",
    badge: "Field Operations",
  },
  {
    icon: TrendingUp,
    title: "Operational Analytics",
    desc: "Real-time metrics tracking request turnaround times, failure rates across buildings, and individual technician workload distributions.",
    badge: "Intelligence",
  },
  {
    icon: History,
    title: "Immutable Compliance & Auditing",
    desc: "Detailed audit log of every creation, assignment, status change, and system interaction with timestamped actor identification.",
    badge: "Governance",
  },
];

export default function CoreCapabilitiesPage() {
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
                Core Capabilities
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50/80 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-3.5 py-1 text-xs font-bold text-sky-700">
            <Sparkles size={14} /> System Architecture
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Institutional Facilities Management Standards
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
            Our centralized platform guarantees equipment reliability, minimizes downtime, and maintains
            full audit accountability across all university premises.
          </p>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilitiesList.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <Icon size={24} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Ready to access your workspace?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
            Sign in with your university account or register to get started with Pwani Maintenance System.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/portals"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-sky-700"
            >
              Explore Portals <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}