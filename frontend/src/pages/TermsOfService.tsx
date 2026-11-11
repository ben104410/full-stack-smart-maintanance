import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsOfService() {
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
                Terms of Use
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
            <FileText size={14} /> Platform Agreement
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Governing rules and acceptable usage policy for Pwani University Facilities Systems
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-card">
          <p className="mb-8 text-sm leading-relaxed text-slate-600">
            These terms govern access to and use of the Pwani University Asset and
            Maintenance Management platform by administrators, staff, technicians,
            students, and other authorized users.
          </p>

          <div className="space-y-8 divide-y divide-slate-100 text-sm">
            <section className="pt-6 first:pt-0">
              <h2 className="mb-2 text-lg font-bold text-slate-900">
                1. Platform Purpose
              </h2>
              <p className="leading-relaxed text-slate-600">
                This platform is provided to support institutional asset tracking,
                maintenance reporting, work assignment, service documentation, and
                operational oversight across university facilities and resources.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                2. Authorized Access
              </h2>
              <p className="leading-relaxed text-slate-600">
                Access is limited to individuals who have been granted credentials by
                the university or an approved system administrator. Users are
                responsible for ensuring that login details remain confidential and are
                not shared with unauthorized persons.
              </p>
            </section>

            <section className="pt-6">
              <h2 className="mb-2 text-lg font-bold text-slate-900">
                3. Acceptable Use
              </h2>
              <p className="leading-relaxed text-slate-600">
                Users must submit accurate maintenance requests, update task progress in
                good faith, and use the platform only for legitimate university
                operations. Misuse includes submitting false reports, altering records
                without authorization, or attempting to bypass role permissions.
              </p>
            </section>

            <section className="pt-6">
              <h2 className="mb-2 text-lg font-bold text-slate-900">
                4. Data Accuracy and Accountability
              </h2>
              <p className="leading-relaxed text-slate-600">
                The effectiveness of maintenance coordination depends on accurate asset
                information, issue descriptions, status updates, and service notes. Each
                user is responsible for the integrity of information they create or modify.
              </p>
            </section>

            <section className="pt-6">
              <h2 className="mb-2 text-lg font-bold text-slate-900">
                5. Role-Based Responsibilities
              </h2>
              <p className="leading-relaxed text-slate-600">
                Administrators manage oversight, assignment, and reporting functions.
                Staff and students may report issues and monitor request progress.
                Technicians are expected to maintain timely and accurate task updates.
              </p>
            </section>

            <section className="pt-6">
              <h2 className="mb-2 text-lg font-bold text-slate-900">
                6. Service Availability
              </h2>
              <p className="leading-relaxed text-slate-600">
                The university aims to keep the platform available and secure. Maintenance
                windows, upgrades, or security measures may affect access temporarily.
              </p>
            </section>
          </div>

          <div className="mt-10 rounded-2xl bg-slate-50 p-6 border border-slate-100">
            <p className="text-sm leading-relaxed text-slate-600">
              For questions regarding these terms or institutional system use, please
              visit the{" "}
              <Link to="/contact" className="font-bold text-sky-600 hover:underline">
                Contact Support
              </Link>{" "}
              page.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}