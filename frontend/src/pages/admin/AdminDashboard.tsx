import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import AdminLayout from "../../layouts/AdminLayout";
import Card from "../../components/ui/Card";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("dashboard/stats/")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Admin Support Portal</p>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-950">Operations command center</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Monitor maintenance workflows, respond to issues quickly, and keep assets healthy across the institution.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Requests</p>
                <p className="mt-3 text-2xl font-bold text-slate-950">{stats?.total_requests ?? "--"}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Assets</p>
                <p className="mt-3 text-2xl font-bold text-slate-950">{stats?.total_assets ?? "--"}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Technicians</p>
                <p className="mt-3 text-2xl font-bold text-slate-950">{stats?.total_technicians ?? "--"}</p>
              </div>
            </div>
          </div>
        </section>

        {!stats ? (
          <div className="space-y-4">
            <div className="h-28 rounded-[1rem] bg-white/80 shadow-sm ring-1 ring-slate-200/80 animate-pulse" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[...Array(3)].map((_, key) => (
                <div key={key} className="h-36 rounded-[1rem] bg-white/80 shadow-sm ring-1 ring-slate-200/80 animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Card>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Completed</p>
              <p className="mt-4 text-4xl font-black text-slate-950">{stats.completed}</p>
              <p className="mt-2 text-sm text-slate-500">Total successfully resolved tickets</p>
            </Card>
            <Card>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Pending</p>
              <p className="mt-4 text-4xl font-black text-slate-950">{stats.pending_requests}</p>
              <p className="mt-2 text-sm text-slate-500">Requests waiting for assignment</p>
            </Card>
            <Card>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">In Progress</p>
              <p className="mt-4 text-4xl font-black text-slate-950">{stats.in_progress}</p>
              <p className="mt-2 text-sm text-slate-500">Active work orders underway</p>
            </Card>
          </div>
        )}

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">Quick access</h2>
              <p className="mt-2 text-sm text-slate-600">Jump straight into the most important admin sections.</p>
            </div>
            <Link
              to="/admin/requests"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700"
            >
              Review open requests
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Link
              to="/admin/users"
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-orange-400 hover:bg-orange-50"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">User management</p>
              <p className="mt-3 text-lg font-bold text-slate-950">Manage accounts</p>
            </Link>
            <Link
              to="/admin/assets"
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-orange-400 hover:bg-orange-50"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Asset inventory</p>
              <p className="mt-3 text-lg font-bold text-slate-950">Track equipment</p>
            </Link>
            <Link
              to="/admin/requests"
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-orange-400 hover:bg-orange-50"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Request board</p>
              <p className="mt-3 text-lg font-bold text-slate-950">Assign work</p>
            </Link>
            <Link
              to="/admin/analytics"
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-orange-400 hover:bg-orange-50"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Analytics</p>
              <p className="mt-3 text-lg font-bold text-slate-950">Operational insights</p>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
