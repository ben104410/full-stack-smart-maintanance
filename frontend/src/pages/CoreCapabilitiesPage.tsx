import { Link } from "react-router-dom";

export default function CoreCapabilitiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="border-b-4 border-[#f37021] bg-[#002147] shadow-xl">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f37021] text-xl font-black text-white shadow-inner">
              P
            </div>
            <span className="text-xl font-black uppercase italic leading-none tracking-tighter text-white">
              Pwani <span className="text-[#f37021]">Maint</span>
            </span>
          </Link>
          <Link
            to="/"
            className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/20"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-20 text-center">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#f37021]">
            Core Capabilities
          </span>
          <h1 className="mt-4 mb-6 text-4xl font-black tracking-tight text-[#002147] md:text-6xl">
            Standardizing University <span className="text-[#f37021]">Maintenance</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl font-medium text-slate-600 leading-relaxed">
            Our centralized ecosystem ensures every piece of equipment and every facility 
            resource is monitored, maintained, and accounted for across the entire Pwani campus.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="rounded-[2.5rem] bg-white p-12 shadow-sm border border-slate-100 transition-all hover:shadow-xl">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-900 text-2xl">
              📋
            </div>
            <h3 className="mb-5 text-2xl font-black text-[#002147]">
              Asset Management
            </h3>
            <p className="text-lg leading-relaxed text-slate-600 font-medium">
              Track university assets including computers, lab equipment, furniture,
              and other resources with ownership details, images, and QR code
              identification.
            </p>
          </div>

          <div className="rounded-[2.5rem] bg-white p-12 shadow-sm border border-slate-100 transition-all hover:shadow-xl">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#f37021] text-2xl">
              🛠️
            </div>
            <h3 className="mb-5 text-2xl font-black text-[#002147]">
              Maintenance Requests
            </h3>
            <p className="text-lg leading-relaxed text-slate-600 font-medium">
              Staff can submit maintenance issues quickly, include supporting photos,
              and follow progress while administrators assign the right response
              teams.
            </p>
          </div>

          <div className="rounded-[2.5rem] bg-white p-12 shadow-sm border border-slate-100 transition-all hover:shadow-xl">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#002147] text-2xl">
              🚀
            </div>
            <h3 className="mb-5 text-2xl font-black text-[#002147]">
              Technician Workflow
            </h3>
            <p className="text-lg leading-relaxed text-slate-600 font-medium">
              Technicians receive assigned jobs, update statuses, attach proof of 
              work, and document service notes for complete maintenance traceability.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}