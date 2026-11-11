import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Clock, MessageSquare } from "lucide-react";

export default function ContactPage() {
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
                Support Desk
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

      <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
            Institutional Support
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            How can our team help?
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-500">
            Reach the team responsible for platform access, role verification, and campus facilities operations.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 mb-6">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Technical Helpdesk</h3>
            <p className="mt-2 text-sm text-slate-500">
              For issues regarding login credentials, permission rights, or system glitches.
            </p>
            <a
              href="mailto:support@pwani-maint.local"
              className="mt-6 inline-block text-sm font-bold text-sky-600 hover:underline"
            >
              support@pwani-maint.local &rarr;
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 mb-6">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Estate Management Department</h3>
            <p className="mt-2 text-sm text-slate-500">
              Main Campus, Kilifi<br />
              P.O. Box 195-80108, Kilifi, Kenya<br />
              Block B, Facilities Operations Wing
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-6">
              <Clock size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Operating Hours</h3>
            <p className="mt-2 text-sm text-slate-500">
              Emergency Maintenance: 24/7 on call<br />
              Office Helpdesk: Monday – Friday, 8:00 AM – 5:00 PM EAT
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-6">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Platform Feedback</h3>
            <p className="mt-2 text-sm text-slate-500">
              Have an idea or spotted a bug? We welcome your input to refine user experience.
            </p>
            <Link
              to="/feedback"
              className="mt-6 inline-block text-sm font-bold text-sky-600 hover:underline"
            >
              Open Feedback Form &rarr;
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}