import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="border-b-4 border-[#f37021] bg-[#002147] shadow-xl">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f37021] text-xl font-black text-white">P</div>
            <span className="text-xl font-black uppercase italic text-white">Pwani <span className="text-[#f37021]">Maint</span></span>
          </Link>
          <Link to="/" className="text-xs font-black uppercase tracking-widest text-white hover:text-orange-400">Back Home</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <span className="text-xs font-black uppercase tracking-[0.25em] text-[#f37021]">Support Center</span>
        <h1 className="mt-4 mb-10 text-4xl font-black text-[#002147] md:text-5xl">Institutional Support</h1>
        
        <div className="grid gap-6">
          <div className="rounded-3xl bg-white p-10 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-4">Technical Helpdesk</h3>
            <p className="text-slate-600 mb-6">For issues regarding account access, role permissions, or platform errors.</p>
            <a href="mailto:support@pwani-maint.local" className="text-2xl font-black text-[#f37021] hover:underline">
              support@pwani-maint.local
            </a>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-4">Campus Locations</h3>
            <p className="text-slate-600">
              Main Campus - Kilifi<br />
              P.O. Box 195-80108, Kilifi, Kenya.<br />
              Estate Management Department, Block B.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}