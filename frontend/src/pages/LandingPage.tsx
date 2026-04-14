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
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">U</div>
            <span className="text-xl font-bold tracking-tight text-blue-900">UniMaint <span className="text-blue-600">Pro</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-blue-700 transition">Features</a>
            <a href="#modules" className="hover:text-blue-700 transition">System Modules</a>
            <a href="#workflow" className="hover:text-blue-700 transition">How it Works</a>
            <Link to="/profile" className="hover:text-blue-700 transition">My Profile</Link>
            <button onClick={handleLogout} className="bg-red-600 text-white px-5 py-2.5 rounded-full hover:bg-red-700 transition shadow-sm">
              Sign Out
            </button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent -z-10" />
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            Enterprise Asset Intelligence
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Smart Infrastructure <br />
            <span className="text-blue-700">For Modern Campuses</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Welcome back, <span className="font-bold text-blue-900">{user?.username}</span>. Select a module below to begin managing institutional assets and workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#modules" className="w-full sm:w-auto bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-800 hover:-translate-y-1 transition-all">
              View System Modules
            </a>
            <Link to="/profile" className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition text-center">
              System Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* SYSTEM MODULES (All Pages Included) */}
      <section id="modules" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Integrated Portals</h2>
            <p className="text-slate-500">The platform provides specialized interfaces for every university stakeholder.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Admin Center", desc: "Manage users, inventory, and global system configurations.", color: "bg-blue-100 text-blue-700", path: "/admin" },
              { title: "Staff Portal", desc: "Report issues, track department assets, and view requests.", color: "bg-indigo-100 text-indigo-700", path: "/staff/dashboard" },
              { title: "Tech Desk", desc: "Field maintenance, task updates, and digital proof-of-work.", color: "bg-emerald-100 text-emerald-700", path: "/technician/dashboard" },
              { title: "Analytics Hub", desc: "Deep insights into maintenance costs and asset longevity.", color: "bg-amber-100 text-amber-700", path: "/admin/analytics" }
            ].map((mod, i) => (
              <Link to={mod.path} key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition group text-left">
                <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center font-bold ${mod.color}`}>
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-700 transition">{mod.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{mod.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Asset Management</h3>
            <p>
              Track all university assets, including computers, lab equipment, furniture,
              and more. Attach images and assign QR codes for quick access.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Maintenance Requests</h3>
            <p>
              Staff can easily submit maintenance requests and upload photographs of
              issues. Admins assign technicians and monitor progress.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Technician Workflow</h3>
            <p>
              Technicians receive assigned tasks, update status, upload repair proof,
              and add notes. Progress is tracked automatically.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="workflow" className="bg-slate-900 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">The Lifecycle Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { t: "Report", d: "Staff identify issues and submit with rich media context." },
              { t: "Coordinate", d: "Admins triage and assign the right skill sets." },
              { t: "Resolve", d: "Technicians close the loop with verifiable repair data." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-black opacity-10 mb-4">{i + 1}</div>
                <h3 className="text-2xl font-bold mb-4">{step.t}</h3>
                <p className="text-slate-400 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-950 text-white py-12 border-t border-blue-900 text-center">
        <p className="text-lg">
          © {new Date().getFullYear()} Pwani University Asset & Maintenance Management.
          <br /><span className="text-sm text-slate-400">Developed for Institutional Excellence</span>
        </p>
      </footer>

    </div>
  );
}