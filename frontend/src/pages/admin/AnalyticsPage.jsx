import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, ArcElement, Tooltip, Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null);
  const [byMonth, setByMonth] = useState([]);
  const [byTechnician, setByTechnician] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await api.get("maintenance/stats/");
      setStats(res.data);

      const monthly = await api.get("maintenance/monthly/");
      setByMonth(monthly.data);

      const tech = await api.get("maintenance/technician/stats/");
      setByTechnician(tech.data);
    } catch (err) {
      console.log("Error loading analytics", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <AdminLayout><p>Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">System Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Total Requests</h2>
          <p className="text-3xl font-bold mt-2">{stats.total_requests}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Completed</h2>
          <p className="text-3xl font-bold mt-2">{stats.completed}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">In Progress</h2>
          <p className="text-3xl font-bold mt-2">{stats.in_progress}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Pending</h2>
          <p className="text-3xl font-bold mt-2">{stats.pending}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">

        {/* Monthly Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-3">Requests Per Month</h2>

          <Bar
            data={{
              labels: byMonth.map(m => m.month),
              datasets: [
                {
                  label: "Requests",
                  data: byMonth.map(m => m.count),
                }
              ]
            }}
            options={{ responsive: true }}
          />
        </div>

        {/* Status Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-3">Requests by Status</h2>

          <Doughnut
            data={{
              labels: ["Pending", "Assigned", "In Progress", "Completed"],
              datasets: [
                {
                  data: [
                    stats.pending,
                    stats.assigned,
                    stats.in_progress,
                    stats.completed
                  ]
                }
              ]
            }}
          />
        </div>
      </div>

      {/* Technician Ranking */}
      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="text-xl font-bold mb-3">Technician Performance</h2>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Technician</th>
              <th className="p-2">Total Tasks</th>
              <th className="p-2">Completed</th>
              <th className="p-2">Pending</th>
            </tr>
          </thead>

          <tbody>
            {byTechnician.map((t) => (
              <tr key={t.technician_id} className="border-t">
                <td className="p-2">{t.technician_name}</td>
                <td className="p-2">{t.total}</td>
                <td className="p-2">{t.completed}</td>
                <td className="p-2">{t.pending}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </AdminLayout>
  );
}