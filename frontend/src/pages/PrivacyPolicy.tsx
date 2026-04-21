import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="border-b-4 border-[#f37021] bg-[#002147] text-white shadow-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-300">
              Legal
            </p>
            <h1 className="mt-2 text-3xl font-black md:text-4xl">
              Privacy Policy
            </h1>
          </div>
          <Link
            to="/"
            className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white/20"
          >
            Back Home
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="mb-8 text-sm font-medium text-slate-500">
            This privacy policy explains how the university maintenance management
            platform handles personal and operational information used to support
            asset administration, maintenance workflows, and service accountability.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                1. Information We Collect
              </h2>
              <p className="leading-relaxed text-slate-600">
                The platform may collect account details such as usernames, names,
                email addresses, role information, department or assignment data,
                maintenance requests, task updates, and service activity records
                submitted by authorized users.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                2. How Information Is Used
              </h2>
              <p className="leading-relaxed text-slate-600">
                Information is used to authenticate users, assign responsibilities,
                process maintenance issues, monitor service progress, maintain records,
                generate reports, and improve operational planning across university
                facilities and assets.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                3. Role-Based Visibility
              </h2>
              <p className="leading-relaxed text-slate-600">
                Access to information is controlled according to user role. Users may
                only view or manage data that is relevant to their assigned
                responsibilities unless broader permissions have been formally granted
                by an administrator.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                4. Data Security
              </h2>
              <p className="leading-relaxed text-slate-600">
                Reasonable administrative and technical safeguards are applied to help
                protect account information and operational records. Users also share
                responsibility for security by maintaining strong passwords and logging
                out of shared devices.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                5. Record Retention
              </h2>
              <p className="leading-relaxed text-slate-600">
                Maintenance and asset records may be retained for operational,
                reporting, audit, compliance, and planning purposes in accordance with
                institutional policy and any applicable legal requirements.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                6. Information Sharing
              </h2>
              <p className="leading-relaxed text-slate-600">
                Information is shared internally only where necessary for service
                delivery, supervision, reporting, or policy compliance. The platform is
                intended for institutional use, and information should not be disclosed
                externally without proper authorization.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                7. User Responsibilities
              </h2>
              <p className="leading-relaxed text-slate-600">
                Users should ensure that submitted information is accurate, relevant,
                and appropriate for university operations. Sensitive personal details
                unrelated to maintenance activity should not be included in requests or
                task notes unless explicitly required.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                8. Policy Updates
              </h2>
              <p className="leading-relaxed text-slate-600">
                This policy may be revised to reflect changes in platform features,
                operational practices, or institutional requirements. Updated versions
                take effect once published within the application or related channels.
              </p>
            </section>
          </div>

          <div className="mt-10 rounded-2xl bg-slate-50 p-6">
            <p className="text-sm leading-relaxed text-slate-600">
              If you need clarification about privacy practices or system data
              handling, please use the{" "}
              <Link to="/contact" className="font-bold text-[#f37021] hover:underline">
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