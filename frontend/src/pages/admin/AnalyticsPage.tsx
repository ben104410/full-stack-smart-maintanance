import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, ArcElement, Tooltip, Legend
} from "chart.js";
import { BarChart3, TrendingUp, CheckCircle, Clock, RefreshCw } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>({
    total_requests: 0,
    completed: 0,
    in_progress: 0,
    pending: 0,
    assigned: 0,
  });
  const [byMonth, setByMonth] = useState<any[]>([]);
  const [byTechnician, setByTechnician] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [statsRes, monthlyRes, techRes] = await Promise.allSettled([
        api.get("maintenance/stats/"),
        api.get("maintenance/monthly/"),
        api.get("maintenance/technician/stats/"),
      ]);

      if (statsRes.status === "fulfilled") {
        setStats(statsRes.value.data);
      }
      if (monthlyRes.status === "fulfilled") {
        setByMonth(Array.isArray(monthlyRes.value.data) ? monthlyRes.value.data : []);
      }
      if (techRes.status === "fulfilled") {
        setByTechnician(Array.isArray(techRes.value.data) ? techRes.value.data : []);
      }
    } catch (err) {
      console.error("Error loading analytics:", err);
      toast.error("Failed to load some analytics data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const totalRequests = stats?.total_requests ?? stats?.total_tasks ?? 0;
  const completedCount = stats?.completed ?? stats?.completed_tasks ?? 0;
  const inProgressCount = stats?.in_progress ?? 0;
  const pendingCount = stats?.pending ?? stats?.pending_requests ?? 0;
  const assignedCount = stats?.assigned ?? 0;

  const monthLabels = byMonth.length > 0 ? byMonth.map(m => m.month) : ["Current Period"];
  const monthCounts = byMonth.length > 0 ? byMonth.map(m => m.total_requests ?? m.count ?? 0) : [totalRequests];

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-sky-600">Operations Intelligence</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Facilities &amp; Work Order Analytics</h1>
          <p className="mt-1 text-xs text-slate-500">Live operational throughput, task distribution, and staff performance metrics.</p>
        </div>

        <button
          onClick={fetchStats}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 self-start md:self-auto"
        >
          <RefreshCw size={14} /> Refresh Data
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Requests</span>
            <BarChart3 size={18} className="text-sky-600" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-slate-900">{totalRequests}</p>
          <p className="mt-1 text-xs text-slate-400">All-time maintenance logged</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Completed</span>
            <CheckCircle size={18} className="text-emerald-600" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-emerald-600">{completedCount}</p>
          <p className="mt-1 text-xs text-slate-400">
            {totalRequests > 0 ? `${Math.round((completedCount / totalRequests) * 100)}% resolved` : "0% resolved"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">In Progress</span>
            <TrendingUp size={18} className="text-indigo-600" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-indigo-600">{inProgressCount}</p>
          <p className="mt-1 text-xs text-slate-400">Actively being serviced</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Pending / Queued</span>
            <Clock size={18} className="text-amber-500" />
          </div>
          <p className="mt-3 text-3xl font-extrabold text-amber-500">{pendingCount}</p>
          <p className="mt-1 text-xs text-slate-400">Awaiting triage & repair</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Bar Chart */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
          <h2 className="text-base font-bold text-slate-900 mb-1">Monthly Request Trajectory</h2>
          <p className="text-xs text-slate-400 mb-4">Volume of maintenance incidents reported over time</p>

          <div className="h-72 flex items-center justify-center">
            <Bar
              data={{
                labels: monthLabels,
                datasets: [
                  {
                    label: "Maintenance Requests",
                    data: monthCounts,
                    backgroundColor: "#0284c7",
                    borderRadius: 6,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { precision: 0 },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Status Breakdown Chart */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
          <h2 className="text-base font-bold text-slate-900 mb-1">Work Order Status Distribution</h2>
          <p className="text-xs text-slate-400 mb-4">Current state breakdown across all institutional requests</p>

          <div className="h-72 flex items-center justify-center">
            <Doughnut
              data={{
                labels: ["Pending", "Assigned", "In Progress", "Completed"],
                datasets: [
                  {
                    data: [pendingCount, assignedCount, inProgressCount, completedCount],
                    backgroundColor: ["#f59e0b", "#3b82f6", "#6366f1", "#10b981"],
                    borderWidth: 2,
                    borderColor: "#ffffff",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Technician Performance Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-base font-bold text-slate-900">Technician Fleet Performance</h2>
          <p className="text-xs text-slate-400">Assigned workload and completion metrics per technician</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Technician</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Assigned</th>
                <th className="px-5 py-3.5">Completed</th>
                <th className="px-5 py-3.5">In Progress</th>
                <th className="px-5 py-3.5">Pending</th>
                <th className="px-5 py-3.5">Completion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {byTechnician.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-slate-400">
                    No technician metrics recorded yet.
                  </td>
                </tr>
              ) : (
                byTechnician.map((tech, idx) => (
                  <tr key={tech.technician_id || idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-slate-900">
                      {tech.technician_name || tech.username}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">{tech.email || "—"}</td>
                    <td className="px-5 py-3.5 font-semibold text-slate-700">
                      {tech.total_assigned ?? tech.total ?? 0}
                    </td>
                    <td className="px-5 py-3.5 font-bold text-emerald-600">{tech.completed ?? 0}</td>
                    <td className="px-5 py-3.5 font-bold text-indigo-600">{tech.in_progress ?? 0}</td>
                    <td className="px-5 py-3.5 font-bold text-amber-500">{tech.pending ?? 0}</td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                        {tech.completion_rate !== undefined ? `${tech.completion_rate}%` : "0%"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}