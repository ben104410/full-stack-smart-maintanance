import { type ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Props {
  children: ReactNode;
}

export default function TechnicianLayout({ children }: Props) {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const logout = authContext?.logout || (() => {});
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-80 bg-[#002147] text-white flex flex-col shadow-xl border-r-4 border-[#f37021]">
        <div className="p-10 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f37021] rounded-lg flex items-center justify-center font-bold text-xl">T</div>
            <span className="text-2xl font-bold tracking-tight uppercase">Tech<span className="text-[#f37021]">Desk</span></span>
          </div>
        </div>
        <nav className="flex-1 p-8 space-y-4">
          <Link to="/technician/dashboard" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-all font-black text-xs uppercase tracking-widest text-blue-100 hover:text-white border border-transparent hover:border-white/10">
            <span className="opacity-50">01</span> Dashboard
          </Link>
          <Link to="/profile" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-all font-black text-xs uppercase tracking-widest text-blue-100 hover:text-white border border-transparent hover:border-white/10">
            <span className="opacity-50">02</span> My Profile
          </Link>
          <Link to="/" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-all font-black text-xs uppercase tracking-widest text-orange-400 border border-transparent hover:border-orange-500/20">
            <span className="opacity-50">03</span> Return to Hub
          </Link>
        </nav>
        <div className="p-6 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-xs">
              {user?.username?.[0]?.toUpperCase() || "T"}
            </div>
            <div>
              <p className="text-sm font-bold truncate">{user?.username}</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Technician</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full bg-slate-800 hover:bg-red-900/50 hover:text-red-200 text-slate-300 py-3 rounded-xl font-bold text-sm transition-all border border-slate-700">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b p-4 flex justify-between items-center px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 uppercase tracking-wide">Maintenance System</h2>
        </header>
        <main className="p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}