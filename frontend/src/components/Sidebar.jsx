import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-900 text-white p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col space-y-3">
        <Link to="/admin" className="hover:bg-blue-700 p-2 rounded">Dashboard</Link>
        <Link to="/admin/users" className="hover:bg-blue-700 p-2 rounded">Users</Link>
        <Link to="/admin/assets" className="hover:bg-blue-700 p-2 rounded">Assets</Link>
        <Link to="/admin/requests" className="hover:bg-blue-700 p-2 rounded">Maintenance Requests</Link>
        <Link to="/admin/analytics" className="hover:bg-blue-700 p-2 rounded">Analytics</Link>
        <Link to="/admin/logs" className="hover:bg-blue-700 p-2 rounded">Activity Logs</Link>
        <Link to="/profile" className="hover:bg-blue-700 p-2 rounded">My Profile</Link>
      </nav>
    </div>
  );
}