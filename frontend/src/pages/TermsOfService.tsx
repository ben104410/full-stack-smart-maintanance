import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="border-b-4 border-[#f37021] bg-[#002147] text-white shadow-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-300">
              Legal
            </p>
            <h1 className="mt-2 text-3xl font-black md:text-4xl">
              Terms of Service
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
            These terms govern access to and use of the Pwani University Asset and
            Maintenance Management platform by administrators, staff, technicians,
            students, and other authorized users.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
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

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                3. Acceptable Use
              </h2>
              <p className="leading-relaxed text-slate-600">
                Users must submit accurate maintenance requests, update task progress in
                good faith, and use the platform only for legitimate university
                operations. Misuse includes submitting false reports, altering records
                without authorization, attempting to bypass role restrictions, or using
                the system in a way that disrupts service delivery.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                4. Data Accuracy and Accountability
              </h2>
              <p className="leading-relaxed text-slate-600">
                The effectiveness of maintenance coordination depends on accurate asset
                information, issue descriptions, status updates, and service notes. Each
                user is responsible for the integrity of information they create,
                modify, or approve within the system.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                5. Role-Based Responsibilities
              </h2>
              <p className="leading-relaxed text-slate-600">
                Administrators manage oversight, assignment, and reporting functions.
                Staff and students may report issues and monitor request progress.
                Technicians are expected to maintain timely and accurate task updates.
                All users must operate within the permissions assigned to their roles.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                6. Service Availability
              </h2>
              <p className="leading-relaxed text-slate-600">
                The university aims to keep the platform available and secure, but does
                not guarantee uninterrupted operation at all times. Maintenance windows,
                upgrades, network interruptions, or security measures may affect access
                temporarily.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                7. Compliance and Enforcement
              </h2>
              <p className="leading-relaxed text-slate-600">
                Failure to comply with these terms may result in access restrictions,
                account suspension, administrative review, or other corrective action in
                line with university policies and applicable regulations.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-[#002147]">
                8. Updates to These Terms
              </h2>
              <p className="leading-relaxed text-slate-600">
                These terms may be updated periodically to reflect operational,
                security, or policy changes. Continued use of the platform after updates
                are published constitutes acceptance of the revised terms.
              </p>
            </section>
          </div>

          <div className="mt-10 rounded-2xl bg-slate-50 p-6">
            <p className="text-sm leading-relaxed text-slate-600">
              For questions regarding these terms or institutional system use, please
              visit the{" "}
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