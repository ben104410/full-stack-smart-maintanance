import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="hidden lg:block w-64 bg-white border-r border-slate-200 p-4">
      <h2 className="text-lg font-bold mb-4 text-slate-900">Admin Panel</h2>

      <nav className="flex flex-col gap-2">
        <Link to="/admin" className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Dashboard</Link>
        <Link to="/admin/users" className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Users</Link>
        <Link to="/admin/assets" className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Assets</Link>
        <Link to="/admin/requests" className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Maintenance Requests</Link>
        <Link to="/admin/analytics" className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Analytics</Link>
        <Link to="/admin/logs" className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Activity Logs</Link>
        <Link to="/profile" className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">My Profile</Link>
      </nav>
    </div>
  );
}