import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-slate-900 text-lg font-black text-white shadow-md shadow-sky-500/20">
              P
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900">
                Pwani<span className="text-sky-600">Maint</span>
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Legal &amp; Compliance
              </p>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={14} /> Back Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
            <ShieldCheck size={14} /> Data Protection &amp; Governance
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last updated: November 2026 • Pwani University Estate &amp; Facilities IT Management
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-card">
          <p className="mb-8 text-sm leading-relaxed text-slate-600">
            This privacy policy explains how the Pwani University Smart Maintenance Management
            Platform handles personal and operational information used to support
            asset administration, maintenance workflows, and facilities accountability.
          </p>

          <div className="space-y-8 divide-y divide-slate-100 text-sm">
            <section className="pt-6 first:pt-0">
              <h2 className="mb-2 text-lg font-bold text-slate-900">
                1. Information We Collect
              </h2>
              <p className="leading-relaxed text-slate-600">
                The platform may collect account details such as usernames, names,
                email addresses, role information, department or assignment data,
                maintenance requests, task updates, uploaded fault images, and service activity records
                submitted by authorized users.
              </p>
            </section>

            <section className="pt-6">
              <h2 className="mb-2 text-lg font-bold text-slate-900">
                2. How Information Is Used
              </h2>
              <p className="leading-relaxed text-slate-600">
                Information is used to authenticate users, assign responsibilities,
                process maintenance issues, monitor service progress, maintain records,
                generate reports, and improve operational planning across university
                facilities and assets.
              </p>
            </section>

            <section className="pt-6">
              <h2 className="mb-2 text-lg font-bold text-slate-900">
                3. Role-Based Visibility
              </h2>
              <p className="leading-relaxed text-slate-600">
                Access to information is strictly controlled according to user role. Users may
                only view or manage data that is relevant to their assigned
                responsibilities unless broader permissions have been formally granted
                by an administrator.
              </p>
            </section>

            <section className="pt-6">
              <h2 className="mb-2 text-lg font-bold text-slate-900">
                4. Data Security
              </h2>
              <p className="leading-relaxed text-slate-600">
                Reasonable administrative and technical safeguards are applied to help
                protect account information and operational records. Users also share
                responsibility for security by maintaining strong passwords and logging
                out of shared devices.
              </p>
            </section>

            <section className="pt-6">
              <h2 className="mb-2 text-lg font-bold text-slate-900">
                5. Record Retention
              </h2>
              <p className="leading-relaxed text-slate-600">
                Maintenance and asset records may be retained for operational,
                reporting, audit, compliance, and planning purposes in accordance with
                institutional policy and any applicable legal requirements.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

