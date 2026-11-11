import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import {
  Users as UsersIcon,
  Wrench,
  ClipboardList,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
  Activity,
  ArrowRight
} from "lucide-react";

interface Stats {
  total_users: number;
  technicians?: number;
  total_technicians?: number;
  total_tasks: number;
  pending_requests?: number;
  in_progress?: number;
  completed_tasks: number;
}

interface Task {
  id: number;
  title: string;
  assigned_to: string;
  status: string;
  created_at: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, tasksRes, usersRes] = await Promise.all([
        api.get("maintenance/dashboard/"),
        api.get("maintenance/tasks/recent/"),
        api.get("maintenance/users/"),
      ]);

      setStats(statsRes.data);
      setRecentTasks(tasksRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!user || user.role !== "admin") {
    return <Navigate to="/portals" replace />;
  }

  if (loading && !stats) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-t-transparent" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Registered Users",
      value: stats?.total_users ?? 0,
      sub: "Active accounts",
      icon: UsersIcon,
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      label: "Technicians On Duty",
      value: stats?.technicians ?? stats?.total_technicians ?? 0,
      sub: "Assigned to work orders",
      icon: Wrench,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      label: "Total Work Orders",
      value: stats?.total_tasks ?? 0,
      sub: `${stats?.in_progress ?? 0} in progress`,
      icon: ClipboardList,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Completed & Verified",
      value: stats?.completed_tasks ?? 0,
      sub: stats?.total_tasks ? `${Math.round(((stats.completed_tasks || 0) / stats.total_tasks) * 100)}% resolution rate` : "No requests",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Operations Control
            </span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              Live Feed
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Campus Administration
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Real-time health, incident queue, and equipment inventory across Pwani University.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={fetchDashboardData}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <Link
            to="/admin/analytics"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <TrendingUp size={14} /> Analytics
          </Link>
          <Link
            to="/admin/requests"
            className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-sky-700"
          >
            <ClipboardList size={14} /> All Work Orders
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition-all hover:shadow-elevated"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {item.label}
                </span>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <p className="mt-4 text-3xl font-extrabold text-slate-900">{item.value}</p>
              <p className="mt-1 text-xs font-medium text-slate-400">{item.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Content Split: Recent Work Orders & System Users */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Work Orders (2 Columns) */}
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-card overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div className="flex items-center gap-2.5">
              <Activity size={18} className="text-sky-600" />
              <h2 className="text-base font-bold text-slate-900">Recent Incident Reports</h2>
            </div>
            <Link
              to="/admin/requests"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              View Full Registry <ArrowRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-3.5">Title</th>
                  <th className="px-6 py-3.5">Assigned Technician</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {recentTasks.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-400">
                      No maintenance incidents logged yet.
                    </td>
                  </tr>
                ) : (
                  recentTasks.map((task) => (
                    <tr key={task.id} className="transition-colors hover:bg-slate-50/80">
                      <td className="px-6 py-4 font-bold text-slate-900">{task.title || "Untitled"}</td>
                      <td className="px-6 py-4 text-slate-600">
                        {task.assigned_to && task.assigned_to !== "Unassigned" ? (
                          <span className="font-semibold text-teal-700">{task.assigned_to}</span>
                        ) : (
                          <span className="italic text-slate-400">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            task.status === "completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : task.status === "in_progress"
                              ? "bg-sky-50 text-sky-700 border border-sky-200/60"
                              : task.status === "assigned"
                              ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                              : "bg-amber-50 text-amber-700 border border-amber-200/60"
                          }`}
                        >
                          {(task.status || "pending").replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/admin/requests/${task.id}`}
                          className="font-bold text-sky-600 hover:underline"
                        >
                          Manage &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Users Roster (1 Column) */}
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <h2 className="text-base font-bold text-slate-900">Campus Directory</h2>
            <Link to="/admin/users" className="text-xs font-bold text-sky-600 hover:underline">
              All Users &rarr;
            </Link>
          </div>

          <div className="divide-y divide-slate-100 p-2">
            {users.slice(0, 5).map((u, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 hover:bg-slate-50 rounded-xl transition">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 font-bold text-xs text-slate-700">
                    {u.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900">{u.username}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{u.email}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    u.role === "admin"
                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                      : u.role === "technician"
                      ? "bg-teal-50 text-teal-700 border border-teal-200"
                      : u.role === "staff"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
