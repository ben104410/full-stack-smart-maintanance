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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">T</div>
            <span className="text-xl font-bold tracking-tight">Tech Desk</span>
          </div>
        </div>
        <nav className="flex-1 p-6 space-y-3">
          <Link to="/technician/dashboard" className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-slate-800 transition font-semibold text-slate-300 hover:text-white">
            Dashboard
          </Link>
          <Link to="/profile" className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-slate-800 transition font-semibold text-slate-300 hover:text-white">
            My Profile
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