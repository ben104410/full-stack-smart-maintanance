import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import AssignTechnicianModal from "../../components/AssignTechnicianModal";
import { Search, Download, RefreshCw, Eye, UserCheck, ClipboardList } from "lucide-react";

interface Request {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  location?: string;
  created_at: string;
  created_by_username?: string;
  assigned_to_username?: string;
  user?: { username: string };
  asset_name?: string;
  asset?: { name: string };
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assignData, setAssignData] = useState<Request | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get("maintenance/all/");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load maintenance requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleExportCSV = async () => {
    try {
      const response = await api.get("maintenance/export/csv/", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `maintenance_requests_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("CSV report downloaded");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export CSV");
    }
  };

  const filteredRequests = requests.filter((req) => {
    const term = search.toLowerCase();
    const titleMatch = req.title?.toLowerCase().includes(term);
    const descMatch = req.description?.toLowerCase().includes(term);
    const userMatch = (req.created_by_username || req.user?.username || "").toLowerCase().includes(term);
    const assetMatch = (req.asset_name || req.asset?.name || "").toLowerCase().includes(term);
    const locMatch = (req.location || "").toLowerCase().includes(term);

    const matchesSearch = !search || titleMatch || descMatch || userMatch || assetMatch || locMatch;
    const matchesStatus =
      statusFilter === "all" || (req.status || "").toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority =
      priorityFilter === "all" || (req.priority || "").toLowerCase() === priorityFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const s = (status || "").toLowerCase();
    switch (s) {
      case "completed":
        return <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">Completed</span>;
      case "in_progress":
        return <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700">In Progress</span>;
      case "assigned":
        return <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">Assigned</span>;
      default:
        return <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">Pending</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const p = (priority || "").toLowerCase();
    if (p === "high") {
      return <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-700">High</span>;
    }
    if (p === "medium") {
      return <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">Medium</span>;
    }
    return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">Low</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-sky-600">Operations Registry</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Maintenance Work Orders</h1>
          <p className="mt-1 text-xs text-slate-500">Track, triage, and assign campus maintenance work orders.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchRequests}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 shadow-sm"
            title="Refresh requests"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 active:scale-95"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, requester, location, asset..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:border-sky-600 focus:ring-4 focus:ring-sky-500/10 font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 outline-none transition focus:border-sky-600"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 outline-none transition focus:border-sky-600"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-t-transparent" />
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="py-16 text-center">
            <ClipboardList className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-600">No requests found</p>
            <p className="text-xs text-slate-400">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">ID & Title</th>
                  <th className="px-5 py-3.5">Requester</th>
                  <th className="px-5 py-3.5">Assigned Tech</th>
                  <th className="px-5 py-3.5">Asset</th>
                  <th className="px-5 py-3.5">Priority</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Created</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-bold text-slate-900">{req.title}</p>
                        <p className="text-[11px] text-slate-400">
                          #{req.id} • {req.location || "General Area"}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-700">
                      {req.created_by_username || req.user?.username || "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      {req.assigned_to_username ? (
                        <span className="font-semibold text-teal-700">{req.assigned_to_username}</span>
                      ) : (
                        <span className="text-xs italic text-slate-400">Unassigned</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                        {req.asset_name || req.asset?.name || "General"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">{getPriorityBadge(req.priority)}</td>
                    <td className="px-5 py-3.5">{getStatusBadge(req.status)}</td>
                    <td className="px-5 py-3.5 text-slate-400">
                      {new Date(req.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {req.status !== "completed" && (
                          <button
                            onClick={() => setAssignData(req)}
                            className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-2.5 py-1 text-xs font-bold text-white transition hover:bg-sky-700"
                          >
                            <UserCheck size={13} /> {req.assigned_to_username ? "Reassign" : "Assign"}
                          </button>
                        )}
                        <Link
                          to={`/admin/requests/${req.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                        >
                          <Eye size={13} /> View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assign Technician Modal */}
      {assignData && (
        <AssignTechnicianModal
          request={assignData}
          close={() => setAssignData(null)}
          refresh={fetchRequests}
        />
      )}
    </div>
  );
}