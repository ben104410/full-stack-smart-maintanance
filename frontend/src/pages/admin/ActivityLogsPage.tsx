import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { Search, Download, RefreshCw, History } from "lucide-react";

interface ActivityLog {
  id: number;
  username?: string;
  user_email?: string;
  user?: number | { username: string };
  action: string;
  details?: string;
  timestamp: string;
}

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get("activity/");
      setLogs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load activity logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getUserName = (log: ActivityLog) => {
    if (log.username) return log.username;
    if (typeof log.user === "object" && log.user && "username" in log.user) {
      return (log.user as { username: string }).username;
    }
    return "System";
  };

  const filteredLogs = logs.filter((log) => {
    const username = getUserName(log).toLowerCase();
    const action = (log.action || "").toLowerCase();
    const details = (log.details || "").toLowerCase();
    const term = search.toLowerCase();

    const matchesSearch = !term || username.includes(term) || action.includes(term) || details.includes(term);
    const matchesAction = actionFilter === "all" || action === actionFilter.toLowerCase();
    const matchesDate =
      !dateFilter || (log.timestamp ? new Date(log.timestamp).toISOString().slice(0, 10) === dateFilter : false);

    return matchesSearch && matchesAction && matchesDate;
  });

  const exportCSV = () => {
    const header = "User,Action,Details,Timestamp\n";
    const rows = filteredLogs
      .map(
        (log) =>
          `"${getUserName(log)}","${log.action.replace(/"/g, '""')}","${(log.details || "").replace(/"/g, '""')}","${log.timestamp}"`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `activity_logs_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Activity logs downloaded");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-sky-600">Security &amp; Governance</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">System Activity &amp; Audit Logs</h1>
          <p className="mt-1 text-xs text-slate-500">Immutable audit log of user actions, system events, and maintenance tickets.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchLogs}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 active:scale-95"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search user, action, details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:border-sky-600 focus:ring-4 focus:ring-sky-500/10 font-medium"
          />
        </div>

        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 outline-none transition focus:border-sky-600"
        >
          <option value="all">All Actions</option>
          <option value="created maintenance request">Created Maintenance Request</option>
          <option value="assigned technician">Assigned Technician</option>
          <option value="updated task status">Updated Task Status</option>
          <option value="created asset">Created Asset</option>
          <option value="updated asset">Updated Asset</option>
          <option value="deleted asset">Deleted Asset</option>
          <option value="submitted feedback">Submitted Feedback</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 outline-none transition focus:border-sky-600"
        />

        {dateFilter && (
          <button
            onClick={() => setDateFilter("")}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
          >
            Clear Date Filter
          </button>
        )}
      </div>

      {/* Logs Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-t-transparent" />
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="py-16 text-center">
            <History className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-600">No activity logs found</p>
            <p className="text-xs text-slate-400">Events and audits will appear here as users interact with the system.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Actor</th>
                  <th className="px-5 py-3.5">Action Event</th>
                  <th className="px-5 py-3.5">Details</th>
                  <th className="px-5 py-3.5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-5 py-3.5 font-bold text-slate-800">{getUserName(log)}</td>
                    <td className="px-5 py-3.5 font-semibold text-sky-700">{log.action}</td>
                    <td className="px-5 py-3.5 text-slate-600 max-w-md truncate">{log.details || "—"}</td>
                    <td className="px-5 py-3.5 text-right text-slate-400 font-mono text-[11px]">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}