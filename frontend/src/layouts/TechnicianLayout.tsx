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
      <aside className="w-64 bg-blue-800 text-white flex flex-col shadow-lg">
        <div className="p-6 text-2xl font-bold border-b border-blue-700">
          TechPortal
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/technician/dashboard" className="block p-3 rounded hover:bg-blue-700 transition font-medium">
            Dashboard
          </Link>
          <Link to="/profile" className="block p-3 rounded hover:bg-blue-700 transition font-medium">
            My Profile
          </Link>
        </nav>
        <div className="p-4 border-t border-blue-700">
          <p className="text-xs mb-3 opacity-70 uppercase tracking-wider font-bold">Account: {user?.username || "Technician"}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold transition shadow-md"
          >
            Logout
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