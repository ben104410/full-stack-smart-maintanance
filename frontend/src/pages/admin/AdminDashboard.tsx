import { useEffect, useState } from "react";
import api from "../../api";
import AdminLayout from "../../layouts/AdminLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("dashboard/stats/")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {!stats ? (
        <p>Loading statistics...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold text-xl">Total Requests</h2>
            <p className="text-3xl mt-2">{stats.total_requests}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold text-xl">Completed</h2>
            <p className="text-3xl mt-2">{stats.completed}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold text-xl">Pending</h2>
            <p className="text-3xl mt-2">{stats.pending_requests}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold text-xl">In Progress</h2>
            <p className="text-3xl mt-2">{stats.in_progress}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold text-xl">Total Assets</h2>
            <p className="text-3xl mt-2">{stats.total_assets}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold text-xl">Technicians</h2>
            <p className="text-3xl mt-2">{stats.total_technicians}</p>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
