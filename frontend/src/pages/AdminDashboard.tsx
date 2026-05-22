import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface Stats {
  total_users: number;
  technicians: number;
  total_tasks: number;
  completed_tasks: number;
}

interface Task {
  title: string;
  assigned_to: string;
  status: string;
  created_at: string;
}

interface User {
  username: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
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

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-sky-950 uppercase tracking-tight">Admin <span className="text-sky-600">Dashboard</span></h1>
          <p className="text-slate-500 font-medium">Global oversight of Pwani University Maintenance operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchDashboardData}
            className="p-2.5 rounded-xl border border-sky-200 hover:bg-sky-50 transition-colors text-sky-600"
            title="Refresh Data"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
          <Link to="/admin/analytics" className="bg-sky-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-sky-800 transition-all shadow-lg">
            View Analytics
          </Link>
          <Link to="/feedback" className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">
            Feedback
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: stats?.total_users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Technicians", value: stats?.technicians, color: "text-sky-600", bg: "bg-sky-50" },
          { label: "Total Requests", value: stats?.total_tasks, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Completed", value: stats?.completed_tasks, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((item) => (
          <div key={item.label} className="bg-white p-6 rounded-[2rem] border border-sky-100 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{item.label}</p>
            <p className={`text-4xl font-black ${item.color}`}>{item.value ?? 0}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-xl font-black text-sky-950">Recent Activities</h2>
            <span className="text-[10px] font-black uppercase tracking-widest bg-sky-100 text-sky-600 px-3 py-1 rounded-full">Live</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <tr>
                  <th className="px-8 py-4">Title</th>
                  <th className="px-8 py-4">Assigned To</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentTasks.map((task, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-4 font-bold text-sm text-slate-700">{task.title}</td>
                    <td className="px-8 py-4 text-sm text-slate-500">{task.assigned_to}</td>
                    <td className="px-8 py-4">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                        task.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                        task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <h2 className="text-xl font-black text-sky-950">System Users</h2>
          </div>
          <div className="p-4 space-y-4">
            {users.slice(0, 6).map((user, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sky-700 rounded-xl flex items-center justify-center text-white font-bold">
                    {user.username[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800">{user.username}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-1 rounded-lg border ${
                  user.role === 'admin' ? 'border-red-200 text-red-600 bg-red-50' : 
                  user.role === 'technician' ? 'border-sky-200 text-sky-600 bg-sky-50' : 'border-slate-200 text-slate-500'
                }`}>
                  {user.role}
                </span>
              </div>
            ))}
            <Link to="/admin/users" className="block text-center py-4 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-800 transition-colors">
              View All Users →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}