import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Clock, MapPin, User, CheckCircle2, Boxes } from "lucide-react";

interface RequestData {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  location?: string;
  created_at: string;
  created_by_username?: string;
  assigned_to_username?: string;
  user?: {
    username: string;
    email: string;
    role: string;
  };
  asset?: {
    name: string;
    category?: string;
    location?: string;
    condition?: string;
    image?: string;
    qr_code?: string;
  };
  asset_details?: {
    id?: number;
    name: string;
    category?: string;
    location?: string;
    condition?: string;
    image?: string;
    qr_code?: string;
  };
  technician?: {
    username: string;
    email: string;
  };
  before_image?: string;
  image?: string;
  after_image?: string;
}

interface ActivityLog {
  id: number;
  username?: string;
  user?: {
    username: string;
  };
  action: string;
  details: string;
  timestamp: string;
}

export default function RequestDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [requestData, setRequestData] = useState<RequestData | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const req = await api.get(`maintenance/${id}/`);
      setRequestData(req.data);

      const logRes = await api.get("activity/");
      const filteredLogs = (logRes.data || []).filter(
        (log: ActivityLog) => log.details?.includes(req.data.title)
      );
      setLogs(filteredLogs);
    } catch (err) {
      console.error("Error fetching request details:", err);
      toast.error("Failed to load request details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleUpdateStatus = async (newStatus: string) => {
    try {
      await api.post(`maintenance/update-status/${id}/`, { status: newStatus });
      toast.success(`Status updated to ${newStatus.replace('_', ' ')}`);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-t-transparent" />
      </div>
    );
  }

  if (!requestData) {
    return (
      <div className="py-20 text-center">
        <p className="text-base font-bold text-slate-700">Request not found.</p>
        <Link to="/admin/requests" className="mt-3 inline-block text-sm font-semibold text-sky-600 hover:underline">
          ← Return to all requests
        </Link>
      </div>
    );
  }

  const assetInfo = requestData.asset_details || requestData.asset;
  const imageSource = requestData.before_image || requestData.image;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/requests"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 shadow-sm"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Request #{requestData.id}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">
                {requestData.priority} Priority
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{requestData.title}</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {requestData.status !== "in_progress" && requestData.status !== "completed" && (
            <button
              onClick={() => handleUpdateStatus("in_progress")}
              className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-sky-700 shadow-sm"
            >
              Mark In Progress
            </button>
          )}
          {requestData.status !== "completed" && (
            <button
              onClick={() => handleUpdateStatus("completed")}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 shadow-sm"
            >
              Mark Completed
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Details */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
            <h2 className="text-base font-bold text-slate-900 mb-3">Issue Description</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {requestData.description || "No detailed description provided."}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:grid-cols-3">
              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">Location</span>
                <span className="mt-1 flex items-center gap-1 font-semibold text-slate-700">
                  <MapPin size={13} className="text-sky-600" /> {requestData.location || "Not specified"}
                </span>
              </div>
              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">Current Status</span>
                <span className="mt-1 font-bold capitalize text-slate-800">{requestData.status.replace("_", " ")}</span>
              </div>
              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">Reported Date</span>
                <span className="mt-1 flex items-center gap-1 font-semibold text-slate-700">
                  <Clock size={13} className="text-slate-400" /> {new Date(requestData.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Photographic Evidence */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
            <h2 className="text-base font-bold text-slate-900 mb-4">Inspection Media</h2>
            {imageSource ? (
              <div>
                <img
                  src={imageSource}
                  alt="Maintenance problem capture"
                  className="max-h-80 w-auto rounded-xl object-contain border border-slate-200 bg-slate-50"
                />
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No photographic evidence was attached to this report.</p>
            )}
          </div>

          {/* Activity Logs for this request */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
            <h2 className="text-base font-bold text-slate-900 mb-4">Request Timeline & Audit</h2>
            {logs.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No activity entries recorded for this request yet.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <div key={log.id} className="py-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{log.action}</span>
                      <span className="text-slate-400">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="mt-1 text-slate-600">{log.details}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">By: {log.username || log.user?.username || "System"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Requester Info */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
              <User size={16} className="text-sky-600" />
              <span>Requester Profile</span>
            </div>
            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-800 text-sm">
                {requestData.created_by_username || requestData.user?.username || "Campus Member"}
              </p>
              <p className="text-slate-500">{requestData.user?.email || "Email on record"}</p>
              <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 font-bold uppercase text-[10px] text-slate-600">
                {requestData.user?.role || "Requester"}
              </span>
            </div>
          </div>

          {/* Assigned Technician */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Assigned Technician</span>
            </div>
            {requestData.assigned_to_username || requestData.technician?.username ? (
              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-800 text-sm">
                  {requestData.assigned_to_username || requestData.technician?.username}
                </p>
                {requestData.technician?.email && (
                  <p className="text-slate-500">{requestData.technician.email}</p>
                )}
              </div>
            ) : (
              <p className="text-xs italic text-slate-400">No technician has been assigned to this ticket yet.</p>
            )}
          </div>

          {/* Linked Asset */}
          {assetInfo && (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
                <Boxes size={16} className="text-amber-600" />
                <span>Linked Asset</span>
              </div>
              <div className="space-y-2 text-xs">
                <p className="font-bold text-slate-800 text-sm">{assetInfo.name}</p>
                {assetInfo.category && <p className="text-slate-500">Category: {assetInfo.category}</p>}
                {assetInfo.location && <p className="text-slate-500">Location: {assetInfo.location}</p>}
                {assetInfo.condition && (
                  <p className="capitalize text-slate-500">Condition: {assetInfo.condition}</p>
                )}
                {assetInfo.qr_code && (
                  <div className="mt-3">
                    <img src={assetInfo.qr_code} alt="QR" className="h-20 w-20 rounded border border-slate-200 p-1" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}